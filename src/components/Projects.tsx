import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const { projectsSection } = portfolioData;
  const projects = projectsSection.projects.filter((p) => p.isFeatured);

  // Sync state with URL search parameters (?project=...)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const projectParam = params.get("project");
      if (projectParam) {
        const validIds = projects.map((p) => p.id);
        const isValid = validIds.includes(projectParam);
        if (isValid) {
          setActiveProjectId(projectParam);
        } else {
          setActiveProjectId(null);
        }
      } else {
        setActiveProjectId(null);
      }
    };

    // Initialize state on load
    handleUrlChange();

    // Listen for back/forward browser navigation
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [projects]);

  // Prevent background scrolling when overlay modal is active
  useEffect(() => {
    if (activeProjectId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProjectId]);

  // Listen for the Escape key to close the overlay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        selectProject(null);
      }
    };

    if (activeProjectId) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProjectId]);

  const selectProject = (id: string | null) => {
    setActiveProjectId(id);
    const params = new URLSearchParams(window.location.search);
    if (id) {
      params.set("project", id);
      window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
    } else {
      params.delete("project");
      const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
      window.history.pushState({}, "", newUrl);
    }
  };

  const handleHireMe = () => {
    // Close overlay
    selectProject(null);
    // Smooth scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

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
            {projectsSection.badge}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mt-2 mb-4">
            {projectsSection.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          <p className="text-slate-355 mt-6 text-lg max-w-xl mx-auto">
            {projectsSection.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const Icon = (LucideIcons[project.iconName as keyof typeof LucideIcons] || LucideIcons.HelpCircle) as React.ComponentType<any>;
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="glass-card rounded-2xl hover-lift group relative overflow-hidden flex flex-col justify-between min-h-[380px]"
              >
                {/* Top Colored Accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradient} z-10`}
                />

                <div>
                  {/* Image Preview Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900/80 border-b border-slate-800/50">
                    <img
                      src={project.image || ""}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />

                    {/* Floating Icon */}
                    <div
                      className={`absolute bottom-3 right-3 p-2.5 rounded-xl glass-card-strong bg-gradient-to-br ${project.gradient} bg-opacity-20`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-slate-355 text-xs font-semibold mb-6">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Tech and Footer */}
                <div className="px-6 pb-6 space-y-4">
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="glass-card-strong px-2 py-0.5 rounded-full text-[10px] text-slate-355"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="glass-card-strong px-2 py-0.5 rounded-full text-[10px] text-slate-500">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Read Case Study Button */}
                  <button
                    onClick={() => selectProject(project.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-xs font-semibold hover:border-primary-500/30 hover:text-primary-300 hover:bg-slate-900/40 transition-all duration-300 cursor-pointer"
                  >
                    <span>Read Case Study</span>
                    <LucideIcons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* More Projects Callout */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-slate-355 text-sm">
            {projectsSection.moreProjectsText}
            <a
              href={portfolioData.personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-semibold underline underline-offset-4"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Detailed Overlay View */}
      <AnimatePresence>
        {activeProjectId && (() => {
          const project = projects.find((p) => p.id === activeProjectId);
          if (!project) return null;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/98 backdrop-blur-xl flex justify-center py-10 px-4 md:px-10"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="max-w-4xl w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-10 relative h-fit shadow-2xl glass-card-strong my-auto"
              >
                {/* Back Button */}
                <button
                  onClick={() => selectProject(null)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-primary-300 transition-colors mb-8 cursor-pointer group"
                >
                  <LucideIcons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to Portfolio</span>
                </button>

                {/* Header Grid */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-10 pb-10 border-b border-slate-800/60">
                  <div>
                    <span className="text-primary-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                      Case Study
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                      {project.name}
                    </h3>
                    <p className="text-white text-sm font-medium mb-6 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-xs bg-slate-950/40 border border-slate-800/40 rounded-xl p-4">
                      <div>
                        <span className="text-slate-300 uppercase font-bold tracking-wider block mb-1">
                          Role
                        </span>
                        <span className="text-white font-semibold">
                          {project.role}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-300 uppercase font-bold tracking-wider block mb-1">
                          Timeline
                        </span>
                        <span className="text-white font-semibold">
                          Completed Deliverable
                        </span>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 text-white font-bold text-xs transition-all"
                        >
                          <LucideIcons.ExternalLink className="w-4 h-4" />
                          <span>Visit Live Website</span>
                        </a>
                      )}
                      {project.links?.github && project.links.github !== "#" && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs transition-all"
                        >
                          <LucideIcons.Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual Mockups Showcase (Desktop & Mobile) */}
                  <div className="relative w-full flex items-center justify-center min-h-[220px] bg-slate-950/20 border border-slate-800/40 rounded-2xl p-6 overflow-visible">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-md relative">
                      {/* Desktop View */}
                      {project.desktopImage && (
                        <div className="w-full md:w-[280px] aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative shrink-0">
                          <img
                            src={project.desktopImage}
                            alt={`${project.name} Desktop View`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold bg-slate-950/80 text-slate-200 border border-slate-800 select-none">
                            Desktop
                          </div>
                        </div>
                      )}

                      {/* Mobile View */}
                      {project.mobileImage && (
                        <div className="w-[100px] aspect-[9/19.5] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl shrink-0 md:absolute md:-bottom-4 md:-right-2 border-2 border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                          <img
                            src={project.mobileImage}
                            alt={`${project.name} Mobile View`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold bg-slate-950/80 text-slate-200 border border-slate-800 select-none">
                            Mobile
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Case Study Detailed Content */}
                <div className="space-y-8 mb-12">
                  <div className="bg-slate-950/20 border border-slate-800/40 rounded-xl p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-rose-500 mb-3 flex items-center gap-2">
                      <span className="text-lg">❌</span> The Challenge
                    </h4>
                    <p className="text-slate-100 text-sm leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="bg-slate-950/20 border border-slate-800/40 rounded-xl p-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                      <span className="text-lg">💡</span> The Solution
                    </h4>
                    <p className="text-slate-100 text-sm leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.02)]">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                      <span className="text-lg">📈</span> The Results & Impact
                    </h4>
                    <p className="text-white text-sm leading-relaxed font-semibold">
                      {project.results}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="border-t border-slate-800/60 pt-8 mb-10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                    Technologies Employed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="glass-card-strong px-3.5 py-1.5 rounded-full text-xs text-white border border-slate-800/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call To Action Footer */}
                <div className="border-t border-slate-800/60 pt-10 text-center">
                  <h4 className="text-xl font-bold text-white mb-3">
                    Need a similar solution built?
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                    Whether you need a pixel-perfect React application or a custom user interface, let's build it together.
                  </p>
                  <button
                    onClick={handleHireMe}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold text-sm transition-all hover-lift cursor-pointer"
                  >
                    <span>Discuss Your Project</span>
                    <LucideIcons.ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
