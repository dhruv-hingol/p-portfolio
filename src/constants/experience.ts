export const COMPANY_INFO = {
  position: "Software Development Engineer",
  company: "Elixir Techne",
  duration: "Feb 2023 – Present",
  location: "Ahmedabad, India",
} as const;

export const WORK_PROJECTS = [
  {
    name: "Heptaverse-FE",
    role: "Lead Frontend",
    description:
      "Architected a production-ready enterprise frontend using React 19.1, TypeScript 5.8, and Vite 7.",
    achievements: [
      "Implemented high-performance state management using Zustand 5.0 and TanStack React Query 5.85",
      "Designed secure B2B interface using Tailwind CSS 4.1 and Radix UI primitives",
      "Integrated TipTap 3.4 for rich text editing and Recharts 3.2 for data visualization",
      "Managed containerization with Docker and CI/CD via Bitbucket Pipelines",
    ],
    tech: [
      "React 19",
      "TypeScript 5.8",
      "Vite 7",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS 4.1",
      "Docker",
    ],
    color: "primary" as const,
  },
  {
    name: "RenCoach",
    role: "Frontend Developer",
    description:
      "Developed a web application from scratch using React.js and Redux.",
    achievements: [
      "Optimized storage to reduce API calls by 25%",
      "Boosted performance by 20% via lazy loading implementation",
      "Implemented comprehensive state management with Redux",
    ],
    tech: ["React.js", "Redux", "JavaScript"],
    color: "accent" as const,
  },
  {
    name: "Bizzmitr",
    role: "Frontend Developer",
    description:
      "Leveraged Next.js for server-side rendering (SSR) and optimized load times.",
    achievements: [
      "Implemented efficient code splitting and lazy loading",
      "Optimized SSR for improved SEO and performance",
      "Enhanced user experience with faster page loads",
    ],
    tech: ["Next.js", "SSR", "React", "Code Splitting"],
    color: "coral" as const,
  },
  {
    name: "React Native App",
    role: "Mobile Developer",
    description:
      "Engineered a mobile application for real-time dealer purchasing.",
    achievements: [
      "Integrated live product synchronization via RESTful APIs",
      "Developed cross-platform mobile solution",
      "Implemented real-time data updates",
    ],
    tech: ["React Native", "RESTful APIs", "Mobile Development"],
    color: "accent" as const,
  },
  {
    name: "Ariel AI",
    role: "Frontend Developer",
    description:
      "Developed interactive AI features including status change and feedback loops.",
    achievements: [
      "Built modern UI using Next UI and Tailwind CSS",
      "Implemented real-time AI interaction features",
      "Created responsive feedback mechanisms",
    ],
    tech: ["Next.js", "Next UI", "Tailwind CSS", "AI Integration"],
    color: "coral" as const,
  },
] as const;
