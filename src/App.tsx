import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
