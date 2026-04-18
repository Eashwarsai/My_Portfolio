import { Code2, Server, Cloud, Wrench, type LucideIcon } from "lucide-react";

export interface Skill {
  name: string;
  level: "expert" | "proficient" | "familiar";
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "TailwindCSS", level: "expert" },
      { name: "GraphQL", level: "proficient" },
      { name: "Redux / RTK", level: "proficient" },
      { name: "React Query", level: "proficient" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "FastAPI", level: "proficient" },
      { name: "Python", level: "proficient" },
      { name: "Supabase", level: "proficient" },
      { name: "Node.js", level: "familiar" },
      { name: "REST APIs", level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "BigQuery", level: "familiar" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Cloud,
    skills: [
      { name: "Docker", level: "proficient" },
      { name: "Git / GitHub", level: "expert" },
      { name: "GitHub Actions", level: "proficient" },
      { name: "Linux", level: "proficient" },
      { name: "CI/CD", level: "proficient" },
    ],
  },
  {
    title: "Design & Process",
    icon: Wrench,
    skills: [
      { name: "Figma", level: "proficient" },
      { name: "Agile / Scrum", level: "expert" },
      { name: "Code Review", level: "expert" },
      { name: "Vite", level: "expert" },
    ],
  },
];

export const levelColors: Record<Skill["level"], string> = {
  expert: "bg-accent",
  proficient: "bg-accent-secondary",
  familiar: "bg-accent-tertiary",
};

export const levelLabels: Record<Skill["level"], string> = {
  expert: "Expert",
  proficient: "Proficient",
  familiar: "Familiar",
};
