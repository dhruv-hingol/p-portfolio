import { useState, useEffect, useCallback } from "react";

export function useAnalytics() {
  const [visitCount, setVisitCount] = useState<number>(1);
  const [secondsSpent, setSecondsSpent] = useState<number>(0);
  const [projectsViewed, setProjectsViewed] = useState<Set<string>>(new Set());
  const [gameCount, setGameCount] = useState<number>(0);

  // Initialize and increment visit count
  useEffect(() => {
    try {
      const storedVisits = localStorage.getItem("dh_portfolio_visits");
      const currentVisits = storedVisits ? parseInt(storedVisits, 10) + 1 : 1;
      localStorage.setItem("dh_portfolio_visits", currentVisits.toString());
      setVisitCount(currentVisits);

      const storedGames = localStorage.getItem("dh_portfolio_games");
      if (storedGames) setGameCount(parseInt(storedGames, 10));
    } catch {
      // Fallback if localStorage is restricted
      setVisitCount(1);
    }
  }, []);

  // Timer spent on website
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const logProjectView = useCallback((id: string) => {
    setProjectsViewed((prev) => new Set(prev).add(id));
  }, []);

  const incrementGameCount = useCallback(() => {
    setGameCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("dh_portfolio_games", next.toString());
      } catch {
        // Safe fallback
      }
      return next;
    });
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    visitCount,
    formattedTimeSpent: formatTime(secondsSpent),
    secondsSpent,
    projectsViewedCount: projectsViewed.size,
    gameCount,
    logProjectView,
    incrementGameCount,
  };
}
