import { describe, expect, it } from "vitest";
import {
  assistantSearchTerms,
  classifyAssistantHistory,
  classifyAssistantInput,
  isAssistantGreeting,
  isAssistantOutOfScope,
  localAssistantAnswer,
  selectAssistantKnowledge,
  type AssistantKnowledgeEntry,
} from "@/lib/assistant-knowledge";

describe("IAM assistant input filtering", () => {
  it.each([
    "J’ai des symptômes et je voudrais connaître vos services.",
    "J'ai des symptomes, pouvez-vous me diagnostiquer ?",
    "Mon enfant a de la fièvre. Quelles formations proposez-vous ?",
    "Quel diagnostic pour ces douleurs ?",
    "Quels traitements pour ces symptômes ?",
    "Puis-je prendre ces médicaments ensemble ?",
    "Formation : quelle dose prendre ?",
    "Je suis enceinte et je prends des médicaments.",
    "Effets indésirables après la prise",
    "I have symptoms, and what services do you provide?",
    "What treatments should I use?",
    "Can you diagnose these symptoms?",
    "My child has a fever and I want training information.",
    "I am pregnant. Can I take this medicine?",
    "Side effects after taking medicine",
    "Je prends 500 mg chaque matin.",
    "Je suis diabétique et je voudrais connaître vos formations.",
    "I am diabetic. Which IAM services could help me?",
    "J’ai une toux depuis plusieurs jours.",
    "Mon bébé ne respire plus, quels services avez-vous ?",
  ])("blocks medical requests: %s", (query) => {
    expect(classifyAssistantInput(query)).toBe("medical");
  });

  it.each([
    "Quels services propose l’IAM ?",
    "Formation prise en charge psychologique des patients",
    "Quelles formations abordent les effets indésirables ?",
    "Quelle est votre politique de traitement des données personnelles ?",
    "Comment accompagnez-vous les patients et les soignants ?",
    "What training covers side effects and pharmacovigilance?",
    "How does IAM support patients and caregivers?",
    "What is your privacy policy?",
    "Quelle est l’adresse de l’IAM ?",
    "Qui est Anna Snijder ?",
    "Can I take your courses online?",
    "Puis-je prendre des cours auprès de l’IAM ?",
  ])("allows institutional enquiries: %s", (query) => {
    expect(classifyAssistantInput(query)).toBe("safe");
  });

  it.each([
    "Mon email est patient@example.com",
    "Voici mon téléphone : +237 699 11 22 33",
    "Phone: +237 (699) 11 22 33",
    "Je m’appelle Jean Dupont, je souhaite une formation.",
    "My name is Jane Smith. What services do you offer?",
    "Ma date de naissance est le 15/02/1990",
    "Patient ID: AB12345",
  ])("blocks identifiable personal details: %s", (query) => {
    expect(classifyAssistantInput(query)).toBe("personal");
  });

  it("checks earlier user turns before allowing external processing", () => {
    expect(
      classifyAssistantHistory([
        { role: "user", content: "Mon email est patient@example.com" },
        { role: "assistant", content: "Veuillez reformuler." },
        { role: "user", content: "Quels services propose l’IAM ?" },
      ]),
    ).toBe("personal");
  });
});

describe("IAM assistant documentary retrieval", () => {
  it.each([
    ["fr", "Bonjour, quels services propose l’IAM ?", "services", /douze domaines/i],
    ["en", "Hi, what courses are available?", "academy", /workshops and modules/i],
    ["fr", "Comment contacter IAM ?", "contact", /Bonamoussadi/],
    ["fr", "Quelles sont vos priorités ?", "priorities", /huit priorités/i],
    ["en", "What are IAM priorities?", "priorities", /eight priorities/i],
    ["fr", "Qu’est-ce que l’IAM ?", "institute", /2008/],
  ] as const)("answers %s question: %s", (locale, query, id, answer) => {
    const entries = selectAssistantKnowledge(query, locale);
    expect(entries[0]?.id).toBe(id);
    expect(localAssistantAnswer(query, locale, entries)).toMatch(answer);
  });

  it.each(["Bonjour !", "Bonsoir IAM", "Hi!", "Good morning"])(
    "recognises a standalone greeting: %s",
    (query) => {
      expect(isAssistantGreeting(query)).toBe(true);
      expect(selectAssistantKnowledge(query, "fr")).toEqual([]);
    },
  );

  it.each([
    "Qui a gagné le match de football hier ?",
    "Quelle est la météo à Douala ?",
    "What is the weather in Cameroon?",
    "Quelle est la capitale de la France ?",
  ])("declines unrelated questions instead of using incidental matches: %s", (query) => {
    expect(isAssistantOutOfScope(query)).toBe(true);
    const entries = selectAssistantKnowledge(query, "fr");
    expect(entries).toEqual([]);
    expect(localAssistantAnswer(query, "fr", entries)).toMatch(/uniquement aux questions sur l’IAM/);
  });

  it("does not match substrings inside longer unrelated words", () => {
    expect(selectAssistantKnowledge("hier", "fr")).toEqual([]);
    expect(selectAssistantKnowledge("donjon", "fr")).toEqual([]);
    expect(assistantSearchTerms("Bonjour, quelles FORMATIONS sont disponibles ?")).toEqual(["formation"]);
  });

  it("uses a relevant approved CMS source", () => {
    const entries: AssistantKnowledgeEntry[] = [{
      id: "cms-training",
      title: "Formation en cosmétologie",
      path: "/academie/cosmetologie",
      content: "La formation en cosmétologie aborde la qualité des produits cosmétiques.",
      keywords: ["cosmétologie", "formation"],
    }];
    expect(selectAssistantKnowledge("Formation en cosmétologie", "fr", entries)[0]?.id).toBe("cms-training");
  });

  it("does not present course topics as an answer about missing fees", () => {
    const query = "Combien coûtent les formations ?";
    const entries = selectAssistantKnowledge(query, "fr");
    expect(localAssistantAnswer(query, "fr", entries)).toMatch(/ne permettent pas de confirmer ce détail/);
  });
});
