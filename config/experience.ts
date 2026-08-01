import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "pattern-ai",
    position: "AI Engineer",
    company: "Pattern Technologies",
    location: "Pune, India",
    startDate: new Date("2026-08-01"),
    endDate: "Present",
    description: ["Working on automation workflows and backend systems."],
    achievements: [],
    skills: [],
    companyUrl: "https://pattern.com",
    logo: "/experience/pattern-logo.png",
  },
  {
    id: "kimaru",
    position: "Software Engineer",
    company: "Kimaru.ai",
    location: "Remote",
    startDate: new Date("2026-05-31"),
    endDate: new Date("2026-07-31"),
    description: [
      "Architected and built a production-grade supply chain optimization platform for a large carpet manufacturer, automating yarn requirement planning and generating optimized loom production schedules.",
      "Developed scalable full-stack services using FastAPI, Next.js, TypeScript, PostgreSQL, and Docker, and deployed them on AWS using containerized infrastructure.",
    ],
    achievements: [
      "Replaced manual planning workflows with an intelligent optimization engine, minimizing raw material wastage and improving operational scalability.",
      "Led a team of 5+ software engineering interns, owning technical architecture, feature planning, code reviews, and engineering best practices.",
    ],
    skills: ["Next.js", "FastAPI", "Typescript", "PostgreSQL", "Docker", "AWS", "Python"],
    companyUrl: "https://www.kimaru.ai",
    logo: "/experience/logo-kimaru.png",
  },
  {
    id: "quark",
    position: "AI Engineer",
    company: "Quark Inc",
    location: "Japan",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2026-04-01"),
    description: [
      "Delivered enterprise AI solutions for Japanese clients by building LLM-powered applications for knowledge management, document intelligence, and business process automation.",
      "Built an AI agent for automated 2D CAD-to-3D model conversion, combining LLM reasoning with geometric processing and human-in-the-loop validation to generate production-grade parametric 3D models.",
    ],
    achievements: [
      "Developed Retrieval-Augmented Generation (RAG) systems using LangChain, OpenAI APIs, Google Gemini, and ChromaDB, enabling semantic search across enterprise knowledge bases.",
      "Designed and deployed scalable AI applications using FastAPI, React, Node.js, Docker, and AWS, integrating vector databases, secure APIs, and cloud-native infrastructure.",
    ],
    skills: ["LLMs", "FastAPI", "React", "Node.js", "Docker", "AWS", "Python"],
    companyUrl: "https://www.quark-inc.com",
    logo: "/logo.png",
  },
  {
    id: "pattern",
    position: "Software Engineering Intern",
    company: "Pattern Technologies",
    location: "Pune, India",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-07-30"),
    description: [
      "Built backend and fronted for AI-driven agentic workflows using LangGraph.",
      "Developed Image Auditing and Image Generation Pipeline to help generate high accuracy e-commerce product images.",
      "Worked with the team to create Apache Airflow DAG for various data pipelines.",
    ],
    achievements: [
      "Collaborated with team to build an agentic workflow system using FastAPI, Next.js, and LangGraph, enabling users to create and run real-time, end-to-end workflows with minimal manual intervention.",
      "Worked closely with the image generation team to develop a pipeline for generating high-quality e-commerce product images. Contributed to tasks such as masking, detecting distortions (e.g., misrendered text or features), classifying flawed generations, and re-routing them for redetailing and regeneration to enhance image accuracy.",
      "Developed an automated auditing pipeline to detect, verify, and filter AI-generated e-commerce product images. This system significantly reduced manual review efforts and improved content reliability by flagging low-quality or non-compliant visuals.",
    ],
    skills: ["Next.js", "React", "Node.js", "AWS", "SQL", "Typescript"],
    companyUrl: "https://pattern.com",
    logo: "/experience/pattern-logo.png",
  },
  {
    id: "keneco",
    position: "Software Developer Intern",
    company: "Kennemer Eco Solutions",
    location: "Asia (Remote)",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2025-03-30"),
    description: [
      "Built and maintained full-stack web applications using Django, React.js, SQL, and AWS.",
      "Developed scalable backend APIs, database models, and responsive dashboards for environmental sustainability solutions.",
    ],
    achievements: [
      "Improved application performance and deployment workflows while collaborating with cross-functional teams.",
      "Set up AWS servers and CI/CD pipelines, scaling traffic to 3,000+ users/day.",
    ],
    skills: [
      "React",
      "Django",
      "AWS",
      "HTML 5",
      "CSS 3",
      "Javascript",
    ],
    companyUrl: "https://www.ken.eco/",
    logo: "/experience/keneco-logo.png",
  },
];
