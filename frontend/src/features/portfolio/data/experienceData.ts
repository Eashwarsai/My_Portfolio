export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  type: "current" | "past" | "education";
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Software Development Engineer",
    company: "BeautifulCode",
    period: "Dec 2021 — Present",
    description:
      "Working on enterprise-scale solutions and internal platforms. Key contributor to Sojern Portal 3.0, focusing on frontend architecture, state management, and data visualization. Transitioned internal tools to modern stacks including Next.js and Supabase.",
    tech: ["React", "TypeScript", "Next.js", "GraphQL", "BigQuery", "Supabase", "TailwindCSS"],
    type: "current",
  },
  {
    id: "edu-1",
    title: "B.Tech in Computer Science and Engineering",
    company: "SRM University",
    period: "2018 — 2022",
    description:
      "Completed undergraduate studies with a focus on software engineering, algorithms, and distributed systems. Participated in various hackathons and technical projects.",
    tech: ["Data Structures", "Algorithms", "Operating Systems", "Networking"],
    type: "education",
  },
];
