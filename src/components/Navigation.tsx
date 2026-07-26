import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import MagneticButton from "./MagneticButton";

interface NavigationProps {
  onLogoClick?: () => void;
}

export default function Navigation({ onLogoClick }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Primary links visible directly in the main header pill
  const primaryLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Games", href: "#game-challenge", id: "game-challenge" },
  ];

  // Secondary links placed inside the "More" dropdown
  const secondaryLinks = [
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Impact", href: "#achievements", id: "achievements" },
    { name: "Education", href: "#education", id: "education" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const allNavLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Games", href: "#game-challenge", id: "game-challenge" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Impact", href: "#achievements", id: "achievements" },
    { name: "Education", href: "#education", id: "education" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const isDropdownActive = secondaryLinks.some(
    (link) => activeSection === link.id
  );

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const scrollPosition = window.scrollY + 220;

      for (const link of allNavLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allNavLinks]);

  // Robust smooth scroll with fixed 80px header offset calculation
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    // Calculate static document offset before closing mobile drawer
    let targetScroll = 0;
    if (element) {
      const headerOffset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      targetScroll = Math.max(0, elementRect - bodyRect - headerOffset);
    }

    setMobileMenuOpen(false);
    setDropdownOpen(false);

    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }, 50);
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
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 shadow-inner relative">
          {primaryLinks.map((link) => {
            const isActive = activeSection === link.id;
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

          {/* More Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
                isDropdownActive || dropdownOpen
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {(isDropdownActive || dropdownOpen) && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/50"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>

            {/* Dropdown Glass Panel */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-2 shadow-xl z-50 flex flex-col gap-1"
                >
                  {secondaryLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors duration-150 flex items-center justify-between ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            onClick={(e) =>
              scrollToSection(
                e as unknown as React.MouseEvent<HTMLAnchorElement>,
                "#contact"
              )
            }
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

      {/* Mobile Sidebar / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Navigation Menu
              </span>

              {allNavLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "text-slate-700 hover:bg-slate-100 border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.id === "game-challenge" && (
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      )}
                      {link.name}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </a>
                );
              })}

              {/* CTAs inside Mobile Sidebar */}
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={portfolioData.contactSection.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl border border-slate-200"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="flex-1 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 py-3 rounded-xl shadow-xs"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
