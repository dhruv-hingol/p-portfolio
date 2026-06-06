import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle2, Loader2, Calendar } from "lucide-react";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Mobile App (React Native)",
    budget: "$2,000 - $5,000",
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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
        className="max-w-6xl mx-auto w-full"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
            Let's Collaborate
          </span>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mt-2 mb-4">
            Start Your Project
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 text-lg max-w-xl mx-auto">
            Ready to turn your idea into a functional product? Tell me about it below and let's build together.
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Trust Indicators (Left) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            {/* Value card */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-accent-500">
              <h3 className="text-lg font-bold text-white mb-2">Why work with me?</h3>
              <ul className="space-y-3 text-sm text-slate-350">
                <li className="flex gap-2">
                  <span className="text-accent-400 font-bold">✓</span>
                  <span>Direct communication, no agency layers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400 font-bold">✓</span>
                  <span>Rapid turnaround with production-ready code</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400 font-bold">✓</span>
                  <span>End-to-end support from cloud setup to App Stores</span>
                </li>
              </ul>
            </div>

            {/* Coordinates Card */}
            <div className="glass-card-strong rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">Direct Coordinates</h3>
              <div className="space-y-4">
                <a
                  href="mailto:dhruvhingol2210@gmail.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-primary-400 transition-colors text-sm group"
                >
                  <div className="p-2.5 rounded-lg glass-card group-hover:bg-primary-500/10">
                    <Mail className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="truncate">dhruvhingol2210@gmail.com</span>
                </a>

                <a
                  href="tel:+918735099370"
                  className="flex items-center gap-3 text-slate-300 hover:text-primary-400 transition-colors text-sm group"
                >
                  <div className="p-2.5 rounded-lg glass-card group-hover:bg-primary-500/10">
                    <Phone className="w-5 h-5 text-primary-400" />
                  </div>
                  <span>+91 8735099370</span>
                </a>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2.5 rounded-lg glass-card">
                    <MapPin className="w-5 h-5 text-primary-400" />
                  </div>
                  <span>Ahmedabad, India (GMT+5:30)</span>
                </div>
              </div>

              <div className="border-t border-slate-800/60 pt-6">
                <h4 className="text-sm font-semibold text-white mb-3">Connect Socially</h4>
                <div className="flex gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-card hover:text-primary-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-card hover:text-primary-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card (Right) */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <div className="glass-card-strong rounded-2xl p-8 md:p-10 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="inquiry-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">Project Inquiry Form</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all duration-300 placeholder-slate-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. john@company.com"
                          className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all duration-300 placeholder-slate-600"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="service" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Service Needed
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all duration-300"
                        >
                          <option value="Mobile App (React Native)" className="bg-slate-950">Mobile App (React Native)</option>
                          <option value="Web App Development (React/Next.js)" className="bg-slate-950">Web App (React/Next.js)</option>
                          <option value="Frontend Performance Audit" className="bg-slate-950">Frontend Performance Audit</option>
                          <option value="UI/UX Implementation" className="bg-slate-950">UI/UX Implementation</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Estimated Budget Tier
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all duration-300"
                        >
                          <option value="Under $2,000" className="bg-slate-950">Under $2,000</option>
                          <option value="$2,000 - $5,000" className="bg-slate-950">$2,000 - $5,000</option>
                          <option value="$5,000 - $10,000" className="bg-slate-950">$5,000 - $10,000</option>
                          <option value="$10,000+" className="bg-slate-950">$10,000+ (Large project)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="details" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Project Details / Challenge to Solve <span className="text-rose-500">*</span>
                        <span className="text-[10px] text-slate-500 lowercase normal-case block mt-0.5">Please describe what you want built and any specific performance/deadline requirements.</span>
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        required
                        rows={4}
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Tell me about your product idea or the technical challenges you are facing..."
                        className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all duration-300 placeholder-slate-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full glass-card-strong px-8 py-4 rounded-xl font-bold text-white hover-lift glow-orange flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-primary-400" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 text-primary-400 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Submit Project Details</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                      <CheckCircle2 className="w-16 h-16 animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Inquiry Received!</h3>
                    <p className="text-slate-350 max-w-md mx-auto text-sm leading-relaxed">
                      Thank you, <span className="text-primary-300 font-semibold">{formData.name}</span>! I've received your request to discuss a <span className="text-accent-400 font-semibold">{formData.service}</span>.
                    </p>
                    <p className="text-slate-400 max-w-sm mx-auto text-xs">
                      I will review your project details and get back to you within 24 hours with some initial implementation ideas.
                    </p>

                    <div className="pt-6 border-t border-slate-800/60 max-w-md mx-auto">
                      <p className="text-xs text-slate-500 mb-4">Want to secure a slot in my calendar immediately?</p>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert("Calendar booking would open here!"); }}
                        className="inline-flex items-center gap-2 glass-card-strong px-6 py-3 rounded-lg text-sm font-semibold text-primary-300 hover:glow-orange transition-all"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book a 15-Min Discovery Call</span>
                      </a>
                    </div>

                    <button
                      onClick={() => {
                        setFormData({ name: "", email: "", service: "Mobile App (React Native)", budget: "$2,000 - $5,000", details: "" });
                        setIsSubmitted(false);
                      }}
                      className="text-slate-500 hover:text-slate-300 transition-colors text-xs underline block mx-auto pt-4 cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center text-slate-500 text-xs md:text-sm border-t border-slate-900 pt-8"
        >
          <p className="mb-2">© 2026 Dhruv Hingol. All rights reserved.</p>
          <p>
            Designed with a client-first mindset. Built with React 19, TypeScript, and Tailwind CSS.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
