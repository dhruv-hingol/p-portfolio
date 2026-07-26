import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  CheckCircle2,
  ChevronDown,
  Code,
  Smartphone,
  Zap,
} from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import Hero3DCanvas from "./canvas/Hero3DCanvas";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-white overflow-hidden"
    >
      {/* 3D R3F Canvas Background */}
      <Hero3DCanvas />

      {/* Ambient background light glows & patterns */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-100/50 via-slate-100/30 to-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy (Left 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Senior SDE & Enterprise Roles</span>
            </div>

            {/* Main Name & Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
              Dhruv Hingol
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                Software Developer
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-md border border-slate-200/80">
                {portfolioData.personalInfo.stats.experienceYears} Experience
              </span>
            </div>

            {/* Subtitle Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {["React 19", "Next.js", "React Native", "TypeScript"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-2xs"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>

            {/* High-Impact Professional Introduction */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              "{portfolioData.personalInfo.bio}"
            </p>

            {/* Key Engineering Impact Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9 w-full max-w-xl">
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>25% API Latency Reduction</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>5,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>60 FPS Native & R3F Animations</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Production Architecture (Docker/CI)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={portfolioData.contactSection.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
            </div>
          </motion.div>

          {/* Right Profile & Visual Card (Right 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Premium Light Card Container */}
              <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 shadow-md flex-shrink-0 bg-slate-100">
                      <img
                        src="/assets/profile.jpg"
                        alt="Dhruv Hingol"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        Dhruv Hingol
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Software Development Engineer
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    SDE @ Elixir Techne
                  </span>
                </div>

                {/* Core Competencies Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Web Architecture
                        </div>
                        <div className="text-[11px] text-slate-500">
                          React 19, Next.js, TypeScript
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      Production
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Mobile Engineering
                        </div>
                        <div className="text-[11px] text-slate-500">
                          React Native, Expo, Redux/Zustand
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      iOS & Android
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Performance Engineering
                        </div>
                        <div className="text-[11px] text-slate-500">
                          25% Traffic Saved, Bundle Auditing
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">
                      Optimum
                    </span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {portfolioData.personalInfo.featuredTechs.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <span className="text-xs font-semibold tracking-wider uppercase">
              Scroll to explore
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
