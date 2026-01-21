import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar } from "lucide-react";
import { COMPANY_INFO, WORK_PROJECTS } from "../constants";

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-coral-500 mx-auto rounded-full" />
        </motion.div>

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
                  {COMPANY_INFO?.position}
                </h3>
                <p className="text-secondary-400 text-xl font-medium">
                  {COMPANY_INFO?.company}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-5 h-5" />
              <span>{COMPANY_INFO?.duration}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-slate-400">
            <span>📍</span>
            <span>{COMPANY_INFO?.location}</span>
          </div>
        </motion.div>

        <div className="space-y-8">
          {WORK_PROJECTS?.map((project) => (
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

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="glass-card px-3 py-1 rounded-full text-sm text-slate-300 hover:glow-teal transition-all duration-300"
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
