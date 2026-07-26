import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, Award } from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import TiltCard from "./TiltCard";

interface ProjectsProps {
  onProjectView?: (id: string) => void;
}

export default function Projects({ onProjectView }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = portfolioData.projectsSection.projects.filter(
    (project) => {
      if (activeCategory === "All") return true;
      return project.category === activeCategory;
    },
  );

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Production Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {portfolioData.projectsSection.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {portfolioData.projectsSection.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {portfolioData.projectsSection.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Case Studies List */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Content Column */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                            {project.category}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                            Role: {project.role}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5" />
                            {project.metrics}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600 mb-4">
                          {project.subtitle}
                        </p>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Challenge & Solution Blocks */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                              Engineering Challenge
                            </span>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {project.challenge}
                            </p>
                          </div>
                          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                              Architecture & Solution
                            </span>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tech Badges & Action Links */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                          {project.links.live && project.links.live !== "#" && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => onProjectView && onProjectView(project.id)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs transition-all duration-200 shadow-sm"
                            >
                              <span>Live Demo</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}

                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => onProjectView && onProjectView(project.id)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 transition-all duration-200"
                            >
                              <Github className="w-4 h-4" />
                              <span>Source Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Visual Presentation Card (5 Cols) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-xl flex flex-col justify-between min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/80" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <span className="w-3 h-3 rounded-full bg-green-500/80" />
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            production_build_v1.0
                          </span>
                        </div>

                        <div className="space-y-4 my-auto">
                          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-xs font-semibold text-slate-300">
                              Target Environment
                            </span>
                            <span className="text-xs font-mono font-bold text-blue-400">
                              Enterprise Web / Mobile
                            </span>
                          </div>

                          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-xs font-semibold text-slate-300">
                              Measured Impact
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-400">
                              {project.metrics}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 text-right">
                          <span className="text-[11px] text-slate-400">
                            Verified by Frontend Audit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
