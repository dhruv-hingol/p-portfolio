import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Smartphone, Laptop, Zap } from "lucide-react";

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "React Native Mobile Apps",
      icon: Smartphone,
      gradient: "from-primary-500 to-primary-700",
      description:
        "High-performance iOS & Android applications built with React Native. I build fluid, native-grade mobile apps that offer seamless user experiences, using a single codebase to save you significant launch time and cost.",
      techs: ["React Native", "Expo", "TypeScript", "Redux/Zustand", "Push Notifications", "Firebase"],
      benefits: [
        "Saves 50% development cost using React Native code-sharing",
        "Fluid 60fps animations with React Native Reanimated",
        "Seamless deployment to Apple App Store & Google Play"
      ]
    },
    {
      title: "SaaS & Web Applications",
      icon: Laptop,
      gradient: "from-accent-500 to-accent-700",
      description:
        "Fully responsive and SEO-optimized web applications built using React and Next.js. I design pixel-perfect user interfaces, handle complex client-side state, and optimize performance for the best user experience.",
      techs: ["React 19", "Next.js", "TypeScript 5.8", "Zustand", "TanStack Query", "Tailwind CSS"],
      benefits: [
        "SEO-friendly pages with Next.js Server-Side Rendering (SSR)",
        "Fluid animations and interactive user dashboards",
        "Optimized Core Web Vitals for faster loading"
      ]
    },
    {
      title: "UI Implementation & Optimization",
      icon: Zap,
      gradient: "from-secondary-500 to-secondary-700",
      description:
        "Translating design mockups (Figma, Adobe XD) into high-quality, reusable component structures. I audit bundle sizes, set up code splitting, optimize React rendering behavior, and fix performance bottlenecks.",
      techs: ["Figma to React", "Code Splitting", "Lazy Loading", "Radix UI Primitives", "Vite 7", "Accessibility (WCAG)"],
      benefits: [
        "Pixel-perfect implementations matching Figma designs exactly",
        "Reduced initial bundle sizes by up to 30% for instant loading",
        "Accessible components conforming to WCAG/WAI-ARIA guidelines"
      ]
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
            What I Can Build For You
          </span>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mt-2 mb-4">
            Services & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg max-w-xl mx-auto">
            I specialize in the React and React Native ecosystem to design pixel-perfect, lightning-fast interfaces.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
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
