import { motion } from "framer-motion";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Copy,
  Download,
  Check,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, TECH_STACK } from "../constants";

export default function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

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
      <div className="background-decoration" />

      <motion.div
        className="max-w-6xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-primary-500 text-lg font-medium">
            Hey there! 👋 I'm
          </span>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold mb-6 leading-28 gradient-text-bright"
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl font-semibold mb-6 text-slate-200"
        >
          {PERSONAL_INFO.title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-300 mb-4"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8 max-w-3xl mx-auto"
        >
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="glass-card px-4 py-2 rounded-full text-sm font-medium text-primary-400 hover:glow-teal hover:border-primary-500/30 transition-all duration-300 border border-primary-500/20"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {PERSONAL_INFO.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="glass-card-strong px-8 py-4 rounded-xl font-semibold hover-lift glow-teal flex items-center gap-2 group bg-gradient-to-r from-primary-600 to-primary-500 border border-primary-400/20"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Let's Chat
          </a>
          <button
            onClick={copyEmail}
            className="glass-card px-8 py-4 rounded-xl font-semibold hover-lift flex items-center gap-2 group border-accent-500/30 hover:border-accent-400/50 transition-all"
          >
            {emailCopied ? (
              <>
                <Check className="w-5 h-5 text-accent-400" />
                Email Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Copy Email
              </>
            )}
          </button>
          <a
            href="/resume.pdf"
            download
            className="glass-card px-8 py-4 rounded-xl font-semibold hover-lift flex items-center gap-2 group border-coral-500/30 hover:border-coral-400/50 transition-all"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Resume
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 text-slate-400"
        >
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 hover:text-primary-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline">{PERSONAL_INFO.email}</span>
          </a>
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="flex items:center gap-2 hover:text-primary-400 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">{PERSONAL_INFO.phone}</span>
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {PERSONAL_INFO.location}
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mt-8"
        >
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 rounded-full hover-lift glow-teal group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 rounded-full hover-lift glow-amber group"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>
      </motion.div>

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
