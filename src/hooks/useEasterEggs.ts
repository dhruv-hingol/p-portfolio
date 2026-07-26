import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export function useEasterEggs() {
  const [rainbowMode, setRainbowMode] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  // Konami Code Tracking
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let keyIndex = 0;

    // Word typing tracker for "react"
    let typedWord = "";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in form inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Check Konami Code
      if (e.key === konamiSequence[keyIndex]) {
        keyIndex++;
        if (keyIndex === konamiSequence.length) {
          setRainbowMode((prev) => !prev);
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.6 },
          });
          keyIndex = 0;
        }
      } else {
        keyIndex = 0;
      }

      // Check "react" word typing
      typedWord += e.key.toLowerCase();
      if (typedWord.length > 5) {
        typedWord = typedWord.slice(-5);
      }
      if (typedWord === "react") {
        confetti({
          particleCount: 80,
          spread: 80,
          colors: ["#61dafb", "#212121", "#ffffff"],
        });
        typedWord = "";
      }

      // Check "D" key for 3D Wireframe Toggle
      if (e.key.toLowerCase() === "d" && !e.ctrlKey && !e.metaKey) {
        setWireframeMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerLogoClick = useCallback(() => {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowBadgeModal(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        return 0;
      }
      return next;
    });
  }, []);

  return {
    rainbowMode,
    wireframeMode,
    showBadgeModal,
    setShowBadgeModal,
    triggerLogoClick,
    logoClicks,
  };
}
