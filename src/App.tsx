import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import DeveloperGame from "./components/DeveloperGame";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LayeredBackground from "./components/LayeredBackground";
import RecruiterAnalytics from "./components/RecruiterAnalytics";
import EasterEggBadgeModal from "./components/EasterEggBadgeModal";
import { useEasterEggs } from "./hooks/useEasterEggs";
import { useAnalytics } from "./hooks/useAnalytics";

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
    formattedTimeSpent,
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
      {/* SaaS Multi-Layered Background Infrastructure */}
      <LayeredBackground />

      {/* Navigation with scroll progress & logo click easter egg */}
      <Navigation onLogoClick={triggerLogoClick} />

      <main className="relative z-10">
        {/* Signature 3D Developer Core Hero */}
        <Hero wireframeMode={wireframeMode} />

        {/* Engineering Pillars & Education */}
        <About />

        {/* Career Timeline */}
        <Experience />

        {/* Case Studies with 3D Tilt Cards */}
        <Projects onProjectView={logProjectView} />

        {/* Skills Cards Grid */}
        <Skills />

        {/* Quantifiable Impact Metrics */}
        <Achievements />

        {/* Redesigned Apple-Style Tic-Tac-Toe AI Game */}
        <DeveloperGame onGameComplete={incrementGameCount} />

        {/* Direct Inquiries & Contact Form */}
        <Contact />
      </main>

      <Footer />

      {/* Local Recruiter Session Analytics Widget */}
      <RecruiterAnalytics
        visitCount={visitCount}
        timeSpentFormatted={formattedTimeSpent}
        projectsViewedCount={projectsViewedCount}
        gameCount={gameCount}
      />

      {/* Unlocked Easter Egg Badge Modal */}
      <EasterEggBadgeModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
      />
    </div>
  );
}

export default App;
