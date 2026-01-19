import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
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
      color: "primary",
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
      color: "secondary",
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
      color: "accent",
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
      color: "primary",
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
      color: "secondary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="section-container bg-slate-950/30">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Company Header */}
        <motion.div
          variants={itemVariants}
          className="glass-card-strong rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="glass-card p-4 rounded-xl">
                <Briefcase className="w-8 h-8 text-primary-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">
                  Software Development Engineer
                </h3>
                <p className="text-secondary-400 text-xl font-medium">
                  Elixir Techne
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-5 h-5" />
              <span>Feb 2023 – Present</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-slate-400">
            <span>📍</span>
            <span>Ahmedabad, India</span>
          </div>
        </motion.div>

        {/* Projects Timeline */}
        <div className="space-y-8">
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className="glass-card rounded-2xl p-8 hover-lift group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    {project.name}
                    <span
                      className={`text-sm px-3 py-1 rounded-full glass-card-strong text-${project.color}-400 border border-${project.color}-500/30`}
                    >
                      {project.role}
                    </span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <ul className="space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-400"
                    >
                      <span className="text-primary-400 mt-1">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="glass-card px-3 py-1 rounded-full text-sm text-slate-300 hover:glow-cyan transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
