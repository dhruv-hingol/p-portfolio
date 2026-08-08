import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2, Building2, Briefcase, Award, Zap, Sparkles } from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import TiltCard from "./TiltCard";

export default function Experience() {
  const exp = portfolioData.experienceSection.experiences[0];

  const careerHighlights = [
    { label: "SDE Tenure", value: "3+ Years", icon: Briefcase },
    { label: "Production Apps", value: "6+ Shipped", icon: Award },
    { label: "Latency Cut", value: "25% Reduced", icon: Zap },
    { label: "Factual Employer", value: "Lamda Logs", icon: Sparkles },
  ];

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-blue-500/8 via-indigo-500/4 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {portfolioData.experienceSection.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {portfolioData.experienceSection.subtitle}
          </p>

          {/* Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-4xl mx-auto">
            {careerHighlights.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200/80 shadow-2xs"
                >
                  <Icon className="w-4 h-4 text-blue-600 mb-1" />
                  <span className="text-sm font-extrabold text-slate-900">{stat.value}</span>
                  <span className="text-[11px] font-medium text-slate-500">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flagship Single Work Experience Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard className="glass-card p-8 sm:p-12 rounded-3xl border-l-8 border-l-blue-600 shadow-2xl relative overflow-hidden group">
              
              {/* Top Meta Information Bar */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8 pb-8 border-b border-slate-200/80">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                      {exp.type}
                    </span>

                    {/* "Currently Working" Breathing Badge */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                      Currently Working Here
                    </span>

                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {exp.position}
                  </h3>
                  
                  <div className="flex items-center gap-2.5 text-lg font-bold text-slate-800">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:rotate-6 transition-transform">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 shadow-2xs">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Company & Role Overview */}
              <div className="mb-8">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                  Role Overview & Tenure Scope
                </h4>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  {exp.description}
                </p>
              </div>

              {/* Core Accomplishments & Engineering Impact */}
              <div className="mb-8 space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                  Key Accomplishments & Delivered Business Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3 hover:border-blue-200 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="pt-6 border-t border-slate-200/80">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                  Core Technologies & Ecosystem Tooling
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/80 px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </TiltCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
