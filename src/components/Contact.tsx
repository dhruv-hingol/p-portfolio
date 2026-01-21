import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { PERSONAL_INFO } from "../constants";

export default function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("dhruvhingol2210@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-coral-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg">
            Always up for interesting conversations and new opportunities!
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card-strong rounded-2xl p-10 hover-lift glow-cyan"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col items-center text-center">
              <div className="glass-card p-4 rounded-full mb-4">
                <Mail className="w-8 h-8 text-primary-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-slate-400 text-sm break-all mb-3">
                {PERSONAL_INFO?.email}
              </p>
              <button
                onClick={copyEmail}
                className="glass-card px-4 py-2 rounded-lg text-sm font-medium hover:glow-teal transition-all flex items-center gap-2 group"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4 text-accent-400" />
                    <span className="text-accent-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <a
              href="tel:+918735099370"
              className="flex flex-col items-center text-center group"
            >
              <div className="glass-card p-4 rounded-full mb-4 group-hover:glow-amber transition-all duration-300">
                <Phone className="w-8 h-8 text-accent-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-white font-semibold mb-2">Phone</h4>
              <p className="text-slate-400 text-sm">{PERSONAL_INFO?.phone}</p>
            </a>

            <div className="flex flex-col items-center text-center">
              <div className="glass-card p-4 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-coral-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Location</h4>
              <p className="text-slate-400 text-sm">
                {PERSONAL_INFO?.location}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mb-10" />

          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-6">
              Connect With Me
            </h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://linkedin.com/in/dhruvhingol"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 rounded-xl hover-lift glow-teal group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://github.com/dhruv-hingol"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 rounded-xl hover-lift glow-amber group"
                aria-label="GitHub"
              >
                <Github className="w-8 h-8 text-accent-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="mailto:dhruvhingol2210@gmail.com"
              className="inline-flex items-center gap-3 glass-card-strong px-8 py-4 rounded-xl font-semibold text-lg hover-lift glow-teal group bg-gradient-to-r from-primary-600 to-primary-500 border border-primary-400/20"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Drop Me a Line
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center text-slate-500"
        >
          <p className="mb-2">© 2026 Dhruv Hingol. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
