import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as LucideIcons from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { servicesSection } = portfolioData;

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="section-container bg-slate-950/20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto w-full"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
            {servicesSection.badge}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mt-2 mb-4">
            {servicesSection.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg max-w-xl mx-auto">
            {servicesSection.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {servicesSection.services.map((service) => {
            const Icon = (LucideIcons[service.iconName as keyof typeof LucideIcons] || LucideIcons.HelpCircle) as React.ComponentType<any>;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 hover-lift group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Colored Top Accent */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}
                />

                <div>
                  {/* Icon Block */}
                  <div
                    className={`inline-flex p-4 rounded-xl glass-card-strong mb-6 bg-gradient-to-br ${service.gradient} bg-opacity-10`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="mb-6 bg-slate-900/30 rounded-xl p-4 border border-slate-800/40">
                    <h4 className="text-xs font-semibold text-accent-400 uppercase tracking-wider mb-2">
                      Key Client Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                          <span className="text-primary-400 font-bold">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies Tag list */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/50">
                    {service.techs.map((tech) => (
                      <span
                        key={tech}
                        className="glass-card-strong px-2.5 py-1 rounded-full text-[10px] md:text-xs text-slate-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
