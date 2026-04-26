"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Network Complaint Management System",
    subtitle: "Kominfo Gunungkidul",
    desc: "Web-based app for submitting and tracking network complaints within the Kominfo office. Staff can report issues and monitor resolution in real time.",
    tags: ["Laravel", "SQL", "REST API"],
    icon: "🖧",
  },
  {
    title: "Daily Worker Finder App",
    subtitle: "Gunungkidul Regency",
    desc: "Platform connecting residents with local tradespeople (tukang harian). Features: worker listings, category search, and direct contact integration.",
    tags: ["Flutter", "Node.js", "REST API"],
    icon: "🔧",
  },
  {
    title: "IwakRejosari",
    subtitle: "Aquaculture Marketplace App",
    desc: "Mobile-friendly app for fish pond owners to market products and connect with buyers. Features: appointment booking, product listings, real-time scheduling.",
    tags: ["Flutter", "Laravel", "REST API"],
    icon: "🐟",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="font-heading text-3xl font-bold text-white mb-2">Projects</h2>
        <div
          className="w-16 h-1 rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-10% 0px" });
          return (
            <motion.div
              key={i}
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i }}
              className="group rounded-2xl p-6 border border-white/10 hover:border-violet-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-heading text-white font-semibold mb-1">{p.title}</h3>
              <p className="text-violet-400 text-sm mb-3">{p.subtitle}</p>
              <p className="text-white/55 text-sm leading-relaxed flex-grow">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md text-cyan-400 border border-cyan-400/20"
                    style={{ background: "rgba(6,182,212,0.08)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
