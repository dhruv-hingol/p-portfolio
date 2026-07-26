import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Volume2, VolumeX, Sparkles, User, Cpu, RotateCcw, Gamepad2, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import RpsGame from "./RpsGame";

interface DeveloperGameProps {
  onGameComplete?: () => void;
}

type BoardState = (string | null)[];

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
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

export default function DeveloperGame({ onGameComplete }: DeveloperGameProps) {
  const [activeTab, setActiveTab] = useState<"ttt" | "rps">("ttt");

  // Tic-Tac-Toe State
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isHumanTurn, setIsHumanTurn] = useState<boolean>(true);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [winner, setWinner] = useState<"X" | "O" | "DRAW" | null>(null);
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ human: 0, computer: 0, draws: 0 });
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [showScreenFlash, setShowScreenFlash] = useState<boolean>(false);

  // Progressive AI Streak Tracker
  const [consecutiveWins, setConsecutiveWins] = useState<number>(0);
  const [consecutiveLosses, setConsecutiveLosses] = useState<number>(0);

  // Clean Web Audio UI Sound Synthesizer
  const playSoundEffect = useCallback(
    (type: "win" | "loss" | "draw" | "click" | "tick") => {
      if (isMuted) return;
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

        if (type === "win") {
          // Ascending 3-note major chord (C5 -> E5 -> G5)
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
          // Soft descending 2-note UI tone (D4 -> G3)
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
        } else if (type === "click" || type === "tick") {
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
        // Safe fallback
      }
    },
    [isMuted]
  );

  // Check win or draw status
  const checkWinner = (currentBoard: BoardState) => {
    for (const combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winnerSymbol: currentBoard[a] as "X" | "O", combo };
      }
    }

    if (currentBoard.every((cell) => cell !== null)) {
      return { winnerSymbol: "DRAW" as const, combo: null };
    }

    return null;
  };

  // Smart Computer move selection logic
  const getComputerMove = (currentBoard: BoardState): number => {
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "O";
        if (checkWinner(testBoard)?.winnerSymbol === "O") return i;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        if (checkWinner(testBoard)?.winnerSymbol === "X") return i;
      }
    }

    if (!currentBoard[4]) return 4;

    const corners = [0, 2, 6, 8].filter((idx) => !currentBoard[idx]);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  // Trigger Computer Move automatically with 650ms thinking delay
  useEffect(() => {
    if (!isHumanTurn && !winner && activeTab === "ttt") {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const compMove = getComputerMove(board);
        if (compMove !== undefined && compMove >= 0) {
          const newBoard = [...board];
          newBoard[compMove] = "O";
          setBoard(newBoard);
          playSoundEffect("click");

          const winResult = checkWinner(newBoard);
          if (winResult) {
            handleGameOver(winResult.winnerSymbol, winResult.combo);
          } else {
            setIsHumanTurn(true);
          }
        }
        setIsAiThinking(false);
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [isHumanTurn, board, winner, activeTab]);

  const handleGameOver = (symbol: "X" | "O" | "DRAW", combo: number[] | null) => {
    setWinner(symbol);
    setWinningCombo(combo);
    if (onGameComplete) onGameComplete();

    if (symbol === "X") {
      const newWins = consecutiveWins + 1;
      setConsecutiveWins(newWins);
      setConsecutiveLosses(0);
      setScores((prev) => ({ ...prev, human: prev.human + 1 }));

      // Progressive AI Dialogue
      if (newWins >= 2) {
        const msg = AI_STREAK_WIN_MESSAGES[Math.floor(Math.random() * AI_STREAK_WIN_MESSAGES.length)];
        setToastMessage(msg);
      } else {
        const msg = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
        setToastMessage(msg);
      }

      // Dual-Side Cannon Confetti Explosion
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });

      // Soft Screen Flash
      setShowScreenFlash(true);
      setTimeout(() => setShowScreenFlash(false), 300);

      playSoundEffect("win");
    } else if (symbol === "O") {
      const newLosses = consecutiveLosses + 1;
      setConsecutiveLosses(newLosses);
      setConsecutiveWins(0);
      setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));

      // Progressive AI Dialogue
      if (newLosses >= 2) {
        const msg = AI_STREAK_LOSS_MESSAGES[Math.floor(Math.random() * AI_STREAK_LOSS_MESSAGES.length)];
        setToastMessage(msg);
      } else {
        const msg = LOSS_MESSAGES[Math.floor(Math.random() * LOSS_MESSAGES.length)];
        setToastMessage(msg);
      }

      // Gentle Board Shake
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);

      playSoundEffect("loss");
    } else {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      const msg = DRAW_MESSAGES[Math.floor(Math.random() * DRAW_MESSAGES.length)];
      setToastMessage(msg);
      playSoundEffect("draw");
    }
  };

  // Human Cell Click
  const handleCellClick = (index: number) => {
    if (board[index] || !isHumanTurn || isAiThinking || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    playSoundEffect("click");

    const winResult = checkWinner(newBoard);
    if (winResult) {
      handleGameOver(winResult.winnerSymbol, winResult.combo);
    } else {
      setIsHumanTurn(false);
    }
  };

  // Reset Game Round
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningCombo(null);
    setIsHumanTurn(true);
    setToastMessage(null);
  };

  // Reset Full Scoreboard
  const resetScores = () => {
    resetGame();
    setScores({ human: 0, computer: 0, draws: 0 });
    setConsecutiveWins(0);
    setConsecutiveLosses(0);
  };

  return (
    <section id="game-challenge" className="section-padding relative overflow-hidden">
      {/* Soft Victory Screen Flash Overlay */}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Mini-Game Hub</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          Take a Break
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-xl mx-auto font-normal">
          Challenge the AI with your choice of interactive game.
        </p>

        {/* Top Segmented Tab Switcher */}
        <div className="inline-flex items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-2xl border border-slate-300/60 shadow-inner mb-8">
          <button
            onClick={() => setActiveTab("ttt")}
            className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-200 cursor-pointer ${
              activeTab === "ttt" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {activeTab === "ttt" && (
              <motion.div
                layoutId="activeGameTab"
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/80"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Tic-Tac-Toe</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("rps")}
            className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-200 cursor-pointer ${
              activeTab === "rps" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {activeTab === "rps" && (
              <motion.div
                layoutId="activeGameTab"
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/80"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span>🪨 📄 ✂️</span>
              <span>Rock Paper Scissors</span>
            </span>
          </button>
        </div>

        {/* Active Game Container */}
        <AnimatePresence mode="wait">
          {activeTab === "ttt" ? (
            <motion.div
              key="ttt-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Centered Floating Glass Panel with Victory Gold Glow & Defeat Shake */}
              <motion.div
                animate={isShaking ? { x: [-6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
                className={`glass-card-strong p-6 sm:p-8 rounded-3xl w-full max-w-md mx-auto relative overflow-hidden shadow-2xl flex flex-col gap-3.5 items-center transition-all duration-300 ${
                  winner === "X"
                    ? "border-amber-300 shadow-amber-400/20"
                    : winner === "O"
                    ? "border-rose-200 shadow-rose-500/10"
                    : ""
                }`}
              >
                {/* Top VS Matchup Header Bar (Fixed Height 48px) */}
                <div className="w-full h-12 flex-shrink-0 flex items-center justify-between bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
                  <div
                    className={`flex-1 h-full rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${
                      isHumanTurn && !winner
                        ? "bg-white text-blue-600 shadow-sm border border-blue-100 scale-102"
                        : "text-slate-500"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>YOU (X)</span>
                  </div>

                  <span className="text-[11px] font-extrabold text-slate-400 px-3 uppercase tracking-wider">
                    VS
                  </span>

                  <div
                    className={`flex-1 h-full rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 ${
                      !isHumanTurn && !winner
                        ? "bg-slate-900 text-white shadow-sm scale-102 animate-pulse"
                        : "text-slate-500"
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    <span>{isAiThinking ? "THINKING..." : "AI (O)"}</span>
                  </div>
                </div>

                {/* Fixed 3x3 Board Grid - Locked Cell Dimensions */}
                <div className="w-[276px] h-[276px] aspect-square mx-auto flex-shrink-0 grid grid-cols-3 gap-3">
                  {board.map((cell, idx) => {
                    const isWinningCell = winningCombo?.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleCellClick(idx)}
                        disabled={!!cell || !isHumanTurn || isAiThinking || !!winner}
                        className={`w-[84px] h-[84px] flex-shrink-0 aspect-square rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer relative overflow-hidden border ${
                          isWinningCell
                            ? "bg-gradient-to-br from-amber-400 to-amber-500 border-amber-300 shadow-lg shadow-amber-500/40 scale-105"
                            : cell === "X"
                            ? "bg-blue-50 border-blue-200"
                            : cell === "O"
                            ? "bg-slate-900 border-slate-900"
                            : "bg-white/80 hover:bg-white border-slate-200/80 hover:border-blue-300 shadow-xs"
                        }`}
                      >
                        {cell === "X" && (
                          <motion.svg
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`w-8 h-8 flex-shrink-0 ${
                              isWinningCell ? "text-white" : "text-blue-600"
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </motion.svg>
                        )}

                        {cell === "O" && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="w-8 h-8 flex-shrink-0 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          >
                            <circle cx="12" cy="12" r="8" />
                          </motion.svg>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Toast Message Slot - Fixed Height (40px) */}
                <div className="w-full h-10 flex-shrink-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {toastMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        className={`px-4 py-1.5 rounded-xl border shadow-sm text-xs font-bold text-center flex items-center gap-1.5 ${
                          winner === "X"
                            ? "bg-amber-50 border-amber-200 text-amber-900"
                            : winner === "O"
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-white border-slate-200/90 text-slate-800"
                        }`}
                      >
                        {winner === "X" && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
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
                    onClick={resetGame}
                    className={`flex-1 h-full inline-flex items-center justify-center gap-2 rounded-xl text-white font-bold text-xs shadow-sm transition-all duration-200 cursor-pointer ${
                      winner === "O"
                        ? "bg-blue-600 hover:bg-blue-700 animate-pulse shadow-blue-500/30"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{winner === "O" ? "🔁 Rematch" : "Play Again"}</span>
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
            </motion.div>
          ) : (
            <motion.div
              key="rps-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <RpsGame onGameComplete={onGameComplete} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
