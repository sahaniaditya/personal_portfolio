import { skillGroups } from "@/config/skills";

/* ------------------------------------------------------------------
   Domain colour coding

   Four validated hues carry domain identity (validation figures live in
   app/(home)/portfolio.css). Toolbox categories map onto them; Cloud and
   Databases share the infrastructure hue, and Core CS stays neutral
   because fundamentals aren't a stack choice.

   Shared by the home page, the hero constellation and the shipped-product
   pages, so a technology can never be one colour in one place and a
   different colour in another.
   ------------------------------------------------------------------ */

export type Cat = "lang" | "ai" | "fw" | "infra" | "none";

export const CAT_BY_CATEGORY: Record<string, Cat> = {
  Languages: "lang",
  "AI / ML": "ai",
  "Frameworks & Libraries": "fw",
  "Cloud & DevOps": "infra",
  Databases: "infra",
  "Core CS": "none",
};

/** Tech names differ between configs ("Typescript" vs "TypeScript",
 *  "HTML 5" vs "HTML"), so match on a normalised key plus a few aliases
 *  for names that only ever appear in a project or role stack. */
const norm = (s: string) => s.toLowerCase().replace(/[\s._-]/g, "");

const CAT_ALIASES: Record<string, Cat> = {
  html5: "lang",
  css3: "lang",
  sql: "infra",
  mysql: "infra",
  llms: "ai",
  llm: "ai",
  googlegemini: "ai",
  anthropicclaude: "ai",
  serpapi: "ai",
  tensorflow: "ai",
  pytorch: "ai",
  webgl: "fw",
  graphql: "fw",
  nestjs: "fw",
  expressjs: "fw",
  redux: "fw",
  bootstrap: "fw",
  materialui: "fw",
  netlify: "infra",
  socketio: "fw",
};

const CAT_BY_TECH = new Map<string, Cat>(Object.entries(CAT_ALIASES));
skillGroups.forEach((group) => {
  const cat = CAT_BY_CATEGORY[group.category] ?? "none";
  group.items.forEach((item) => CAT_BY_TECH.set(norm(item), cat));
});

export const catOf = (tech: string): Cat =>
  CAT_BY_TECH.get(norm(tech)) ?? "none";
