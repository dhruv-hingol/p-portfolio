import { ArrowUp } from "lucide-react";
import portfolioData from "../data/portfolioData.json";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-100">
            <img
              src="/assets/profile.jpg"
              alt="Dhruv Hingol"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Dhruv Hingol</p>
            <p className="text-[11px] text-slate-500">
              Software Developer • React 19 & Next.js
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          {portfolioData.navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-blue-600 shadow-2xs transition-all duration-200 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
