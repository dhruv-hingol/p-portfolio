import { Code, Palette, Database, Wrench } from "lucide-react";

export const SKILL_CATEGORIES = [
  {
    name: "Languages",
    icon: Code,
    color: "primary" as const,
    skills: [
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "TypeScript 5.8", level: 90 },
    ],
  },
  {
    name: "Frontend",
    icon: Palette,
    color: "accent" as const,
    skills: [
      { name: "React 19", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "React Native", level: 80 },
    ],
  },
  {
    name: "State & Data",
    icon: Database,
    color: "coral" as const,
    skills: [
      { name: "Zustand", level: 90 },
      { name: "TanStack Query", level: 85 },
      { name: "Redux Toolkit", level: 90 },
      { name: "Axios", level: 95 },
    ],
  },
  {
    name: "Styling & Tools",
    icon: Wrench,
    color: "primary" as const,
    skills: [
      { name: "Tailwind CSS 4.1", level: 95 },
      { name: "Radix UI", level: 85 },
      { name: "Vite 7", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Git & GitHub", level: 90 },
    ],
  },
] as const;

export const ADDITIONAL_SKILLS = [
  "RESTful APIs",
  "Chrome Extensions",
  "Responsive Design",
  "Performance Optimization",
  "CI/CD Pipelines",
  "Bitbucket",
  "Code Splitting",
  "Lazy Loading",
  "SSR/SSG",
  "Micro-animations",
  "State Management",
  "Component Architecture",
] as const;
