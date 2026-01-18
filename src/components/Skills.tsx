import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Palette, Database, Wrench } from "lucide-react";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const skillCategories = [
    {
      name: "Languages",
      icon: Code,
      color: "primary",
      skills: [
        { name: "JavaScript (ES6+)", level: 95 },
        { name: "TypeScript 5.8", level: 90 },
      ],
    },
    {
      name: "Frontend",
      icon: Palette,
      color: "secondary",
      skills: [
        { name: "React 19", level: 95 },
        { name: "Next.js", level: 85 },
        { name: "React Native", level: 80 },
      ],
    },
    {
      name: "State & Data",
      icon: Database,
      color: "accent",
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
      color: "primary",
      skills: [
        { name: "Tailwind CSS 4.1", level: 95 },
        { name: "Radix UI", level: 85 },
        { name: "Vite 7", level: 90 },
        { name: "Docker", level: 75 },
        { name: "Git & GitHub", level: 90 },
      ],
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
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg">My toolbox of choice</p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => {
            const Icon = category.icon;
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
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300 font-medium">
                          {skill.name}
                        </span>
                        <span
                          className={`text-${category.color}-400 text-sm font-semibold`}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            inView ? { width: `${skill.level}%` } : { width: 0 }
                          }
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 rounded-full`}
                        />
                      </div>
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
              Additional Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
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
              ].map((skill) => (
                <span
                  key={skill}
                  className="glass-card-strong px-4 py-2 rounded-full text-sm text-slate-300 hover:glow-cyan transition-all duration-300"
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
