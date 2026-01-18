import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Chrome, ShoppingCart } from "lucide-react";

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      name: "Aegis Tracker",
      subtitle: "Privacy-First Productivity Analyzer",
      description:
        "Chrome Extension for tracking browsing productivity with 100% local storage and smart idle detection.",
      features: [
        "Privacy-first architecture with chrome.storage.local",
        "Smart idle detection algorithm for accurate tracking",
        "Daily/weekly analytics with Recharts visualization",
        "CSV data export for portability",
      ],
      tech: [
        "React 19",
        "Vite",
        "Chrome Extension API",
        "Recharts",
        "TypeScript",
      ],
      icon: Chrome,
      gradient: "from-purple-500 to-purple-700",
      links: {
        live: "#",
        github: "#",
      },
    },
    {
      name: "Purchase Store",
      subtitle: "E-Commerce Platform",
      description:
        "Commercial e-commerce application with dynamic cart management and real-time price adjustments.",
      features: [
        "Built with Next.js for optimal SEO and performance",
        "Dynamic cart with real-time price calculations",
        "Responsive design with Tailwind CSS",
        "Redux Toolkit for state management",
      ],
      tech: ["Next.js", "Tailwind CSS", "Redux Toolkit", "TypeScript"],
      icon: ShoppingCart,
      gradient: "from-gray-500 to-gray-700",
      links: {
        live: "#",
        github: "#",
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="section-container">
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
            Personal Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-gray-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg">
            Things I've built that I'm proud of
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 hover-lift group relative overflow-hidden"
              >
                {/* Gradient Accent */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradient}`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-xl glass-card-strong mb-6 bg-gradient-to-br ${project.gradient} bg-opacity-10`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-purple-400 font-medium mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-400 text-sm"
                      >
                        <span className="text-purple-400 mt-1">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="glass-card-strong px-3 py-1 rounded-full text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-slate-700/50">
                  <a
                    href={project.links.live}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                  <a
                    href={project.links.github}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">Source Code</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* More Projects Note */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <p className="text-slate-400">
            View more projects on my{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
