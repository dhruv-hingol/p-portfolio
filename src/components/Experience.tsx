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
        "Architected a production-ready B2B platform under tight launch deadlines, managing features end-to-end.",
      achievements: [
        "Led remote frontend alignment and development in a distributed team, accelerating feature release cycles",
        "Spearheaded performance optimizations using Zustand and React Query, cutting client-side load times",
        "Autonomously built complex B2B client interfaces using Tailwind CSS and Radix UI with zero supervision",
        "Dockerized frontend environments and built automated CI/CD pipelines, removing manual release bottlenecks",
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
        "Owned development of complex client-side portals, operating with high autonomy and direct communication.",
      achievements: [
        "Optimized frontend data storage and caching to reduce costly API traffic by 25%",
        "Boosted page performance by 20% within weeks through aggressive lazy loading and assets cleanup",
        "Translated business wireframes into functional, production-ready code with weekly client demos",
      ],
      tech: ["React.js", "Redux", "JavaScript"],
      color: "secondary",
    },
    {
      name: "Bizzmitr",
      role: "Frontend Developer",
      description:
        "Collaborated remotely to migrate legacy pages to high-performance Next.js architectures.",
      achievements: [
        "Autonomously set up code splitting and lazy loading structures, slashing initial bundle sizes",
        "Optimized Next.js Server-Side Rendering (SSR) to boost SEO rankings and speed up indexing",
        "Independently managed tasks and deadlines in a fully remote setup, maintaining high delivery speed",
      ],
      tech: ["Next.js", "SSR", "React", "Code Splitting"],
      color: "accent",
    },
    {
      name: "React Native App",
      role: "Mobile Developer",
      description:
        "Engineered a cross-platform mobile application for dealer inventory and purchasing.",
      achievements: [
        "Designed and implemented live product syncing and real-time purchasing logs via REST APIs",
        "Developed cross-platform mobile builds in record time, allowing early client testing",
        "Configured robust local database storage to ensure app utility during offline client visits",
      ],
      tech: ["React Native", "RESTful APIs", "Mobile Development"],
      color: "primary",
    },
    {
      name: "Ariel AI",
      role: "Frontend Developer",
      description:
        "Built interactive AI features, cooperating with AI engineers to deploy streaming feedback loops.",
      achievements: [
        "Created modern, responsive user interfaces with custom UI libraries and Tailwind CSS",
        "Implemented real-time visual feedback loops and streaming text states for AI interactions",
        "Iterated rapidly in fast-paced sprint cycles based on direct stakeholder and user feedback",
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
