import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Volume2, VolumeX, Sparkles, User, Cpu, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

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

export default function DeveloperGame({ onGameComplete }: DeveloperGameProps) {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isHumanTurn, setIsHumanTurn] = useState<boolean>(true);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [winner, setWinner] = useState<"X" | "O" | "DRAW" | null>(null);
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ human: 0, computer: 0, draws: 0 });
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Play subtle web audio sound effect if un-muted
  const playSound = useCallback(
    (freq: number, type: OscillatorType = "sine") => {
      if (isMuted) return;
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch {
        // Safe audio fallback
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
    // 1. Can AI win in next move?
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "O";
        if (checkWinner(testBoard)?.winnerSymbol === "O") return i;
      }
    }

    // 2. Block Human win in next move
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        if (checkWinner(testBoard)?.winnerSymbol === "X") return i;
      }
    }

    // 3. Take Center if available
    if (!currentBoard[4]) return 4;

    // 4. Take Corners if available
    const corners = [0, 2, 6, 8].filter((idx) => !currentBoard[idx]);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Take any remaining empty cell
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  // Trigger Computer Move automatically with 600ms realistic thinking delay
  useEffect(() => {
    if (!isHumanTurn && !winner) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const compMove = getComputerMove(board);
        if (compMove !== undefined && compMove >= 0) {
          const newBoard = [...board];
          newBoard[compMove] = "O";
          setBoard(newBoard);
          playSound(440, "triangle");

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
  }, [isHumanTurn, board, winner]);

  const handleGameOver = (symbol: "X" | "O" | "DRAW", combo: number[] | null) => {
    setWinner(symbol);
    setWinningCombo(combo);
    if (onGameComplete) onGameComplete();

    if (symbol === "X") {
      setScores((prev) => ({ ...prev, human: prev.human + 1 }));
      setToastMessage("🎉 Looks like you'd be a great teammate.");
      // Confetti ONLY when Human wins!
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
      playSound(600, "sine");
    } else if (symbol === "O") {
      setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
      setToastMessage("🤖 The AI wins this round... your code reviews might not.");
      playSound(220, "sawtooth");
    } else {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      setToastMessage("⚡ Great minds think alike.");
      playSound(350, "sine");
    }
  };

  // Human Cell Click
  const handleCellClick = (index: number) => {
    if (board[index] || !isHumanTurn || isAiThinking || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    playSound(523, "sine");

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
  };

  return (
    <section id="game-challenge" className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Feature</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          Take a Break
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-12 max-w-xl mx-auto font-normal">
          Challenge the AI while you're here.
        </p>

        {/* Centered Apple-Style Floating Glass Panel - Fixed Dimension Container */}
        <div className="glass-card-strong p-6 sm:p-8 rounded-3xl w-full max-w-md h-[580px] mx-auto relative overflow-hidden shadow-2xl flex flex-col justify-between">
          
          {/* Top VS Matchup Header Bar (Fixed Height 48px) */}
          <div className="h-12 flex-shrink-0 flex items-center justify-between bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
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
          <div className="w-[282px] h-[282px] aspect-square mx-auto flex-shrink-0 grid grid-cols-3 gap-3 my-auto">
            {board.map((cell, idx) => {
              const isWinningCell = winningCombo?.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  disabled={!!cell || !isHumanTurn || isAiThinking || !!winner}
                  className={`w-[86px] h-[86px] flex-shrink-0 aspect-square rounded-2xl flex items-center justify-center transition-colors duration-200 cursor-pointer relative overflow-hidden border ${
                    isWinningCell
                      ? "bg-blue-600 border-blue-600 shadow-md shadow-blue-500/40"
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
                      className={`w-8 h-8 flex-shrink-0 ${isWinningCell ? "text-white" : "text-blue-600"}`}
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

          {/* Toast Message Slot - Fixed Height (48px) to Prevent CLS */}
          <div className="h-12 flex-shrink-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200/90 shadow-sm text-xs font-bold text-slate-800 text-center"
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scoreboard Bar: Score | Draws | AI Wins (Fixed Height 56px) */}
          <div className="h-14 flex-shrink-0 grid grid-cols-3 gap-2 p-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-center items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                Score
              </span>
              <span className="text-sm font-extrabold text-blue-600">{scores.human}</span>
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

          {/* Action Buttons Slot - Fixed Height (44px) */}
          <div className="h-11 flex-shrink-0 flex items-center justify-between gap-2">
            <button
              onClick={resetGame}
              className="flex-1 h-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Play Again</span>
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

        </div>

      </div>
    </section>
  );
}
