"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import LiquidBackground from "@/components/LiquidBackground";
import _RotatingText from "@/components/RotatingText";
const RotatingText = _RotatingText as any;
import _LogoLoop from "@/components/LogoLoop";
const LogoLoop = _LogoLoop as any;
import ScrollReveal from "@/components/ScrollReveal";
import GradualBlur from "@/components/GradualBlur";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import TextType from "@/components/TextType";

// SSR: false untuk component yang pakai WebGL / window
const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });
const ScrollModel3D = dynamic(() => import("@/components/ScrollModel3D"), { ssr: false });

// ─── data ────────────────────────────────────────────────────────────────────

const logos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",   alt: "Laravel"   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",  alt: "Node.js"   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",alt: "Flutter"   },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",    alt: "MySQL"     },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",        alt: "Git"       },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",    alt: "Figma"     },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",    alt: "React"     },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",        alt: "PHP"       },
];

const skills: Record<string, string[]> = {
  "Backend":             ["Laravel", "Node.js", "SQL", "REST API"],
  "Mobile & Frontend":   ["Flutter", "Figma", "React"],
  "Tools":               ["Git", "Mind Mapping", "Postman"],
};

const projects = [
  {
    icon: "🖧",
    title: "Network Complaint Management System",
    subtitle: "Kominfo Gunungkidul",
    desc: "Web-based app for submitting and tracking network complaints. Staff can report issues and monitor resolution in real time.",
    tags: ["Laravel", "SQL", "REST API"],
  },
  {
    icon: "🔧",
    title: "Daily Worker Finder App",
    subtitle: "Gunungkidul Regency",
    desc: "Platform connecting residents with local tradespeople. Features: worker listings, category search, direct contact.",
    tags: ["Flutter", "Node.js", "REST API"],
  },
  {
    icon: "🐟",
    title: "IwakRejosari",
    subtitle: "Aquaculture Marketplace App",
    desc: "Mobile app for fish pond owners to market products and connect with buyers. Booking, listings, and scheduling.",
    tags: ["Flutter", "Laravel", "REST API"],
  },
];

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative isolate min-h-screen overflow-x-clip text-slate-100"
      style={{ backgroundColor: "#04020b" }}
    >
      {/* ── BACKGROUND ── */}
      <LiquidBackground />                        {/* CSS orb fallback (always visible) */}
      <div className="fixed inset-0 -z-10">       {/* WebGL liquid — loads after hydration */}
        <LiquidEther
          colors={["#5227FF", "#7c3aed", "#06b6d4"]}
          style={{ width: "100%", height: "100%" }}
          autoDemo
          autoSpeed={0.4}
          autoIntensity={2.0}
          mouseForce={20}
          resolution={0.5}
        />
      </div>

      {/* ── 3D SCROLL MODEL ── */}
      <ScrollModel3D />

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-2 pt-3">
        <nav className="glass-nav w-full max-w-5xl rounded-full px-3 py-2 md:px-6">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto md:gap-6">
            <span
              className="shrink-0 text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
              onClick={() => document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ga.Tech
            </span>

            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })}
                className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs md:text-sm text-white/80 hover:border-violet-400/60 hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section id="hero" className="section-shell min-h-screen flex items-center pt-24 px-6 md:px-16 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">

            {/* left */}
            <div>
              <p className="text-white/50 text-lg mb-2">Hi, I&apos;m</p>

              <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Ega Surya<br />Saputra
              </h1>

              <div className="flex items-center gap-3 mb-6 text-xl md:text-2xl font-semibold">
                <span className="text-white/40">I&apos;m a</span>
                
                <RotatingText
                  texts={[
                    "Frontend Developer",
                    "Backend Developer",
                    "Mobile Developer",
                    "Laravel Enthusiast",
                    "Node.js Developer",
                  ]}
                  mainClassName="text-violet-400 overflow-hidden" /* Warna Ungu */
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </div>

              <TextType 
                as="p"
                className="text-white/60 leading-relaxed mb-8 max-w-lg min-h-[120px] md:min-h-[84px]"
                text="Motivated D3 Informatics Engineering student with hands-on experience building RESTful APIs, web applications, and mobile apps using Laravel, Node.js, and Flutter. Based in Mojokerto, East Java."
                typingSpeed={30}
                loop={false}
                showCursor={true}
              />

              <div className="flex flex-wrap gap-4">
                <a
                  href="/cv.pdf"
                  download
                  className="px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", boxShadow: "0 0 20px rgba(124,58,237,.4)" }}
                >
                  Download CV
                </a>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-xl font-semibold text-white/80 border border-white/20 hover:border-violet-400 hover:text-white hover:scale-105 transition-all"
                  style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,.05)" }}
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* right — Lanyard 3D card */}
            <div className="flex justify-center md:justify-end h-[350px] md:h-[480px]">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={20} transparent />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SCROLL VELOCITY DIVIDER  (pure CSS marquee)
        ══════════════════════════════════════════ */}
        <div className="section-shell border-y border-white/10 py-5 overflow-hidden my-8">
          <div className="velocity-track flex gap-12 w-max" style={{ animationDuration: "18s" }}>
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-white/30 text-lg font-semibold tracking-widest whitespace-nowrap">
                Laravel ✦ Node.js ✦ Flutter ✦ REST API ✦ SQL ✦ Git ✦ Figma ✦ React ✦&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            LOGO LOOP
        ══════════════════════════════════════════ */}
        <div className="section-shell py-6 relative overflow-hidden">
          {/* fade edges */}
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right,#04020b,transparent)" }} />
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left,#04020b,transparent)" }} />
          <LogoLoop
            logos={logos}
            speed={90}
            direction="left"
            logoHeight={36}
            gap={40}
            pauseOnHover
            fadeOut
            fadeOutColor="#04020b"
          />
        </div>

        {/* ══════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════ */}
        <section id="about" className="section-shell py-24 px-4 md:px-8 max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-2">About Me</h2>
          <div className="w-16 h-1 rounded-full mb-10" style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }} />

          <div className="max-w-2xl">
            {/* KUNCI: Jangan pakai scrollContainerRef di sini */}
            {/* Agar teks sesuai desain Anda, saya timpa styling default dari CSS bawaan dengan textClassName */}
            <ScrollReveal 
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={10}
              containerClassName="m-0"
              textClassName="text-white/60 text-xl md:text-2xl font-medium tracking-wide leading-relaxed"
              rotationEnd="bottom 40%"
              wordAnimationEnd="bottom 40%"
            >
              I&apos;m currently in Semester 6 of D3 Informatics Engineering (graduating 2026).
              I love building clean scalable backend systems and exploring the full spectrum of
              development from APIs to mobile apps.
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SKILLS
        ══════════════════════════════════════════ */}
        <section id="skills" className="section-shell py-24 px-4 md:px-8 max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-2">Skills</h2>
          <div className="w-16 h-1 rounded-full mb-10" style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }} />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-sm font-medium text-white/80 border border-white/10 hover:border-violet-400/60 hover:text-white transition-all cursor-default"
                      style={{ background: "rgba(124,58,237,.1)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            EXPERIENCE
        ══════════════════════════════════════════ */}
        <section id="experience" className="section-shell py-24 px-4 md:px-8 max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-2">Experience</h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }} />

          <div className="relative border-l-2 border-violet-500/30 pl-8 ml-4">
            <div
              className="absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 border-violet-500"
              style={{ background: "#04020b" }}
            />
            <div
              className="rounded-2xl p-6 border border-white/10 hover:border-violet-400/30 transition-all"
              style={{ background: "rgba(255,255,255,.03)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading text-white font-semibold text-lg">IT Intern</h3>
                  <p className="text-violet-400 text-sm">Diskominfo Gunungkidul</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50">2025 · Internship</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Assisted in IT operations and digital infrastructure management at local government.",
                  "Supported internal teams with network monitoring and technical troubleshooting.",
                  "Developed a complaint management system for network issues used within Kominfo.",
                ].map((pt, i) => (
                  <li key={i} className="text-white/60 text-sm flex gap-2">
                    <span className="text-violet-400 mt-0.5 shrink-0">▹</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════════ */}
        <section id="projects" className="section-shell py-24 px-4 md:px-8 max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-2">Projects</h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }} />

          <div className="w-full">
            <ScrollStack
              useWindowScroll={true}
              itemScale={0.05}
              itemStackDistance={40}
              stackPosition="20%"
              scaleEndPosition="10%"
              baseScale={0.85}
              rotationAmount={2}
              blurAmount={2}
              onStackComplete={() => {}}
            >
              {projects.map((p, i) => (
                <ScrollStackItem 
                  key={p.title} 
                  itemClassName="!p-0 flex flex-col md:flex-row !h-auto min-h-[450px] md:min-h-[400px] bg-[#0f0a19]/90 backdrop-blur-[12px] border border-white/10 rounded-[30px] md:rounded-[40px] overflow-hidden"
                >
                  {/* IMAGE PLACEHOLDER */}
                  <div className="w-full md:w-5/12 h-[220px] md:h-auto bg-white/5 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                    <span className="text-white/20 text-sm font-medium tracking-widest uppercase">Insert Image Here</span>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="p-6 md:p-10 flex-1 flex flex-col">
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6">{p.icon}</div>
                    <h3 className="font-heading text-white font-bold text-xl md:text-3xl mb-2">{p.title}</h3>
                    <p className="text-violet-400 text-xs md:text-sm mb-4 md:mb-5 font-semibold tracking-wider uppercase">{p.subtitle}</p>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed flex-grow">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 md:gap-3 mt-5 md:mt-8">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] md:text-xs px-3 py-1.5 rounded-lg text-cyan-300 border border-cyan-400/30 font-medium tracking-wide"
                          style={{ background: "rgba(6,182,212,.1)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            GALLERY  (placeholder — ganti src setelah ada foto)
        ══════════════════════════════════════════ */}
        <section id="gallery" className="section-shell py-24 px-4 md:px-8 max-w-5xl mx-auto relative">
          <GradualBlur position="bottom" height="6rem" zIndex={10} />

          <h2 className="font-heading text-3xl font-bold text-white mb-2">Gallery</h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }} />

          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {[
              { src: "https://picsum.photos/seed/ga1/600/800", caption: "Network Complaint System" },
              { src: "https://picsum.photos/seed/ga2/600/400", caption: "Daily Worker Finder"      },
              { src: "https://picsum.photos/seed/ga3/600/700", caption: "IwakRejosari App"         },
              { src: "https://picsum.photos/seed/ga4/600/500", caption: "Internship — Kominfo"     },
              { src: "https://picsum.photos/seed/ga5/600/600", caption: "UI/UX Design Work"        },
              { src: "https://picsum.photos/seed/ga6/600/450", caption: "Backend Development"      },
            ].map((item) => (
              <div key={item.src} className="gallery-item group relative overflow-hidden rounded-2xl break-inside-avoid cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: "linear-gradient(to top,rgba(4,2,11,.9),transparent)" }}
                >
                  <p className="text-white font-medium text-sm">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════ */}
        <section id="contact" className="section-shell py-24 px-4 md:px-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* ── LEFT COLUMN: Title + Contact Cards ── */}
            <div className="flex-1 min-w-0">
              <h2 className="font-heading text-3xl font-bold text-white mb-2">Contact</h2>
              <div className="w-16 h-1 rounded-full mb-12" style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }} />

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "Email",    value: "egasurya04@gmail.com",  href: "mailto:egasurya04@gmail.com",     icon: "✉️"  },
                  { label: "GitHub",   value: "github.com/Egasuryaaa", href: "https://github.com/Egasuryaaa",   icon: "🐙"  },
                  { label: "Phone",    value: "+62 822-5710-8680",      href: "https://wa.me/6282257108680?text=Halo%20Ega,%20saya%20tertarik%20dengan%20portfolio%20Anda!",     icon: "📞"  },
                  { label: "Location", value: "Mojokerto, East Java",   href: null,                              icon: "📍"  },
                ].map(({ label, value, href, icon }) => (
                  <a
                    key={label}
                    href={href ?? undefined}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`relative z-20 flex flex-col gap-2 sm:gap-3 p-4 sm:p-5 rounded-2xl border border-white/10 transition-all duration-300
                      ${href ? "hover:border-violet-400/50 hover:-translate-y-1 cursor-pointer" : "cursor-default"}`}
                    style={{ background: "rgba(255,255,255,.03)", backdropFilter: "blur(8px)" }}
                  >
                    <span className="text-xl sm:text-2xl">{icon}</span>
                    <div>
                      <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium break-all">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-white/30 text-xs mt-6 md:hidden">↓ Scroll ke bawah untuk interaksi robot 3D</p>
              
              {/* Spacer for robot landing zone on mobile */}
              <div className="h-[250px] md:hidden w-full relative flex items-center justify-center text-center">
                <p className="text-white/10 text-xs font-medium tracking-widest uppercase select-none mx-auto">
                  🤖 Drag to rotate
                </p>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Robot Landing Zone ── */}
            <div className="hidden md:flex w-[320px] lg:w-[380px] shrink-0 h-[350px] items-center justify-center relative">
              {/* Visual hint — subtle glow where robot lands */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(124,58,237,.15) 0%, transparent 70%)",
                }}
              />
              <p className="text-white/10 text-xs font-medium tracking-widest uppercase select-none">
                🤖 Drag to rotate
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-8 text-center border-t border-white/10">
        <p className="text-white/30 text-sm">
          Built in Indonesia by <span className="text-violet-400 font-medium">Ega Surya Saputra</span>
          {" "}· © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}