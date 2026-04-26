"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "IT Intern",
    company: "Diskominfo Gunungkidul",
    year: "2025",
    type: "Internship",
    points: [
      "Assisted in IT operations and digital infrastructure management at local government.",
      "Supported internal teams with network monitoring and technical troubleshooting.",
      "Developed a complaint management system for network issues used within Kominfo.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="skills" className="section-shell py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="font-heading text-3xl font-bold text-white mb-2">Experience</h2>
        <div
          className="w-16 h-1 rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
        />
      </div>

      <div className="relative border-l-2 border-violet-500/30 pl-8 space-y-10 ml-4">
        {experiences.map((exp, i) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-10% 0px" });
          return (
            <motion.div
              key={i}
              ref={ref}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i }}
              className="relative"
            >
              <div
                className="absolute -left-[42px] top-2 w-4 h-4 rounded-full border-2 border-violet-500"
                style={{ background: "var(--background)" }}
              />
              <div
                className="rounded-2xl p-6 border border-white/10 hover:border-violet-400/30 transition-all"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}
              >
                <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-white font-semibold text-lg">{exp.role}</h3>
                    <p className="text-violet-400 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50">
                    {exp.year} · {exp.type}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((p, j) => (
                    <li key={j} className="text-white/60 text-sm flex gap-2">
                      <span className="text-violet-400 mt-0.5 shrink-0">▹</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
