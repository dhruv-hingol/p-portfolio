import { Chrome, ShoppingCart, Sparkles } from "lucide-react";

export const PROJECTS = [
  {
    name: "Aegis Tracker",
    subtitle: "Privacy-First Productivity Analyzer",
    description:
      "Chrome Extension for tracking browsing productivity with 100% local storage and smart idle detection.",
    features: [
      "Privacy-first architecture with chrome.storage.local",
      "Smart idle detection algorithm for accurate tracking",
      "Daily/weekly analytics with Recharts visualization",
      "CSV data export for portability",
    ],
    tech: [
      "React 19",
      "Vite",
      "Chrome Extension API",
      "Recharts",
      "TypeScript",
    ],
    icon: Chrome,
    gradient: "from-primary-500 to-primary-700",
    links: {
      live: "",
      github: "https://github.com/dhruv-hingol/productivity-analyzer",
    },
  },
  {
    name: "Daily Muse",
    subtitle: "AI-Powered Daily Inspiration",
    description:
      "Interactive AI chatbot providing inspirational quotes, jokes, and news using Google Gemini API with modern React architecture.",
    features: [
      "AI-powered chat using Google Gemini API",
      "Generates quotes with author attribution and interpretation",
      "Provides jokes and latest news on user topics",
      "Local storage for persistent chat history",
    ],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Google Gemini",
      "Lucide Icons",
    ],
    icon: Sparkles,
    gradient: "from-coral-500 to-coral-700",
    links: {
      live: "https://daily-muse-rouge.vercel.app/",
      github: "https://github.com/dhruv-hingol/daily-muse",
    },
  },
  {
    name: "Purchase Store",
    subtitle: "E-Commerce Platform",
    description:
      "Commercial e-commerce application with dynamic cart management and real-time price adjustments.",
    features: [
      "Built with Next.js for optimal SEO and performance",
      "Dynamic cart with real-time price calculations",
      "Responsive design with Tailwind CSS",
      "Redux Toolkit for state management",
    ],
    tech: ["Next.js", "Tailwind CSS", "Redux Toolkit", "TypeScript"],
    icon: ShoppingCart,
    gradient: "from-accent-500 to-accent-700",
    links: {
      live: "https://purchase-store.vercel.app/",
      github: "https://github.com/dhruv-hingol/purchase-store",
    },
  },
] as const;
