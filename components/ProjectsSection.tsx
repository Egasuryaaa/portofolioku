import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    title: "Network Complaint Management System",
    organization: "Kominfo Gunungkidul",
    description:
      "Web-based app for submitting and tracking network complaints within the Kominfo office. Staff can report issues and monitor resolution in real time.",
    tags: ["Laravel", "SQL", "REST API"],
  },
  {
    title: "Daily Worker Finder App",
    organization: "Gunungkidul Regency",
    description:
      "Platform connecting residents with local tradespeople (tukang harian). Features worker listings, category search, and direct contact integration.",
    tags: ["Flutter", "Node.js", "REST API"],
  },
  {
    title: "IwakRejosari",
    organization: "Aquaculture Marketplace App",
    description:
      "Mobile-friendly app for fish pond owners to market products and connect with buyers. Features appointment booking, product listings, and real-time scheduling.",
    tags: ["Flutter", "Laravel", "REST API"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell scroll-mt-28 py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ScrollReveal direction="up">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Projects</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">
            Selected Work
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              direction="up"
              delay={index * 0.15}
              className="group h-full"
            >
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-2xl hover:shadow-cyan-900/30">
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200">{project.organization}</p>
                <h3 className="font-heading mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
