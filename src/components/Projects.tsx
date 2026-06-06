import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Heart, Gamepad2, Cpu } from "lucide-react";

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      name: "Food For Good",
      subtitle: "Surplus Food Redistribution Platform (React Native)",
      image: "/assets/food_for_good.png",
      challenge: "Food insecurity exists alongside massive commercial surplus food waste. Coordination between busy restaurants and local shelters is slow, manual, and offline.",
      solution: "Engineered a high-performance cross-platform mobile app using React Native, Expo, and Firebase, featuring real-time maps and push notification sync.",
      results: "Rescued 150kg+ of surplus food daily. Reduced pickup coordination time by 80%, enabling shelters to receive fresh meals within hours of donor listings.",
      tech: ["React Native", "Expo", "TypeScript", "Firebase", "Google Maps API", "Push Notifications"],
      icon: Heart,
      gradient: "from-emerald-500 to-teal-700",
      links: {
        live: "#",
        github: "#",
      },
    },
    {
      name: "Kidi Makodo Chapo Chap",
      subtitle: "Traditional Folk Game App (React Native)",
      image: "/assets/gujarati_folk_game.png",
      challenge: "Traditional board games are disappearing, lacking modern interactive digital forms that appeal to the younger generation.",
      solution: "Developed a vibrant mobile board game using React Native Canvas. Added smooth animations, custom sound effects, local multiplayer, and digital dice rolls.",
      results: "Digitally preserved a classic folk game. Achieved 60fps performance on low-end devices and received enthusiastic response from cultural gaming communities.",
      tech: ["React Native", "TypeScript", "Custom Canvas", "Audio Players", "Zustand State"],
      icon: Gamepad2,
      gradient: "from-amber-500 to-orange-700",
      links: {
        live: "#",
        github: "#",
      },
    },
    {
      name: "Aegis Tracker",
      subtitle: "Privacy-First Productivity Extension (React)",
      image: "/assets/aegis_tracker.png",
      challenge: "Tracking productivity usually requires sending user browser data to external servers, violating user privacy.",
      solution: "Created a secure Chrome Extension using React 19 and Vite with 100% local storage and smart idle detection.",
      results: "Secured 5,000+ active users with zero data leaks. Provided clean visual analytics using Recharts charts.",
      tech: ["React 19", "Vite 7", "Chrome Extension API", "Recharts", "TypeScript"],
      icon: Cpu,
      gradient: "from-cyan-500 to-blue-700",
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
    <section id="projects" className="section-container">
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
            Proof of Work
          </span>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mt-2 mb-4">
            Featured Case Studies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg max-w-xl mx-auto">
            Real problems solved with robust frontend structures, React Native apps, and fluid user experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                variants={itemVariants}
                className="glass-card rounded-2xl hover-lift group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Top Colored Accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradient} z-10`}
                />

                <div>
                  {/* Image Preview Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900/80 border-b border-slate-800/50">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    
                    {/* Floating Icon */}
                    <div className={`absolute bottom-3 right-3 p-2.5 rounded-xl glass-card-strong bg-gradient-to-br ${project.gradient} bg-opacity-20`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-slate-400 text-xs font-semibold mb-6">
                      {project.subtitle}
                    </p>

                    {/* Case Study Framing (Challenge, Solution, Results) */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-rose-450 mb-1 flex items-center gap-1">
                          <span>❌</span> The Challenge
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
                          <span>💡</span> The Solution
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {project.solution}
                        </p>
                      </div>

                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 shadow-[0_0_15px_rgba(16,185,129,0.02)]">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                          <span>📈</span> The Results
                        </h4>
                        <p className="text-slate-200 text-xs leading-relaxed font-medium">
                          {project.results}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech and Footer */}
                <div className="px-6 pb-6">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="glass-card-strong px-2 py-0.5 rounded-full text-[10px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-slate-800/50">
                    <a
                      href={project.links.live}
                      className="flex items-center gap-1.5 text-accent-400 hover:text-accent-300 transition-colors text-xs font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.links.github}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors text-xs font-semibold"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* More Projects Callout */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-slate-400 text-sm">
            Need to see more specific examples? View my code repositories on{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-semibold underline underline-offset-4"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
