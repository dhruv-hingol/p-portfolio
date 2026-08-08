import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Layers } from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import TiltCard from "./TiltCard";

interface ProjectsProps {
  onProjectView?: (id: string) => void;
}

export default function Projects(_props?: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = portfolioData.projectsSection.projects.filter(
    (project) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Web Applications") {
        return project.category === "Web Applications" || project.tech.includes("React") || project.tech.includes("Next.js");
      }
      if (activeCategory === "React") {
        return project.tech.includes("React") || project.tech.includes("React 19");
      }
      if (activeCategory === "Next.js") {
        return project.tech.includes("Next.js");
      }
      if (activeCategory === "React Native") {
        return project.category === "React Native" || project.tech.includes("React Native");
      }
      return project.category === activeCategory;
    }
  );

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Production Portfolio Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {portfolioData.projectsSection.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {portfolioData.projectsSection.subtitle}
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {portfolioData.projectsSection.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-102"
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
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <TiltCard className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Details Column (7 Cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                            {project.category}
                          </span>
                          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                            {project.industry}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            {project.metrics}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-4">
                          {project.subtitle} • Role: {project.role}
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
                      </div>
                    </div>

                    {/* Right Visual Window Column (5 Cols) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-xl flex flex-col justify-between min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/80" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <span className="w-3 h-3 rounded-full bg-green-500/80" />
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            case_study_v1.0
                          </span>
                        </div>

                        <div className="space-y-4 my-auto">
                          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-xs font-semibold text-slate-300">
                              Industry Domain
                            </span>
                            <span className="text-xs font-mono font-bold text-blue-400">
                              {project.industry}
                            </span>
                          </div>

                          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-xs font-semibold text-slate-300">
                              Engineering Outcome
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-400">
                              {project.metrics}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 text-right">
                          <span className="text-[11px] text-slate-400">
                            Built at Lamda Logs
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
