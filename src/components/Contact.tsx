import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";

export default function Contact() {
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
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-gray-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg">
            Always up for interesting conversations and new opportunities!
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          variants={itemVariants}
          className="glass-card-strong rounded-2xl p-10 hover-lift glow-purple"
        >
          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <a
              href="mailto:dhruvhingol2210@gmail.com"
              className="flex flex-col items-center text-center group"
            >
              <div className="glass-card p-4 rounded-full mb-4 group-hover:glow-purple transition-all duration-300">
                <Mail className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-slate-400 text-sm break-all">
                dhruvhingol2210@gmail.com
              </p>
            </a>

            <a
              href="tel:+918735099370"
              className="flex flex-col items-center text-center group"
            >
              <div className="glass-card p-4 rounded-full mb-4 group-hover:glow-gray transition-all duration-300">
                <Phone className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-white font-semibold mb-2">Phone</h4>
              <p className="text-slate-400 text-sm">+91 8735099370</p>
            </a>

            <div className="flex flex-col items-center text-center">
              <div className="glass-card p-4 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Location</h4>
              <p className="text-slate-400 text-sm">Ahmedabad, India</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700/50 mb-10" />

          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-6">
              Connect With Me
            </h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 rounded-xl hover-lift glow-purple group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 rounded-xl hover-lift glow-gray group"
                aria-label="GitHub"
              >
                <Github className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center">
            <a
              href="mailto:dhruvhingol2210@gmail.com"
              className="inline-flex items-center gap-3 glass-card-strong px-8 py-4 rounded-xl font-semibold text-lg hover-lift glow-purple group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Drop Me a Line
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center text-slate-500"
        >
          <p className="mb-2">© 2026 Dhruv Hingol. All rights reserved.</p>
          <p className="text-sm">
            Built with <span className="text-red-400">♥</span> using React 19,
            TypeScript, and Vite 7
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
