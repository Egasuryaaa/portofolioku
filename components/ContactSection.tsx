"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, GitBranch, Phone, MapPin } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "egasurya04@gmail.com",
    href: "mailto:egasurya04@gmail.com",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/Egasuryaaa",
    href: "https://github.com/Egasuryaaa",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 822-5710-8680",
    href: "tel:+6282257108680",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mojokerto, East Java",
    href: null,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="font-heading text-3xl font-bold text-white mb-2">Contact</h2>
        <div
          className="w-16 h-1 rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {contacts.map(({ icon: Icon, label, value, href }, i) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-10% 0px" });
          return (
            <motion.a
              key={label}
              ref={ref}
              href={href ?? undefined}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i }}
              className={`flex flex-col gap-3 p-5 rounded-2xl border border-white/10 transition-all duration-300 ${
                href ? "hover:border-violet-400/50 hover:-translate-y-1 cursor-pointer" : "cursor-default"
              }`}
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(124,58,237,0.2)" }}
              >
                <Icon size={18} className="text-violet-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white/80 text-sm font-medium break-all">{value}</p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
