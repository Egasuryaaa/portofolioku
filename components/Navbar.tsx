"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setActive(href.replace("#", ""));
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-3 glass-nav transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <button
        onClick={() => go("#home")}
        className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Ega.dev
      </button>

      <ul className="hidden md:flex items-center gap-6">
        {links.map((l) => {
          const isActive = active === l.href.replace("#", "");
          return (
            <li key={l.href}>
              <button
                onClick={() => go(l.href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-violet-400 active-nav" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            </li>
          );
        })}
      </ul>

      <button className="md:hidden text-white/70 hover:text-white" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full inset-x-0 flex flex-col items-center gap-4 py-5 glass-nav"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-sm font-medium text-white/70 hover:text-violet-400 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
