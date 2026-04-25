import { GitBranch, Mail, MapPin, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const contacts = [
  {
    label: "Email",
    value: "egasurya04@gmail.com",
    href: "mailto:egasurya04@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Egasuryaaa",
    href: "https://github.com/Egasuryaaa",
    icon: GitBranch,
  },
  {
    label: "Phone",
    value: "+62 822-5710-8680",
    href: "tel:+6282257108680",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Mojokerto, East Java",
    href: "https://maps.google.com/?q=Mojokerto+East+Java",
    icon: MapPin,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell scroll-mt-28 py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ScrollReveal direction="up">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Contact</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">Let&apos;s Connect</h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="mt-8 rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "GitHub" || item.label === "Location" ? "_blank" : undefined}
                    rel={item.label === "GitHub" || item.label === "Location" ? "noreferrer" : undefined}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/50 hover:bg-white/10"
                  >
                    <Icon className="mt-0.5 h-5 w-5 text-cyan-200" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
                      <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
