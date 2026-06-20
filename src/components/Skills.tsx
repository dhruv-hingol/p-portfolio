import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as LucideIcons from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { skillsSection } = portfolioData;

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="section-container bg-slate-950/30">
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
            {skillsSection.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
          <p className="text-slate-300 mt-6 text-lg">{skillsSection.subtitle}</p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillsSection.categories.map((category) => {
            const Icon = (LucideIcons[category.iconName as keyof typeof LucideIcons] || LucideIcons.HelpCircle) as React.ComponentType<any>;
            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 hover-lift"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`glass-card-strong p-3 rounded-xl bg-${category.color}-500/10`}
                  >
                    <Icon className={`w-6 h-6 text-${category.color}-400`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className={`flex items-center gap-3 bg-slate-900/30 border border-slate-800/40 rounded-xl px-4 py-2.5 hover:border-${category.color}-500/30 hover:bg-slate-900/60 transition-all duration-300 group/item`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-${category.color}-500 shrink-0 group-hover/item:scale-125 transition-transform`} />
                      <span className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold text-primary-300 mb-6 text-center">
              {skillsSection.additionalTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skillsSection.additionalExpertise.map((skill) => (
                <span
                  key={skill}
                  className="glass-card-strong px-4 py-2 rounded-full text-sm text-slate-300 hover:glow-orange transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
