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
    id: "kimaru",
    position: "Software Engineer",
    company: "Kimaru.ai",
    location: "Remote",
    startDate: new Date("2026-05-31"),
    endDate: new Date("2026-04-01"),
    description: [
      "Contributed to a client project from India - delivered them a website based on Next.JS and FastAPI.",
      "The project involved building a planning system for looms and carpets with optimization algorithms reducing wastage on yarn and manual labour.",
    ],
    achievements: [
      "The project reduced the yarn wastage by 23% and reducing the manual labour time to enhance productivity.",
      "Kimaru signed an annual subscription contract with the client and the project is being used by company employees."
    ],
    skills: ["Next.js", "FastAPI", "LLMs", "React", "Python"],
    companyUrl: "https://www.kimaru.ai",
    logo: "/experience/logo-kimaru.png",
  },
  {
    id: "quark",
    position: "AI Engineer",
    company: "Quark Inc",
    location: "Remote",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2026-03-21"),
    description: [
      "Contributing to client projects related to Image Recognition, Object Detection etc.",
      "Leading the migration of the UI of company's website from PHP to NextJS.",
    ],
    achievements: [
      "Delivered an Image Detection model to a client to sort between different classes of image, to reduce the manual work.",
      "Led the migration of the UI of company's website from PHP to NextJS., improving frontend consistency and performance."
    ],
    skills: ["Next.js", "LLMs", "Computer Vision", "Python"],
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
    position: "Web Developer Intern",
    company: "Kennemer Eco Solutions",
    location: "Remote",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2025-03-30"),
    description: [
      "Developed companys's first website using React, Django, and PostgreSQL.",
      "Set up AWS servers and CI/CD pipelines."
    ],
    achievements: [
      "Developed company's first MVP using React, Django, PostgreSQL and Boostrap.",
      "Set up AWS servers and CI/CD pipelines, scaling traffic to 3,000+ users/day."
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
