import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LayeredBackground from "./components/LayeredBackground";
import LazySection from "./components/LazySection";
import { useEasterEggs } from "./hooks/useEasterEggs";
import { useAnalytics } from "./hooks/useAnalytics";

// Lazy load below-the-fold sections to minimize initial JavaScript bundle & TBT
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Achievements = lazy(() => import("./components/Achievements"));
const Education = lazy(() => import("./components/Education"));
const DeveloperGame = lazy(() => import("./components/DeveloperGame"));
const FaqSection = lazy(() => import("./components/FaqSection"));
const RecruiterAnalytics = lazy(() => import("./components/RecruiterAnalytics"));
const EasterEggBadgeModal = lazy(() => import("./components/EasterEggBadgeModal"));

function SectionFallback() {
  return <div className="py-20 min-h-[300px] w-full flex items-center justify-center text-slate-400 text-xs font-semibold" />;
}

function App() {
  const {
    rainbowMode,
    wireframeMode,
    showBadgeModal,
    setShowBadgeModal,
    triggerLogoClick,
  } = useEasterEggs();

  const {
    visitCount,
    projectsViewedCount,
    gameCount,
    logProjectView,
    incrementGameCount,
  } = useAnalytics();

  return (
    <div
      className={`relative min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-500 ${
        rainbowMode ? "hue-rotate-180" : ""
      }`}
    >
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-xl"
      >
        Skip to main content
      </a>

      {/* SaaS Multi-Layered Background Infrastructure */}
      <LayeredBackground />

      {/* Navigation with scroll progress & logo click easter egg */}
      <Navigation onLogoClick={triggerLogoClick} />

      <main id="main-content" className="relative z-10">
        {/* Signature 3D Developer Core Hero */}
        <Hero wireframeMode={wireframeMode} />

        {/* Engineering Pillars & Delivery */}
        <About />

        {/* Career Record (Lamda Logs SDE) */}
        <Experience />

        {/* Case Studies with 3D Tilt Cards & Category Filters */}
        <LazySection id="projects" minHeight="500px">
          <Suspense fallback={<SectionFallback />}>
            <Projects onProjectView={logProjectView} />
          </Suspense>
        </LazySection>

        {/* Skills Cards Grid */}
        <LazySection id="skills" minHeight="400px">
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </LazySection>

        {/* Quantifiable Impact Metrics */}
        <LazySection id="achievements" minHeight="400px">
          <Suspense fallback={<SectionFallback />}>
            <Achievements />
          </Suspense>
        </LazySection>

        {/* Standalone Apple x Linear Education Card */}
        <LazySection id="education" minHeight="400px">
          <Suspense fallback={<SectionFallback />}>
            <Education />
          </Suspense>
        </LazySection>

        {/* Redesigned Apple-Style Mini-Game Hub */}
        <LazySection id="game-challenge" minHeight="500px">
          <Suspense fallback={<SectionFallback />}>
            <DeveloperGame onGameComplete={incrementGameCount} />
          </Suspense>
        </LazySection>

        {/* Semantic FAQ & AI Discoverability */}
        <LazySection id="faq" minHeight="400px">
          <Suspense fallback={<SectionFallback />}>
            <FaqSection />
          </Suspense>
        </LazySection>

        {/* Direct Inquiries & Contact Form */}
        <Contact />
      </main>

      <Footer />

      {/* Local Recruiter Session Analytics Widget */}
      <Suspense fallback={null}>
        <RecruiterAnalytics
          visitCount={visitCount}
          projectsViewedCount={projectsViewedCount}
          gameCount={gameCount}
        />
      </Suspense>

      {/* Unlocked Easter Egg Badge Modal */}
      <Suspense fallback={null}>
        <EasterEggBadgeModal
          isOpen={showBadgeModal}
          onClose={() => setShowBadgeModal(false)}
        />
      </Suspense>
    </div>
  );
}

export default App;
