import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Award, TrendingUp } from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { about, personalInfo } = portfolioData;

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
            {about.title}
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
              {about.bioTitle}
            </h3>
            <div className="space-y-6 [&>p>strong]:text-primary-400 [&>p>strong]:font-semibold [&>p>em]:text-secondary-400 [&>p>em]:font-semibold [&>p>em]:not-italic text-slate-300 leading-relaxed">
              {about.bioParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
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
              <h3 className="text-2xl font-bold text-primary-300">
                {about.education.title}
              </h3>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white">
                {about.education.degree}
              </h4>
              <p className="text-slate-200 font-medium">
                {about.education.field}
              </p>
              <p className="text-slate-300">
                {about.education.institution}
              </p>
              <div className="flex items-center gap-2 mt-4 glass-card-strong px-4 py-2 rounded-lg inline-flex">
                <Award className="w-5 h-5 text-primary-400" />
                <span className="font-semibold text-primary-300">
                  CGPA: {about.education.cgpa}
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
              <h3 className="text-2xl font-bold text-primary-300">
                {about.highlightsTitle}
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center glass-card-strong rounded-xl p-6 hover-lift">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {personalInfo.stats.experienceYears}
                </div>
                <div className="text-slate-300">Years Experience</div>
              </div>
              <div className="text-center glass-card-strong rounded-xl p-6 hover-lift">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {personalInfo.stats.performanceBoost}
                </div>
                <div className="text-slate-300">Performance Boost</div>
              </div>
              <div className="text-center glass-card-strong rounded-xl p-6 hover-lift">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {personalInfo.stats.projectsCount}
                </div>
                <div className="text-slate-300">Major Projects</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
