import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Smartphone, Layers, CheckCircle2 } from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function About() {
  const pillars = [
    {
      icon: Layers,
      title: "Clean Architecture",
      desc: "Designing modular, decoupled frontend components using strict TypeScript typing and predictable state management patterns.",
    },
    {
      icon: Cpu,
      title: "Performance Optimization",
      desc: "Achieving sub-second loading through aggressive code-splitting, lazy loading, bundle auditing, and smart client-side caching.",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Mobile",
      desc: "Engineering fluid iOS & Android mobile apps with React Native, featuring 60 FPS native animations and offline database persistence.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Reliability",
      desc: "Enforcing WCAG accessibility guidelines, structured UI component libraries, and automated CI/CD deployment pipelines.",
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Engineering Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {portfolioData.about.subtitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {portfolioData.about.bioParagraphs[0]}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/80">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise Delivery Banner */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-200">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
            Enterprise Product Development & Delivery
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-4xl">
            {portfolioData.about.bioParagraphs[1]}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Reusable Component Systems</h4>
                <p className="text-[11px] text-slate-500">Atomic structure with Radix UI & Tailwind CSS</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Zero-to-One Product Launch</h4>
                <p className="text-[11px] text-slate-500">From wireframe prototypes to production deployment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">3+ Years SDE Experience</h4>
                <p className="text-[11px] text-slate-500">Full-time Software Development Engineer at Lamda Logs</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
