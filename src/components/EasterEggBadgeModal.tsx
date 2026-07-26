import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Sparkles, CheckCircle2 } from "lucide-react";

interface EasterEggBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EasterEggBadgeModal({ isOpen, onClose }: EasterEggBadgeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl relative text-center space-y-5"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Easter Egg Unlocked!</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Curious Recruiter Achievement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You discovered the hidden 5-click logo trigger! You clearly pay incredible attention to detail—the exact trait Dhruv brings to frontend engineering.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Unlocked Shortcuts & Easter Eggs:</span>
              </div>
              <ul className="text-slate-600 space-y-1 pl-6 list-disc text-[11px]">
                <li>Press <strong>"D"</strong> anywhere to toggle 3D Wireframe mode</li>
                <li>Type <strong>"react"</strong> to trigger celebratory confetti</li>
                <li>Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) for Rainbow mode</li>
                <li>Double-click Hero area to spin the Developer Core</li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Awesome, Take Me Back
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
