import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, Eye, Gamepad2, ChevronUp, ChevronDown } from "lucide-react";

interface RecruiterAnalyticsProps {
  visitCount: number;
  timeSpentFormatted: string;
  projectsViewedCount: number;
  gameCount: number;
}

export default function RecruiterAnalytics({
  visitCount,
  timeSpentFormatted,
  projectsViewedCount,
  gameCount,
}: RecruiterAnalyticsProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
        
        {/* Toggle Header Bar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer bg-slate-50/80 border-b border-slate-100"
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Recruiter Session Metrics</span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Expanded Details Body */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 space-y-3 w-64"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Time on Site</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{timeSpentFormatted}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>Total Visits</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{visitCount}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Projects Explored</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{projectsViewedCount}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Gamepad2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Game Rounds</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{gameCount}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                Strictly client-side local metrics
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
