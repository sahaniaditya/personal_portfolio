export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
}

export const contributionsUnsorted: contributionsInterface[] = [
  {
    repo: "Bachelor of Technology",
    contibutionDescription:
      "Major in Computer Science and Engineering [CGPA : 8.56/10]",
    repoOwner: "Indian Institute of Technology, India(Jodhpur)",
    link: "https://www.iitj.ac.in/main/en/iitj",
  },
  {
    repo: "Class 12th",
    contibutionDescription:
      "Maths + Computer Science [CGPA : 9.95/10]",
    repoOwner: "Lucknow Public School and Colleges",
    link: "https://www.lucknowpublicschoolsandcolleges.com/",
  },
  {
    repo: "Class 10th",
    contibutionDescription:
      "Maths + Science [CGPA : 9.76/10]",
    repoOwner: "Lucknow Public School and Colleges",
    link: "https://www.lucknowpublicschoolsandcolleges.com/",
  },
];

export const featuredContributions: contributionsInterface[] =
  contributionsUnsorted.slice(0, 3);
