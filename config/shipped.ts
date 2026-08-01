import { ValidSkills } from "./constants";

/* ==================================================================
   Products that are on the web and usable. All entries here are real,
   sourced from their repos — keep it that way. The section is headed
   "on the web, free to try", so anything added reads as a factual
   claim about software a visitor can go and use.

   Worth adding when you're ready:
     • Snap2Scene  — huggingface.co/spaces/adirathor07/snap2scene
     • PromptChef  — the Chrome extension companion to the VS Code one
   ================================================================== */

export interface ShippedProduct {
  slug: string;
  name: string;
  /** One line for the card. Keep it under ~90 characters. */
  tagline: string;
  /** "building" renders in neutral grey rather than a status colour, so an
   *  unfinished product never sits on the page looking finished. */
  status: "live" | "beta" | "building";
  /** Small proof-of-use string shown on the card, e.g. "2.4k installs". */
  metric?: string;
  year: number;
  /** Where the thing actually lives. */
  url: string;
  repo?: string;
  /** Either a path to a file we host under /public (e.g.
   *  "/shipped/foo-promo.mp4"), which plays in a native <video>, or an
   *  embed URL (e.g. "https://www.youtube.com/embed/<id>"), which renders
   *  in an iframe. Omit it and the page shows a placeholder frame. */
  videoUrl?: string;
  /** Optional still shown before a self-hosted video plays. */
  videoPoster?: string;
  /** Body copy for the detail page, one string per paragraph. */
  summary: string[];
  /** Only what actually works today. Never put planned work in here. */
  features: string[];
  /** Rendered under a separate "Planned" heading, clearly not yet built. */
  roadmap?: string[];
  stack: ValidSkills[];
}

export const shippedProducts: ShippedProduct[] = [
  // ✅ REAL — sourced from the repo README and the Marketplace listing.
  {
    slug: "promptchef",
    name: "PromptChef",
    tagline:
      "Turn vague prompts into clear, well-specified ones — right inside VS Code.",
    status: "live",
    metric: "on VS Code Marketplace",
    year: 2026,
    url: "https://marketplace.visualstudio.com/items?itemName=AdityaSahani.promptchef",
    repo: "https://github.com/sahaniaditya/PromptChef-VSCode",
    videoUrl: "/shipped/promptchef-promo.mp4",
    summary: [
      "PromptChef is a VS Code extension that rewrites a vague prompt into a specific one without you leaving the editor. Select the text, press Ctrl+Shift+E, and the refined version streams back word by word in place — no copying it out to another tool and pasting the result back in.",
      "It runs in three modes — Concise, Clarity and Detail — and a separate Craft tab builds a full prompt from a plain description when you're starting from nothing. It works against whatever model you already have: VS Code's built-in providers including Copilot and Claude, your own Anthropic, OpenAI or Gemini key, or an OpenAI-compatible proxy endpoint. API keys go into the OS keychain rather than a settings file, and a single Ctrl+Z puts the original text back.",
    ],
    features: [
      "Ctrl+Shift+E to enhance in place; Ctrl+Shift+Alt+E to pick a mode first",
      "Three refinement modes — Concise, Clarity and Detail",
      "Craft tab generates a whole prompt from a plain description",
      "Results stream in word by word, straight into the editor",
      "One Ctrl+Z restores the original text",
      "Bring your own model — Copilot, Claude, OpenAI, Gemini or a self-hosted proxy",
      "API keys stored in the OS keychain, never in settings files",
    ],
    stack: [
      "Typescript",
      "LLMs",
      "Anthropic Claude",
      "Google Gemini",
      "Node.js",
    ],
  },
  // ✅ REAL — sourced from the dev-branch README. Work in progress:
  // Phase 0 (capture) is shipped, Phase 1 onward is not built yet.
  {
    slug: "atlas",
    name: "Atlas.ai",
    tagline: "Never lose anything you learn online again.",
    status: "building",
    metric: "Phase 0 shipped",
    year: 2026,
    url: "https://atlas-ai-puce-xi.vercel.app",
    repo: "https://github.com/sahaniaditya/atlas.ai/tree/dev",
    summary: [
      "You learn across a dozen places — YouTube, blog posts, ChatGPT threads, PDFs — and almost none of it survives the week. Atlas is a memory layer for that: one click captures whatever you're looking at, and the system organises and recalls it later. It's deliberately not another note-taking app; nothing has to be filed by hand.",
      "The architecture is built around one constraint: capture is synchronous and fast, intelligence is asynchronous. The capture endpoint returns inside 300ms and never calls a model on the request path — summarising, embedding and extraction all happen afterwards in Redis-backed workers. A Chrome MV3 extension does the capturing, a FastAPI service handles persistence, and a Next.js app is the dashboard you read it all back in.",
    ],
    features: [
      "One-click capture of pages, videos, AI conversations and PDFs",
      "Chrome MV3 extension built with WXT and React",
      "Capture returns in under 300ms, with no model call on the request path",
      "Auth, onboarding and the web dashboard shell",
      "Type-safe API client generated from the OpenAPI spec",
      "Playwright end-to-end tests covering the capture flow",
    ],
    roadmap: [
      "AI summaries of everything captured",
      "Knowledge that self-merges across sources",
      "Natural-language search with citations back to the source",
      "Coverage tracking to surface gaps in what you've learned",
      "Spaced repetition and quizzes",
      "In-browser suggestions while you read",
    ],
    stack: ["FastAPI", "Next.js", "LLMs", "Supabase", "Redis", "Python"],
  },
];
