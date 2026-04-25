import ScrollReveal from "@/components/ScrollReveal";

const skillGroups = [
  {
    title: "Backend",
    items: ["Laravel", "Node.js", "SQL"],
  },
  {
    title: "Mobile & Frontend",
    items: ["Flutter", "Figma"],
  },
  {
    title: "Tools",
    items: ["Git", "REST API", "Mind Mapping"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-28 py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-black/20 p-7 backdrop-blur md:grid-cols-2 md:p-10">
          <ScrollReveal direction="up">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">About</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">
              Building Scalable Systems with Product Thinking
            </h2>
            <p className="mt-5 leading-relaxed text-slate-200">
              I&apos;m currently in Semester 6 of D3 Informatics Engineering (graduating 2026). I
              love building clean, scalable backend systems and exploring the full spectrum of
              development from APIs to mobile apps.
            </p>
          </ScrollReveal>

          <div id="skills" className="scroll-mt-28">
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-sm uppercase tracking-[0.2em] text-violet-200">Skills</p>
            </ScrollReveal>

            <div className="mt-4 space-y-5">
              {skillGroups.map((group, groupIndex) => (
                <ScrollReveal key={group.title} direction="up" delay={0.15 + groupIndex * 0.1}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item, itemIndex) => (
                      <span
                        key={item}
                        className="inline-flex rounded-full border border-violet-300/35 bg-violet-500/10 px-4 py-2 text-sm text-violet-100"
                        style={{ transitionDelay: `${itemIndex * 80}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
