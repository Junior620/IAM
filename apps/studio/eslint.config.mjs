import js from "@eslint/js";

export default [
  js.configs.recommended,
  { ignores: ["dist/**", "schema.json", "sanity.types.ts"] },
];
