"use client";

import InfiniteMarquee from "./InfiniteMarquee";

const logos = [
  {
    name: "Laravel",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
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
    name: "PHP",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "VS Code",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
];

export default function LogoLoop() {
  return (
    <div className="section-shell relative py-6 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
      />

      <InfiniteMarquee speed={40} pauseOnHover={false} direction="left">
        {logos.map((logo) => (
          <div key={logo.name} className="flex flex-col items-center gap-2 mx-8 select-none">
            <img
              src={logo.src}
              alt={logo.name}
              className="w-10 h-10 object-contain opacity-60 hover:opacity-100 transition-opacity"
              draggable={false}
            />
            <span className="text-xs text-white/40">{logo.name}</span>
          </div>
        ))}
      </InfiniteMarquee>
    </div>
  );
}