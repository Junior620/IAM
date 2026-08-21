"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

type SearchResult = {
  title: string;
  summary: string;
  path: string;
  type: string;
};

export function SearchInterface({
  locale,
  initialQuery = "",
}: {
  locale: "fr" | "en";
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function search(event?: FormEvent) {
    event?.preventDefault();
    if (query.trim().length < 2) return;
    setState("loading");
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&locale=${locale}`,
      );
      const body = (await response.json()) as { results: SearchResult[] };
      setResults(body.results);
      setState("done");
    } catch {
      setState("error");
    }
  }

  const types = [...new Set(results.map((result) => result.type))];
  const visible =
    type === "all" ? results : results.filter((result) => result.type === type);
  const english = locale === "en";
  return (
    <div className="search-interface">
      <form className="search-box" onSubmit={search} role="search">
        <label htmlFor="site-search">
          {english
            ? "Search IAM content"
            : "Rechercher dans les contenus de l’IAM"}
        </label>
        <div>
          <Search aria-hidden="true" />
          <input
            id="site-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            minLength={2}
            required
          />
          <button className="button button--primary">
            {english ? "Search" : "Rechercher"}
          </button>
        </div>
      </form>
      {types.length > 1 ? (
        <label className="result-filter">
          {english ? "Filter by type" : "Filtrer par type"}
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="all">{english ? "All" : "Tous"}</option>
            {types.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      ) : null}
      <p aria-live="polite" className="search-status">
        {state === "loading"
          ? english
            ? "Searching…"
            : "Recherche…"
          : state === "done"
            ? `${visible.length} ${english ? "result(s)" : "résultat(s)"}`
            : state === "error"
              ? english
                ? "Search is temporarily unavailable."
                : "La recherche est momentanément indisponible."
              : ""}
      </p>
      {state === "done" ? (
        <ol className="search-results">
          {visible.map((result) => (
            <li key={result.path}>
              <span className="eyebrow">{result.type}</span>
              <h2>
                <Link href={result.path}>{result.title}</Link>
              </h2>
              <p>{result.summary}</p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
