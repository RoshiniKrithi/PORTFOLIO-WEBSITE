"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO, NAVIGATION_LINKS, SOCIAL_LINKS } from "@/data/constants";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = NAVIGATION_LINKS.map((link) => link.id);
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#08080a]/85 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-2xl"
            : "bg-transparent py-6 md:py-8 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            onMouseEnter={() => setCursor("link", "HOME")}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-2.5 font-mono text-xs md:text-sm tracking-[0.25em] font-semibold text-white uppercase"
          >
            <span className="w-2 h-2 bg-white/70 rounded-none transform rotate-45 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />
            <span className="group-hover:tracking-[0.3em] transition-all duration-300">
              {PERSONAL_INFO.shortName}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setCursor("link", link.label)}
                  onMouseLeave={resetCursor}
                  className={`relative font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 py-1 ${
                    isActive ? "text-white font-medium" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Status Indicator */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              onMouseEnter={() => setCursor("link", "TALK")}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 font-mono text-[10px] tracking-[0.2em] text-neutral-300 uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>AVAILABLE</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#08080a] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            {/* Background grid lines */}
            <div className="absolute inset-0 grid-lines-pattern opacity-30 pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              <span className="font-mono text-[10px] text-neutral-500 tracking-[0.3em] uppercase">
                INDEX / NAVIGATION
              </span>
              <nav className="flex flex-col gap-4">
                {NAVIGATION_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    className="flex items-center justify-between text-2xl font-editorial-heading uppercase text-white hover:text-neutral-300 border-b border-white/[0.06] pb-3"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Footer */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-neutral-500 tracking-wider">
                  STATUS
                </span>
                <span className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE FOR ROLES
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  GITHUB <ArrowUpRight size={12} />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  LINKEDIN <ArrowUpRight size={12} />
                </a>
                <a
                  href={SOCIAL_LINKS.email}
                  className="hover:text-white flex items-center gap-1"
                >
                  EMAIL <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
