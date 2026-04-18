export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "CineeHub",
    description:
      "A feature-rich movie and TV show exploration platform. Built using the MERN stack and integrating the TMDB API for real-time data. Features include advanced search, categories, and responsive design.",
    tech: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    github: "https://github.com/eashwarsai",
  },
  {
    id: "proj-2",
    title: "Virtual Mouse",
    description:
      "An innovative hand gesture control system that allows users to control their computer mouse using a webcam. Leverages computer vision for precise gesture recognition and interaction.",
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    github: "https://github.com/eashwarsai",
  },
  {
    id: "proj-3",
    title: "Sojern Portal 3.0",
    description:
      "Lead frontend contributor for an enterprise travel marketing dashboard. Focused on performance at scale, GraphQL integration, and complex data visualizations.",
    tech: ["React", "TypeScript", "GraphQL", "BigQuery"],
  },
];
