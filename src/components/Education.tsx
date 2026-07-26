import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import TiltCard from "./TiltCard";

export default function Education() {
  const { degree, field, institution, cgpa, year } = portfolioData.about.education;

  const chips = [
    { label: "Bachelor's Degree", icon: GraduationCap },
    { label: "Information Technology", icon: BookOpen },
    { label: "Honors Distinction", icon: Award },
    { label: year, icon: Calendar },
  ];

  const coursework = [
    "Data Structures & Algorithms",
    "Software Architecture & Engineering",
    "Database Management Systems",
    "Object-Oriented Programming",
    "Web Application Development",
    "Computer Networks & Security",
  ];

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Soft Radial Blue Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-blue-500/8 via-indigo-500/4 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Background</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          Academic Foundation
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-xl mx-auto font-normal">
          My academic foundation in software engineering and computer science.
        </p>

        {/* Micro-Chips Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {chips.map((chip) => {
            const Icon = chip.icon;
            return (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs hover:border-blue-300 hover:text-blue-600 transition-all duration-200 cursor-default"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600" />
                <span>{chip.label}</span>
              </span>
            );
          })}
        </div>

        {/* Floating Apple x Linear Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <TiltCard className="glass-card-strong p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-2xl relative overflow-hidden group">
            
            {/* 2-Column Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Degree & Major (7 Cols) */}
              <div className="md:col-span-7 flex flex-col justify-between relative pl-4 border-l-4 border-l-blue-600">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      Undergraduate Degree
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {year}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
                    {degree}
                  </h3>
                  <p className="text-sm font-bold text-blue-600 mb-6">
                    Major in {field}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Core Curriculum & Focus</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {coursework.map((subject) => (
                        <div key={subject} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span className="text-xs font-medium text-slate-600">
                            {subject}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Institution & CGPA (5 Cols) */}
              <div className="md:col-span-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    University / Institution
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 mb-1">
                    {institution}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-6">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Gujarat, India</span>
                  </div>

                  {/* CGPA Score Badge */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Academic Performance
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        First Class Distinction
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 block">
                        {cgpa}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Verified Credentials
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    GTU_2023
                  </span>
                </div>
              </div>

            </div>

          </TiltCard>
        </motion.div>

      </div>
    </section>
  );
}
