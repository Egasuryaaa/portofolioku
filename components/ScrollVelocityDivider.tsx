import ScrollVelocity from "@/components/ScrollVelocity";

const velocityText = "Laravel ✦ Node.js ✦ Flutter ✦ REST API ✦ SQL ✦ Git ✦ Figma ✦ React ✦";

export default function ScrollVelocityDivider() {
  return (
    <section className="section-shell pb-5">
      <div className="mx-auto max-w-6xl px-0 md:px-8">
        <ScrollVelocity
          text={velocityText}
          baseSpeed={85}
          className="py-2 font-heading text-2xl font-semibold tracking-wide text-white/70"
        />
        <ScrollVelocity
          text={velocityText}
          baseSpeed={80}
          reverse
          className="py-2 font-heading text-xl font-semibold tracking-wide text-cyan-200/60"
        />
      </div>
    </section>
  );
}
