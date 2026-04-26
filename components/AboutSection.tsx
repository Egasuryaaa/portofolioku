"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills: Record<string, string[]> = {
  Backend: ["Laravel", "Node.js", "SQL", "REST API"],
  "Mobile & Frontend": ["Flutter", "Figma", "React"],
  Tools: ["Git", "Mind Mapping", "Postman"],
};

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section-shell py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <FadeUp>
        <h2 className="font-heading text-3xl font-bold text-white mb-2">About Me</h2>
        <div
          className="w-16 h-1 rounded-full mb-10"
          style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
        />
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <FadeUp delay={0.1}>
          <p className="text-white/60 leading-relaxed mb-4">
            I&apos;m currently in Semester 6 of D3 Informatics Engineering (graduating 2026). I love
            building clean, scalable backend systems and exploring the full spectrum of development -
            from APIs to mobile apps.
          </p>
          <p className="text-white/60 leading-relaxed">
            I thrive in collaborative environments and enjoy solving real-world problems with clean,
            maintainable code. Always eager to learn new technologies and take on challenging projects.
          </p>
        </FadeUp>

        <div className="space-y-6" id="skills">
          {Object.entries(skills).map(([cat, items], ci) => (
            <FadeUp key={cat} delay={0.1 * (ci + 1)}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white/80 border border-white/10 hover:border-violet-400/60 hover:text-white transition-all cursor-default"
                    style={{ background: "rgba(124,58,237,0.1)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
