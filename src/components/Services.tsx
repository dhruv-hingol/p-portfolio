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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const getHoverStyles = (gradient: string) => {
    if (gradient.includes("primary")) {
      return "hover:border-primary-500/40 hover:shadow-[0_0_30px_rgba(255,107,0,0.15)] hover:bg-slate-900/10";
    } else if (gradient.includes("accent")) {
      return "hover:border-accent-500/40 hover:shadow-[0_0_30px_rgba(255,208,0,0.12)] hover:bg-slate-900/10";
    } else {
      return "hover:border-secondary-500/40 hover:shadow-[0_0_30px_rgba(139,148,158,0.12)] hover:bg-slate-900/10";
    }
  };

  return (
    <section id="services" className="section-container bg-slate-950/20 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary-500/5 to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-gradient-radial from-accent-500/5 to-transparent blur-2xl opacity-45" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto w-full z-10 relative"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase bg-primary-500/5 border border-primary-500/10 px-3.5 py-1.5 rounded-full select-none">
            {servicesSection.badge}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mt-6 mb-4">
            {servicesSection.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          <p className="text-slate-300 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
            {servicesSection.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
          {servicesSection.services.map((service) => {
            const Icon = (LucideIcons[service.iconName as keyof typeof LucideIcons] || LucideIcons.HelpCircle) as React.ComponentType<any>;
            const gradientColor = service.gradient.includes("primary")
              ? "primary"
              : service.gradient.includes("accent")
              ? "accent"
              : "secondary";

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className={`glass-card rounded-2xl p-8 hover-lift group relative overflow-hidden flex flex-col justify-between transition-all duration-300 border border-slate-800/80 ${getHoverStyles(
                  service.gradient,
                )}`}
              >
                {/* Colored Top Accent */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}
                />

                <div>
                  {/* Icon Block with scale & rotation anim on hover */}
                  <div
                    className={`inline-flex p-4 rounded-xl glass-card-strong mb-6 bg-gradient-to-br ${service.gradient} bg-opacity-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Icon className="w-8 h-8 text-white relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Key Benefits */}
                  <div className={`mb-6 bg-slate-900/30 rounded-xl p-5 border border-slate-800/40 group-hover:border-${gradientColor}-500/10 transition-colors duration-300`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 text-${gradientColor}-400`}>
                      Key Client Outcomes
                    </h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs leading-relaxed">
                          <LucideIcons.CheckCircle2 className={`w-4 h-4 text-${gradientColor}-400 shrink-0 mt-0.5 drop-shadow-[0_0_4px_rgba(var(--tw-color-opacity))]`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies Tag list */}
                <div>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-800/40">
                    {service.techs.map((tech) => (
                      <span
                        key={tech}
                        className={`glass-card-strong px-3 py-1.5 rounded-full text-[10px] md:text-xs text-slate-350 font-medium border border-slate-800/30 hover:text-white hover:border-${gradientColor}-500/40 hover:bg-${gradientColor}-500/5 transition-all duration-300 cursor-default select-none`}
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
