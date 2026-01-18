import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Award, TrendingUp } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="section-container">
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
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Professional Summary */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-8 hover-lift"
          >
            <h3 className="text-2xl font-bold text-primary-300 mb-4">
              A Bit About Me
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              I'm a frontend engineer with{" "}
              <span className="text-primary-400 font-semibold">2.5+ years</span>{" "}
              deep in the React ecosystem. Love building things from
              scratch—whether it's architecting enterprise apps or optimizing
              performance (got a{" "}
              <span className="text-secondary-400 font-semibold">25% boost</span> on
              one project!).
            </p>
            <p className="text-slate-300 leading-relaxed">
              Currently geeking out over{" "}
              <span className="font-semibold text-primary-400">React 19</span>,{" "}
              <span className="font-semibold text-primary-400">
                TypeScript 5.8
              </span>
              , and{" "}
              <span className="font-semibold text-primary-400">Vite 7</span>.
              Building stuff that actually works and people enjoy using—that's
              what gets me excited.
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-8 hover-lift"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="glass-card-strong p-3 rounded-xl">
                <GraduationCap className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-primary-300">Education</h3>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white">
                Bachelor of Engineering
              </h4>
              <p className="text-secondary-400 font-medium">
                Information Technology
              </p>
              <p className="text-slate-400">
                Government Engineering College, Modasa
              </p>
              <div className="flex items-center gap-2 mt-4 glass-card-strong px-4 py-2 rounded-lg inline-flex">
                <Award className="w-5 h-5 text-primary-400" />
                <span className="font-semibold text-primary-300">
                  CGPA: 8.61
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Achievements */}
        <motion.div variants={itemVariants} className="mt-8">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="glass-card-strong p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-primary-300">Highlights</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center glass-card-strong rounded-xl p-6 hover-lift">
                <div className="text-4xl font-bold gradient-text mb-2">
                  2.5+
                </div>
                <div className="text-slate-400">Years Experience</div>
              </div>
              <div className="text-center glass-card-strong rounded-xl p-6 hover-lift">
                <div className="text-4xl font-bold gradient-text mb-2">25%</div>
                <div className="text-slate-400">Performance Boost</div>
              </div>
              <div className="text-center glass-card-strong rounded-xl p-6 hover-lift">
                <div className="text-4xl font-bold gradient-text mb-2">6+</div>
                <div className="text-slate-400">Major Projects</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
