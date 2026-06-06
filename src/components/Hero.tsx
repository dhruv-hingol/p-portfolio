import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="hero" className="section-container relative">
      {/* Background Decoration */}
      <div className="background-decoration" />

      <motion.div
        className="max-w-6xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Available for Hire Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex justify-center"
        >
          <span className="glass-card-strong px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-accent-400 flex items-center gap-2 border border-accent-500/30 glow-orange">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            Available for Freelance Contract / Retainer
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-primary-400 text-lg font-medium">
            Hey there! 👋 I'm
          </span>
        </motion.div>

        {/* Name with Gradient */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl leading-normal font-bold mb-6 gradient-text-bright"
        >
          Dhruv Hingol
        </motion.h1>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl font-bold mb-6 text-slate-200"
        >
          Frontend & React Native Developer
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed"
        >
          I build responsive web platforms and cross-platform mobile apps that
          turn your ideas into functional products.
        </motion.p>

        {/* Tech Stack Pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8 max-w-3xl mx-auto"
        >
          {[
            "React 19",
            "React Native",
            "TypeScript 5.8",
            "Next.js",
            "Vite 7",
            "Zustand",
            "TanStack Query",
            "Tailwind CSS 4.1",
          ].map((tech) => (
            <span
              key={tech}
              className="glass-card px-4 py-2 rounded-full text-sm font-medium text-primary-300 hover:glow-orange transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          I design high-performance React Native mobile apps and interactive
          React web applications. Focused on pixel-perfect UI/UX, state
          management, remote collaboration, and rapid delivery to scale your
          startup.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="glass-card-strong px-8 py-4 rounded-xl font-semibold hover-lift glow-orange flex items-center gap-2 group text-white"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Let's Discuss Your Project
          </a>
          <a
            href="#projects"
            className="glass-card px-8 py-4 rounded-xl font-semibold hover-lift flex items-center gap-2 group border-accent-500/30 text-accent-300 hover:glow-orange"
          >
            See Case Studies
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        {/* Contact Info & Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 text-slate-400"
        >
          <a
            href="mailto:dhruvhingol2210@gmail.com"
            className="flex items-center gap-2 hover:text-primary-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline">dhruvhingol2210@gmail.com</span>
          </a>
          <a
            href="tel:+918735099370"
            className="flex items-center gap-2 hover:text-primary-400 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">+91 8735099370</span>
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Ahmedabad, India
          </span>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mt-8"
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 rounded-full hover-lift glow-orange group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 rounded-full hover-lift glow-slate group"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-400/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-primary-400 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
