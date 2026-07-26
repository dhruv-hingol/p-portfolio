import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Volume2, VolumeX, RotateCcw, User, Cpu, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface RpsGameProps {
  onGameComplete?: () => void;
}

type Move = "rock" | "paper" | "scissors";

const MOVES: { id: Move; label: string; icon: string }[] = [
  { id: "rock", label: "Rock", icon: "🪨" },
  { id: "paper", label: "Paper", icon: "📄" },
  { id: "scissors", label: "Scissors", icon: "✂️" },
];

const WIN_MESSAGES = [
  "🏆 Excellent! You outplayed the AI.",
  "🎉 Well played! That's strategic thinking.",
  "✨ Nice move. Looks like problem-solving is your strength.",
];

const LOSS_MESSAGES = [
  "🤖 The AI got lucky this time.",
  "😄 Almost! One more round?",
  "⚡ You're getting closer.",
  "💡 Think like a developer. Try a different strategy.",
  "🚀 One more game? I have a feeling you'll win.",
];

const DRAW_MESSAGES = [
  "⚡ That was close.",
  "🤝 Great minds think alike.",
  "🎯 Almost had it.",
];

const AI_STREAK_LOSS_MESSAGES = [
  "🤖 I'm starting to understand your strategy...",
  "🤖 You're improving.",
  "🤖 Can you beat me this time?",
  "🤖 Let's see if you can turn it around.",
];

const AI_STREAK_WIN_MESSAGES = [
  "🤖 You're really good at this.",
  "🤖 Okay... that was impressive.",
  "🤖 Looks like I need a software update.",
];

export default function RpsGame({ onGameComplete }: RpsGameProps) {
  const [userMove, setUserMove] = useState<Move | null>(null);
  const [computerMove, setComputerMove] = useState<Move | null>(null);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [result, setResult] = useState<"human" | "computer" | "draw" | null>(null);
  const [scores, setScores] = useState({ human: 0, computer: 0, draws: 0 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [showScreenFlash, setShowScreenFlash] = useState<boolean>(false);

  // Progressive AI Streak Tracker
  const [consecutiveWins, setConsecutiveWins] = useState<number>(0);
  const [consecutiveLosses, setConsecutiveLosses] = useState<number>(0);

  // Clean Web Audio UI Sound Synthesizer
  const playSoundEffect = useCallback(
    (type: "win" | "loss" | "draw" | "click") => {
      if (isMuted) return;
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

        if (type === "win") {
          const notes = [523.25, 659.25, 783.99];
          notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + idx * 0.08);
            osc.stop(audioCtx.currentTime + idx * 0.08 + 0.25);
          });
        } else if (type === "loss") {
          const notes = [293.66, 196.00];
          notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "triangle";
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.25);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + idx * 0.1);
            osc.stop(audioCtx.currentTime + idx * 0.1 + 0.25);
          });
        } else if (type === "draw") {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.value = 349.23;
          gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.2);
        } else if (type === "click") {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.value = 440;
          gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.08);
        }
      } catch {
        // Fallback
      }
    },
    [isMuted]
  );

  // Play human turn selection
  const handleSelectMove = (move: Move) => {
    if (isAiThinking || result) return;

    setUserMove(move);
    setComputerMove(null);
    setIsAiThinking(true);
    playSoundEffect("click");

    // 750ms AI thinking delay
    setTimeout(() => {
      const validMoves: Move[] = ["rock", "paper", "scissors"];
      const aiChoice = validMoves[Math.floor(Math.random() * validMoves.length)];
      setComputerMove(aiChoice);
      setIsAiThinking(false);

      evaluateOutcome(move, aiChoice);
    }, 750);
  };

  const evaluateOutcome = (player: Move, ai: Move) => {
    if (onGameComplete) onGameComplete();

    if (player === ai) {
      setResult("draw");
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      const msg = DRAW_MESSAGES[Math.floor(Math.random() * DRAW_MESSAGES.length)];
      setToastMessage(msg);
      playSoundEffect("draw");
    } else if (
      (player === "rock" && ai === "scissors") ||
      (player === "paper" && ai === "rock") ||
      (player === "scissors" && ai === "paper")
    ) {
      const newWins = consecutiveWins + 1;
      setConsecutiveWins(newWins);
      setConsecutiveLosses(0);
      setResult("human");
      setScores((prev) => ({ ...prev, human: prev.human + 1 }));

      if (newWins >= 2) {
        const msg = AI_STREAK_WIN_MESSAGES[Math.floor(Math.random() * AI_STREAK_WIN_MESSAGES.length)];
        setToastMessage(msg);
      } else {
        const msg = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
        setToastMessage(msg);
      }

      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });

      setShowScreenFlash(true);
      setTimeout(() => setShowScreenFlash(false), 300);

      playSoundEffect("win");
    } else {
      const newLosses = consecutiveLosses + 1;
      setConsecutiveLosses(newLosses);
      setConsecutiveWins(0);
      setResult("computer");
      setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));

      if (newLosses >= 2) {
        const msg = AI_STREAK_LOSS_MESSAGES[Math.floor(Math.random() * AI_STREAK_LOSS_MESSAGES.length)];
        setToastMessage(msg);
      } else {
        const msg = LOSS_MESSAGES[Math.floor(Math.random() * LOSS_MESSAGES.length)];
        setToastMessage(msg);
      }

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);

      playSoundEffect("loss");
    }
  };

  const resetRound = () => {
    setUserMove(null);
    setComputerMove(null);
    setResult(null);
    setToastMessage(null);
  };

  const resetScores = () => {
    resetRound();
    setScores({ human: 0, computer: 0, draws: 0 });
    setConsecutiveWins(0);
    setConsecutiveLosses(0);
  };

  return (
    <>
      <AnimatePresence>
        {showScreenFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-amber-300 pointer-events-none z-50"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={isShaking ? { x: [-6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className={`glass-card-strong p-6 sm:p-8 rounded-3xl w-full max-w-md mx-auto relative overflow-hidden shadow-2xl flex flex-col gap-3.5 items-center transition-all duration-300 ${
          result === "human"
            ? "border-amber-300 shadow-amber-400/20"
            : result === "computer"
            ? "border-rose-200 shadow-rose-500/10"
            : ""
        }`}
      >
      {/* Top VS Matchup Header Bar (Fixed Height 48px) */}
      <div className="w-full h-12 flex-shrink-0 flex items-center justify-between bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
        <div
          className={`flex-1 h-full rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${
            userMove && !result
              ? "bg-white text-blue-600 shadow-sm border border-blue-100 scale-102"
              : "text-slate-500"
          }`}
        >
          <User className="w-4 h-4" />
          <span>YOU</span>
        </div>

        <span className="text-[11px] font-extrabold text-slate-400 px-3 uppercase tracking-wider">
          VS
        </span>

        <div
          className={`flex-1 h-full rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${
            isAiThinking
              ? "bg-slate-900 text-white shadow-sm scale-102 animate-pulse"
              : "text-slate-500"
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>{isAiThinking ? "CHOOSING..." : "AI"}</span>
        </div>
      </div>

      {/* Move Reveal & Battle Arena (Fixed Height 180px) */}
      <div className="w-full h-[180px] flex-shrink-0 flex items-center justify-center gap-6 relative border border-slate-100 rounded-2xl bg-white/40">
        {/* Player Chosen Move */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Your Move
          </span>
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-sm border transition-all duration-300 ${
              userMove
                ? "bg-white border-blue-300 shadow-blue-500/10 scale-102"
                : "bg-slate-50 border-slate-200 text-slate-300 border-dashed"
            }`}
          >
            {userMove ? (
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                {MOVES.find((m) => m.id === userMove)?.icon}
              </motion.span>
            ) : (
              "?"
            )}
          </div>
        </div>

        {/* Center Divider / VS Icon */}
        <div className="text-xs font-black text-slate-300">VS</div>

        {/* AI Chosen Move */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            AI Move
          </span>
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-sm border transition-all duration-300 ${
              computerMove
                ? "bg-slate-900 text-white border-slate-900 shadow-slate-900/20 scale-102"
                : "bg-slate-50 border-slate-200 text-slate-300 border-dashed"
            }`}
          >
            {isAiThinking ? (
              <span className="animate-spin text-xl">⏳</span>
            ) : computerMove ? (
              <motion.span
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                {MOVES.find((m) => m.id === computerMove)?.icon}
              </motion.span>
            ) : (
              "?"
            )}
          </div>
        </div>
      </div>

      {/* Move Selection Cards (Fixed Height 64px) */}
      <div className="w-full h-[64px] flex-shrink-0 flex items-center justify-center gap-2.5">
        {MOVES.map((m) => {
          const isSelected = userMove === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectMove(m.id)}
              disabled={isAiThinking || !!result}
              className={`flex-1 h-full rounded-2xl flex flex-col items-center justify-center gap-0.5 border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-102"
                  : "bg-white hover:bg-blue-50/50 border-slate-200/80 hover:border-blue-300 shadow-2xs"
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              <span className={`text-[10px] font-bold ${isSelected ? "text-white" : "text-slate-700"}`}>
                {m.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toast Message Slot (Fixed Height 40px) */}
      <div className="w-full h-10 flex-shrink-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              className={`px-4 py-1.5 rounded-xl border shadow-sm text-xs font-bold text-center flex items-center gap-1.5 ${
                result === "human"
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : result === "computer"
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-200/90 text-slate-800"
              }`}
            >
              {result === "human" && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scoreboard Bar: Score | Draws | AI Wins (Fixed Height 56px) */}
      <div className="w-full h-14 flex-shrink-0 grid grid-cols-3 gap-2 p-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-center items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
            Score
          </span>
          <motion.span
            key={scores.human}
            initial={{ scale: 1.3, color: "#2563EB" }}
            animate={{ scale: 1 }}
            className="text-sm font-extrabold text-blue-600 block"
          >
            {scores.human}
          </motion.span>
        </div>
        <div className="border-x border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
            Draws
          </span>
          <span className="text-sm font-extrabold text-slate-700">{scores.draws}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
            AI Wins
          </span>
          <span className="text-sm font-extrabold text-slate-900">{scores.computer}</span>
        </div>
      </div>

      {/* Action Buttons Slot - Pulsing Rematch CTA when user loses */}
      <div className="w-full h-11 flex-shrink-0 flex items-center justify-between gap-2">
        <button
          onClick={resetRound}
          className={`flex-1 h-full inline-flex items-center justify-center gap-2 rounded-xl text-white font-bold text-xs shadow-sm transition-all duration-200 cursor-pointer ${
            result === "computer"
              ? "bg-blue-600 hover:bg-blue-700 animate-pulse shadow-blue-500/30"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{result === "computer" ? "🔁 Rematch" : "Play Again"}</span>
        </button>

        <button
          onClick={resetScores}
          className="h-full inline-flex items-center justify-center gap-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all duration-200 cursor-pointer border border-slate-200/80"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset</span>
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="h-full w-11 inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200/80"
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  </>
  );
}
