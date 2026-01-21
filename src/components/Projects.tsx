import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../constants";

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Personal Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-coral-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg">
            Things I've built that I'm proud of
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS?.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 hover-lift group relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradient}`}
                />

                <div
                  className={`inline-flex p-4 rounded-xl glass-card-strong mb-6 bg-gradient-to-br ${project.gradient} bg-opacity-10`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-primary-400 font-medium mb-4">
                  {project.subtitle}
                </p>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

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
                        <span className="text-primary-400 mt-1">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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

                <div className="flex gap-4 pt-4 border-t border-slate-700/50">
                  {project?.links?.live && (
                    <a
                      href={project?.links?.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                  <a
                    href={project?.links?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary-400 hover:text-secondary-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">Source Code</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <p className="text-slate-400">
            View more projects on my{" "}
            <a
              href="https://github.com/dhruv-hingol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-medium"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
