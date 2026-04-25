import ScrollReveal from "@/components/ScrollReveal";

const experiences = [
  {
    role: "IT Intern",
    organization: "Diskominfo Gunungkidul",
    year: "2025",
    description:
      "Assisted in IT operations and digital infrastructure management. Supported network monitoring and technical troubleshooting. Built a complaint management system for network issues.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="section-shell py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ScrollReveal direction="up">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Work Experience</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">Timeline</h2>
        </ScrollReveal>

        <div className="relative mt-10 border-l border-white/15 pl-6 md:pl-10">
          {experiences.map((item, index) => (
            <ScrollReveal
              key={`${item.role}-${item.year}`}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.08}
              className="relative mb-8"
            >
              <span className="absolute -left-[33px] top-2 h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 md:-left-[45px]" />
              <article className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{item.year}</p>
                <h3 className="font-heading mt-2 text-xl font-semibold text-white">{item.role}</h3>
                <p className="text-sm text-violet-200">{item.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{item.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
