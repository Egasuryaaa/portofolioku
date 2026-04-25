"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-8">
      <div className="glass-nav mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="font-heading bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-200 bg-clip-text text-xl font-extrabold tracking-tight text-transparent"
        >
          Ega.dev
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`text-sm transition-colors ${
                activeId === item.id ? "active-nav text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="rounded-xl border border-white/20 p-2 text-slate-100 md:hidden"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen ? (
        <div className="glass-nav mx-auto mt-2 flex max-w-6xl flex-col rounded-2xl px-5 py-4 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`py-2 text-left text-sm transition-colors ${
                activeId === item.id ? "text-cyan-200" : "text-slate-200 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}
