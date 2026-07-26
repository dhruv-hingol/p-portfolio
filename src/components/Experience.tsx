import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2, Building2 } from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {portfolioData.experienceSection.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {portfolioData.experienceSection.subtitle}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {portfolioData.experienceSection.experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-blue-600 shadow-sm flex items-center justify-center" />

              {/* Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl">
                
                {/* Header Meta Info */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {exp.type}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-base font-semibold text-slate-700 mt-1">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-6 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Responsibilities & Quantitative Achievements */}
                <div className="mb-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Key Accomplishments & Impact
                  </h4>
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 mr-2">Technologies:</span>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/80 px-3 py-1 rounded-lg transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
