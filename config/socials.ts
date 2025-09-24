import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "sahaniaditya",
    icon: Icons.gitHub,
    link: "https://github.com/sahaniaditya",
  },
  {
    name: "LinkedIn",
    username: "aditya-sahani",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/aditya-sahani/",
  },
  {
    name: "Gmail",
    username: "b22cs003@iitj.ac.in",
    icon: Icons.gmail,
    link: "mailto:b22cs003@iitj.ac.in",
  },
];
