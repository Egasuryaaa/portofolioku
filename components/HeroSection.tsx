import Lanyard from "@/components/Lanyard";
import RotatingText from "@/components/RotatingText";
import ScrollReveal from "@/components/ScrollReveal";

const rotatingRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "Laravel Enthusiast",
  "Node.js Developer",
];

export default function HeroSection() {
  return (
    <section id="home" className="section-shell scroll-mt-28 pt-28">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-12 px-4 py-10 md:grid-cols-2 md:px-8">
        <ScrollReveal direction="up">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Hi, I&apos;m</p>
          <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Ega Surya Saputra
          </h1>

          <div className="mt-4 text-xl font-semibold text-violet-300 sm:text-2xl">
            <RotatingText
              texts={rotatingRoles}
              rotationInterval={2500}
              mainClassName="font-heading bg-gradient-to-r from-violet-300 via-cyan-200 to-white bg-clip-text text-transparent"
            />
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Motivated D3 Informatics Engineering student with hands-on experience building RESTful
            APIs, web applications, and mobile apps using Laravel, Node.js, and Flutter. Based in
            Mojokerto, East Java.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/cv-egasurya-saputra.pdf"
              className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02]"
              download
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-cyan-300 hover:text-white"
            >
              Contact Me
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15} className="flex justify-center md:justify-end">
          {/* Replace with your real Discord User ID after enabling Developer Mode in Discord. */}
          <Lanyard id="YOUR_DISCORD_USER_ID_HERE" />
        </ScrollReveal>
      </div>
    </section>
  );
}
