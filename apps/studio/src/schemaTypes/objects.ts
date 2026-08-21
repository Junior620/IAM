import { defineArrayMember, defineField, defineType } from "sanity";

export const source = defineType({
  name: "source",
  title: "Source",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "publisher", title: "Éditeur", type: "string" }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "date",
    }),
    defineField({
      name: "accessedAt",
      title: "Date de consultation",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "publisher" } },
});

export const portableText = defineType({
  name: "portableText",
  title: "Contenu éditorial",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "credit",
          title: "Crédit",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "rights",
          title: "Droits d’utilisation",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
