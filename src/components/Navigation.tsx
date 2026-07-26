import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import MagneticButton from "./MagneticButton";

interface NavigationProps {
  onLogoClick?: () => void;
}

export default function Navigation({ onLogoClick }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const sections = portfolioData.navigationLinks.map((link) =>
        link.href.replace("#", ""),
      );
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar at Top */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-blue-600 transition-all duration-150 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Brand Logo with 5-Click Easter Egg Trigger */}
        <a
          href="#hero"
          onClick={(e) => {
            scrollToSection(e, "#hero");
            if (onLogoClick) onLogoClick();
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200/80 shadow-xs group-hover:border-blue-500 transition-colors flex-shrink-0 bg-slate-100 aspect-square">
            <img
              src="/assets/profile.jpg"
              alt="Dhruv Hingol"
              className="w-full h-full object-cover"
              width="36"
              height="36"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
              {portfolioData.personalInfo.name}
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              Software Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
          {portfolioData.navigationLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <MagneticButton
            href={portfolioData.contactSection.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            onClick={(e) => scrollToSection(e as unknown as React.MouseEvent<HTMLAnchorElement>, "#contact")}
            className="text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span>Contact</span>
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {portfolioData.navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600 py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={portfolioData.contactSection.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold text-slate-700 bg-slate-100 py-2.5 rounded-lg"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="flex-1 text-center text-xs font-semibold text-white bg-blue-600 py-2.5 rounded-lg shadow-xs"
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
