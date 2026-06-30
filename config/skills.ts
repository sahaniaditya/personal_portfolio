export interface SkillGroup {
  /** terminal-style tag shown above the category (e.g. "~/languages") */
  tag: string;
  category: string;
  items: string[];
}

// Toolbox groups — sourced from résumé (aditya_sahani_new_2026).
export const skillGroups: SkillGroup[] = [
  {
    tag: "~/languages",
    category: "Languages",
    items: ["Python", "C/C++", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    tag: "~/ai-ml",
    category: "AI / ML",
    items: [
      "LangChain",
      "LangGraph",
      "OpenAI API",
      "Google Gemini",
      "RAG",
      "Vector DBs",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Generative AI",
    ],
  },
  {
    tag: "~/frameworks",
    category: "Frameworks & Libraries",
    items: [
      "FastAPI",
      "Flask",
      "Django",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Flutter",
    ],
  },
  {
    tag: "~/cloud",
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Apache Kafka", "Redis", "CI/CD"],
  },
  {
    tag: "~/databases",
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "ChromaDB"],
  },
  {
    tag: "~/core-cs",
    category: "Core CS",
    items: ["DSA", "DBMS", "Operating Systems", "Computer Networks"],
  },
];
