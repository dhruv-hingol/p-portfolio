import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle2, Loader2, MessageSquare, ChevronDown } from "lucide-react";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Mobile App (React Native)",
    customService: "",
    budget: "$2,500 - $5,000",
    customBudget: "",
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

    if (formData.service === "Other" && !formData.customService) {
      alert("Please specify the custom service needed.");
      return;
    }
    if (formData.budget === "Other" && !formData.customBudget) {
      alert("Please specify your custom budget.");
      return;
    }

    setIsSubmitting(true);

    const finalService = formData.service === "Other" ? formData.customService : formData.service;
    const finalBudget = formData.budget === "Other" ? formData.customBudget : formData.budget;

    fetch("https://formsubmit.co/ajax/dhruvhingol2210@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "Client Name": formData.name,
        "Client Email": formData.email,
        "Requested Service": finalService,
        "Estimated Budget": finalBudget,
        "Project Details": formData.details,
        "_subject": `[Client Inquiry] ${finalService} from ${formData.name}`,
        "_replyto": formData.email,
        "_template": "box"
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Form submission failed");
      })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Submission error:", error);
        alert("Failed to send inquiry. Please try again or email dhruvhingol2210@gmail.com directly.");
        setIsSubmitting(false);
      });
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
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
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
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full appearance-none bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl pl-4 pr-12 py-3 text-sm text-white transition-all duration-300"
                          >
                            <option value="Mobile App (React Native)" className="bg-slate-950">Mobile App (React Native)</option>
                            <option value="Web App (React/Next.js)" className="bg-slate-950">Web App (React/Next.js)</option>
                            <option value="SaaS & Client Dashboard" className="bg-slate-950">SaaS & Client Dashboard</option>
                            <option value="E-Commerce Web Store" className="bg-slate-950">E-Commerce Web Store</option>
                            <option value="Landing Page & Marketing Site" className="bg-slate-950">Landing Page & Marketing Site</option>
                            <option value="Chrome Extension Development" className="bg-slate-950">Chrome Extension Development</option>
                            <option value="Frontend Performance Audit" className="bg-slate-950">Frontend Performance Audit</option>
                            <option value="UI/UX Implementation (Figma to Code)" className="bg-slate-950">UI/UX Implementation (Figma to Code)</option>
                            <option value="Custom Component Library" className="bg-slate-950">Custom Component Library</option>
                            <option value="Progressive Web App (PWA)" className="bg-slate-950">Progressive Web App (PWA)</option>
                            <option value="Other" className="bg-slate-950">Other (Write Custom Service...)</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <AnimatePresence>
                          {formData.service === "Other" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <input
                                type="text"
                                name="customService"
                                required
                                value={formData.customService}
                                onChange={handleChange}
                                placeholder="Describe custom service (e.g. Map Widget, Code Review)..."
                                className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all duration-300 placeholder-slate-600"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Estimated Budget Tier
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full appearance-none bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl pl-4 pr-12 py-3 text-sm text-white transition-all duration-300"
                          >
                            <option value="Under $1,000" className="bg-slate-950">Under $1,000</option>
                            <option value="$1,000 - $2,500" className="bg-slate-950">$1,000 - $2,500</option>
                            <option value="$2,500 - $5,000" className="bg-slate-950">$2,500 - $5,000</option>
                            <option value="$5,000 - $7,500" className="bg-slate-950">$5,000 - $7,500</option>
                            <option value="$7,500 - $10,000" className="bg-slate-950">$7,500 - $10,000</option>
                            <option value="$10,000 - $15,000" className="bg-slate-950">$10,000 - $15,000</option>
                            <option value="$15,000 - $25,000" className="bg-slate-950">$15,000 - $25,000</option>
                            <option value="$25,000+" className="bg-slate-950">$25,000+ (Enterprise)</option>
                            <option value="Other" className="bg-slate-950">Other (Write Custom Budget...)</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <AnimatePresence>
                          {formData.budget === "Other" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <input
                                type="text"
                                name="customBudget"
                                required
                                value={formData.customBudget}
                                onChange={handleChange}
                                placeholder="Describe custom budget (e.g. $150/hr retainer)..."
                                className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-primary-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all duration-300 placeholder-slate-600"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                      Thank you, <span className="text-primary-300 font-semibold">{formData.name}</span>! I've received your request.
                    </p>
                    <p className="text-slate-400 max-w-sm mx-auto text-xs">
                      I will review your project details and get back to you within 24 hours with some initial implementation ideas.
                    </p>

                    <div className="pt-6 border-t border-slate-800/60 max-w-md mx-auto">
                      <p className="text-xs text-slate-500 mb-4">Want to connect immediately?</p>
                      <a
                        href="https://wa.me/918735099370?text=Hi%20Dhruv%2c%20I%20just%20submitted%20a%20project%20inquiry%20on%20your%20portfolio.%20Let's%20connect!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 glass-card-strong px-6 py-3 rounded-lg text-sm font-semibold text-primary-300 hover:glow-orange transition-all"
                      >
                        <MessageSquare className="w-4 h-4 text-primary-400" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>

                    <button
                      onClick={() => {
                        setFormData({
                          name: "",
                          email: "",
                          service: "Mobile App (React Native)",
                          customService: "",
                          budget: "$2,500 - $5,000",
                          customBudget: "",
                          details: ""
                        });
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
