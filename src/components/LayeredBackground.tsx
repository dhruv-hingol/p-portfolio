import { useEffect, useState } from "react";

export default function LayeredBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Layer 1: Off-White Base (#FCFCFD) */}
      <div className="absolute inset-0 bg-[#FCFCFD]" />

      {/* Layer 2: Blurred Radial Gradients (Blue & Violet) */}
      <div
        className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] rounded-full bg-radial from-blue-500/8 via-indigo-500/4 to-transparent blur-3xl transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      <div
        className="absolute top-[40%] right-[10%] w-[700px] h-[700px] rounded-full bg-radial from-violet-500/6 via-purple-500/3 to-transparent blur-3xl transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${-scrollY * 0.04}px)` }}
      />
      <div
        className="absolute bottom-[-10%] left-[10%] w-[900px] h-[900px] rounded-full bg-radial from-blue-600/6 via-slate-400/3 to-transparent blur-3xl transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      />

      {/* Layer 3: Faint Animated Linear / Figma Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Layer 4: Glass Light Reflections Moving Slowly Across Screen */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[400px] h-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glass-sweep opacity-70" />
      </div>

      {/* Layer 5: Floating Geometric Ambient Outlines */}
      <div
        className="absolute top-[15%] left-[5%] w-64 h-64 border border-slate-200/50 rounded-3xl rotate-12 transition-transform duration-500"
        style={{ transform: `translateY(${scrollY * 0.06}px) rotate(12deg)` }}
      />
      <div
        className="absolute top-[60%] right-[6%] w-80 h-80 border border-indigo-200/40 rounded-full transition-transform duration-500"
        style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
      />

      {/* Layer 6: SVG Noise Texture (2-3% opacity) */}
      <div className="absolute inset-0 bg-noise-pattern opacity-100" />

      {/* Layer 7: Soft Ambient Lighting Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-slate-100/30" />
    </div>
  );
}
