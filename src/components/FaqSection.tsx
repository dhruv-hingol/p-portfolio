import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Who is Dhruv Hingol?",
    answer:
      "Dhruv Hingol is a Software Development Engineer (SDE) with 3+ years of professional experience at Elixir Techne in Ahmedabad, India. He specializes in engineering production-grade web and mobile applications using React 19, Next.js 15, React Native, and TypeScript 5.8.",
  },
  {
    question: "What technologies does Dhruv Hingol specialize in?",
    answer:
      "Dhruv specializes in modern frontend and mobile stack technologies including React 19, Next.js 15, React Native, TypeScript 5.8, Tailwind CSS 4, Zustand, TanStack Query, Three.js (React Three Fiber), WebGL, Vite, and Docker.",
  },
  {
    question: "Where did Dhruv Hingol study and what are his academic credentials?",
    answer:
      "Dhruv earned a Bachelor of Technology (B.Tech) degree in Information Technology from Gujarat Technological University (GTU), graduating with an 8.5 CGPA (First Class Distinction) for the 2019–2023 academic period.",
  },
  {
    question: "What production applications has Dhruv Hingol developed?",
    answer:
      "At Elixir Techne, Dhruv has developed 6+ production case study applications: Matisse AI Studio (Generative AI platform), Heptaverse B2B Portal (Spatial VR/AR asset portal), Aegis Fleet Tracker (Real-time telemetry dashboard), Bizmitr Dealer Portal (B2B inventory platform), Jalsa Bitez Ecosystem (Food tech POS), and Empowering Fitness App (Health tech React Native app).",
  },
  {
    question: "Can Dhruv Hingol build scalable enterprise applications?",
    answer:
      "Yes, Dhruv has architected enterprise applications serving 5,000+ active users, cutting client network latency by 25%, reducing JavaScript bundle sizes by 32%, and enforcing 100% WCAG accessibility guidelines.",
  },
  {
    question: "Where is Dhruv Hingol located and is he available for remote roles?",
    answer:
      "Dhruv Hingol is based in Ahmedabad, India (GMT+5:30) and is open to full-time remote or relocation opportunities for Senior Frontend Engineer and Software Development Engineer (SDE) roles worldwide.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-blue-500/8 via-indigo-500/4 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>AI Discoverability & FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal">
            Quick factual answers regarding Dhruv Hingol's engineering background, skills, education, and portfolio projects.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card rounded-2xl border border-slate-200/80 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 bg-blue-50 text-blue-600 border-blue-200" : ""
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 pt-0 border-t border-slate-100"
                    >
                      <p className="text-sm text-slate-600 leading-relaxed font-normal pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
