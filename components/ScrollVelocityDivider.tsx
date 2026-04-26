"use client";

import ScrollVelocity from "./ScrollVelocity";

const TEXT = "Laravel ✦ Node.js ✦ Flutter ✦ REST API ✦ SQL ✦ Git ✦ Figma ✦ React ✦";

export default function ScrollVelocityDivider() {
  return (
    <div className="section-shell border-y border-white/10 py-6 my-8 overflow-hidden">
      <ScrollVelocity
        texts={[TEXT, TEXT]}
        velocity={80}
        className="text-white/40 text-xl font-semibold tracking-wide"
      />
    </div>
  );
}
