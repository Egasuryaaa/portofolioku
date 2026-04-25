import InfiniteMarquee from "@/components/InfiniteMarquee";

const logos = [
  {
    name: "Laravel",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  {
    name: "Node.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Flutter",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "MySQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Git",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Figma",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Tailwind",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
];

export default function LogoLoop() {
  return (
    <section className="section-shell pb-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="rounded-2xl border border-white/10 bg-black/15 py-5 backdrop-blur-sm">
          <InfiniteMarquee speed={34} pauseOnHover={false}>
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex min-w-[140px] items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <img src={logo.src} alt={logo.name} className="h-6 w-6" loading="lazy" />
                <span className="text-sm font-medium text-slate-100">{logo.name}</span>
              </div>
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
}
