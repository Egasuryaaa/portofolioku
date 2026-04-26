"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import RotatingText from "./RotatingText";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="section-shell min-h-screen flex items-center pt-20 px-6 md:px-16 max-w-6xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <Reveal delay={0.1}>
            <p className="text-white/50 text-lg mb-2">Hi, I&apos;m</p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Ega Surya
              <br />
              Saputra
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center gap-3 mb-6 text-xl font-semibold">
              <span className="text-white/40">I&apos;m a</span>
              <RotatingText
                texts={[
                  "Frontend Developer",
                  "Backend Developer",
                  "Mobile Developer",
                  "Laravel Enthusiast",
                  "Node.js Developer",
                ]}
                mainClassName="text-violet-400"
                staggerFrom="last"
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-white/60 leading-relaxed mb-8 max-w-lg">
              Motivated D3 Informatics Engineering student with hands-on experience building
              RESTful APIs, web applications, and mobile apps using Laravel, Node.js, and Flutter.
              Based in Mojokerto, East Java.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap gap-4">
              <a
                href="/cv.pdf"
                download
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                Download CV
              </a>
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-xl font-semibold text-white/80 border border-white/20 hover:border-violet-400 hover:text-white transition-all hover:scale-105"
                style={{
                  backdropFilter: "blur(8px)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                Contact Me
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center md:justify-end"
          style={{ height: "500px" }}
        >
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={20}
            transparent={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
