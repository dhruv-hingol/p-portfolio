import { motion } from "framer-motion";
import { TrendingUp, Users, Cpu, ShieldCheck, Clock, Zap } from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function Achievements() {
  const statIcons = [Clock, Cpu, TrendingUp, Users, Zap, ShieldCheck];

  return (
    <section id="achievements" className="section-padding bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Quantifiable Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {portfolioData.achievementsSection.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {portfolioData.achievementsSection.subtitle}
          </p>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.achievementsSection.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                    {stat.value}
                    <span className="text-blue-400">{stat.suffix}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1">{stat.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
