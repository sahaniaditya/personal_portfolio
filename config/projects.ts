import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "shopping-assistant",
    companyName: "AI-Shopping Assistant",
    type: "Personal",
    category: ["Web Dev", "AI-LLMs","Full Stack", "UI/UX"],
    shortDescription:
      "A voice-driven shopping assistant that runs a multi-step research pipeline over live retail data: it extracts intent from a natural-language query, plans the research, runs the search, then ranks results on price, rating, review sentiment and availability. Google Gemini 1.5 Flash handles the language understanding, SerpAPI supplies live Walmart listings, and the Web Speech API takes hands-free queries in Chrome and Edge. Also does review-sentiment analysis, brand and price-trend comparison, and a guided four-step checkout.",
    websiteLink: "https://github.com/sahaniaditya/shopping-assistant",
    techStack: [
      "Next.js",
      "Typescript",
      "Tailwind CSS",
      "Google Gemini",
      "SerpAPI",
      "LLMs",
    ],
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-30"),
    companyLogoImg: "/projects/shopping-assistant/logo.png",
    pagesInfoArr: [
      {
        title: "Landing Page",
        description:
          "Assitant Interface using NextJS",
        imgArr: [
          "/projects/shopping-assistant/landing_1.png",
          "/projects/shopping-assistant/landing_2.png",
          "/projects/shopping-assistant/landing_3.png",
          "/projects/shopping-assistant/landing_4.png",
          "/projects/shopping-assistant/landing_5.png",
        ],
      }
    ],
    descriptionDetails: {
      paragraphs: [
        "This project is a cutting-edge AI-powered shopping assistant that revolutionizes the online shopping experience for customers. Built with Next.js, TypeScript, and Tailwind CSS, it combines advanced AI capabilities, deep product research, voice interaction, and seamless checkout processes to create an unparalleled e-commerce platform.",
        "The integration of deep research capabilities, voice-enabled interaction, automated checkout, and progressive status messaging creates a cohesive platform that not only meets user needs but anticipates and exceeds their expectations. This project serves as a blueprint for next-generation e-commerce platforms that prioritize user experience, accessibility, and intelligent automation.",
      ],
      bullets: [
        "Automated intent extraction, research planning, web search execution, and intelligent ranking.",
        "Direct integration with SerpAPI for live Walmart product data.",
        "AI-powered analysis of customer reviews using Google Gemini for accurate sentiment scoring.",
        "Advanced scoring algorithm considering price, ratings, reviews, sentiment, and availability.",
      ],
    },
  },
  {
    id: "music",
    companyName: "Music Recommendation Based on Facial Emotion",
    type: "Personal",
    category: ["Deep Learning", "Full Stack", "UI/UX"],
    shortDescription:
      "A full-stack app that reads mood from a photo and recommends music to match it. A PyTorch and TensorFlow emotion-recognition model classifies the facial expression in an uploaded image, and the detected mood drives the track suggestions. React front end against an Express and Node API, with MongoDB behind account registration and login, and a layout that holds up on mobile.",
    websiteLink:
      "https://github.com/sahaniaditya/MusicRecommendationBasedOnFacialExpression",
    techStack: [
      "React",
      "Node.js",
      "express.js",
      "MongoDB",
      "PyTorch",
      "TensorFlow",
      "Computer Vision",
    ],
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-01"),
    companyLogoImg: "/projects/music-recommender/logo.png",
    pagesInfoArr: [
      {
        title: "Landing Page",
        description:
          "Tour to my website.",
        imgArr: ["/projects/music-recommender/landing_1.png", "/projects/music-recommender/landing_2.png", "/projects/music-recommender/landing_3.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        `I developed an AI-powered music recommendation system that personalizes playlists by analyzing facial emotions. The deep learning model, built with custom VGG16 and LeNet architectures, achieved 63.56% accuracy. This system is delivered through a scalable web application using React and Flask, featuring secure user authentication with MongoDB to ensure a private and highly engaging user experience.`,
      ],
      bullets: [
        "Built a deep learning model on the FER-2013 dataset using custom VGG16 and LeNet architectures, achieving 63.56% accuracy in predicting emotions for personalized music recommendations, resulting in enhanced user engagement.",
        "Developed a scalable web application with Flask backend and ReactJS frontend, incorporating secure user authentication with ExpressJS and MongoDB to ensure robust data management and privacy.",
      ],
    },
  },
  {
    id: "3d-reconstruction",
    companyName: "3D-Reconstruction-ComputerVision",
    type: "Professional",
    category: ["Deep Learning", "Web Dev", "Computer-Vision"],
    shortDescription:
      "A comparative study of six ways to rebuild a 3D scene from 2D images, built as a computer vision course project: Gaussian Splatting — including semantic-driven and text-to-3D variants with an interactive WebGL viewer — incremental Structure-from-Motion, multi-view SfM, Neural Radiance Fields, Pix2Vox voxel prediction, and space carving. Implemented across Python notebooks and shipped as Snap2Scene, a live HuggingFace Space where the pipelines run in the browser.",
    websiteLink : "https://huggingface.co/spaces/adirathor07/snap2scene",
    githubLink: "https://github.com/sahaniaditya/3d-scene-reconstruction",
    techStack: ["Python", "PyTorch", "Computer Vision", "WebGL"],
    startDate: new Date("2025-02-14"),
    endDate: new Date("2025-03-01"),
    companyLogoImg: "/projects/3d/logo.png",
    pagesInfoArr: [
      {
        title: "Splash Screen",
        description: "Custom animated splash screen with app branding",
        imgArr: ["/projects/3d/logo.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "3D Scene Reconstruction is a comprehensive computer vision project that explores multiple techniques for reconstructing 3D scenes from images and other data sources. The project implements advanced methods such as Gaussian Splatting, Structure-from-Motion, Neural Radiance Fields, Pix2Vox, and Space Carving, providing both high-fidelity reconstructions and interactive visualization tools.",
      ],
      bullets: [
        "Diverse 3D Techniques - Implements Gaussian Splatting, SfM, NeRF, Pix2Vox, and Space Carving for robust scene reconstruction.",
        "Interactive Visualization - Web-based viewers and semantic-driven reconstructions allow intuitive exploration of 3D models.",
      ],
    },
  },
  {
    id: "nutrinova",
    companyName: "NutriNova : Your Diet Tracker",
    type: "Personal",
    category: ["Web Dev", "Full Stack", "UI/UX"],
    shortDescription:
      "Crafted Builtdesign's vibrant Blogs Website using Netlify CMS and React for engaging content experiences.",
    websiteLink: "https://blog.builtdesign.in",
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "Typescript"],
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-07-01"),
    companyLogoImg: "/projects/nutrinova/logo.png",
    pagesInfoArr: [
      {
        title: "Landing Page",
        description:
          "Tour to My NutriNova",
        imgArr: ["/projects/nutrinova/landing_1.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "NutriNova is a nutritional tracking and diet recommendation application designed to help users manage their health and fitness goals effectively. By combining personalized diet plans, activity-based adjustments, and intuitive food intake logging, NutriNova empowers users to stay on track with their nutritional needs. The platform also features interactive visualizations, making progress monitoring simple and engaging across both desktop and mobile devices.",
      ],
      bullets: [
        "Personalized Nutrition - Custom diet plans based on weight, height, age, goals, and activity level.",
        "Secure & Scalable - JWT-based authentication with a robust MERN stack (React, Node.js, Express, MongoDB).",
      ],
    },
  },
  {
    id: "food-buddy",
    companyName: "FoodBuddy : Order Your Favourites",
    type: "Personal",
    category: ["Web Dev", "Frontend", "Backend"],
    shortDescription:
      "A food ordering platform where users browse dishes across multiple restaurants and order them end to end. Covers registration and login, price-range filtering so you can shop to a budget, a favourites list for saved dishes, and a cart through to checkout. Built as a React client against a Node API.",
    githubLink: "https://github.com/sahaniaditya/FoodBuddy",
    techStack: ["React", "Javascript", "HTML 5", "CSS 3", "Node.js", "MongoDB"],
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-07-01"),
    companyLogoImg: "/projects/foodbuddy/logo.png",
    pagesInfoArr: [
      {
        title: "Landing Page",
        description: "Tour to my FoodBuddy",
        imgArr: ["/projects/foodbuddy/landing_1.png", "/projects/foodbuddy/landing_2.png", "/projects/foodbuddy/landing_3.png", "/projects/foodbuddy/landing_4.png"],
      }
    ],
    descriptionDetails: {
      paragraphs: [
        "FoodBuddy is a full-stack food ordering website that allows users to explore dishes from multiple restaurants, manage their favorites, and place orders conveniently. With features like secure authentication, smart filtering, and an intuitive cart system, FoodBuddy ensures a smooth and user-friendly food ordering experience.",
      ],
      bullets: [
        "Personalized Experience - Login/Signup system with options to save favorite dishes for future access.",
        "Seamless Ordering - Add items to cart, filter by price, and complete purchases with ease.",
        "Diverse Choices - Browse a wide variety of foods from different restaurants on a single platform."
      ],
    },
  }
];

export const featuredProjects = Projects.slice(0, 3);
