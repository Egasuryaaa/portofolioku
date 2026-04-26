"use client";

import { useEffect, useState } from "react";

type ScrollVelocityProps = {
  text?: string;
  texts?: string[];
  baseSpeed?: number;
  velocity?: number;
  reverse?: boolean;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function ScrollVelocity({
  text,
  texts,
  baseSpeed = 70,
  velocity,
  reverse = false,
  className,
}: ScrollVelocityProps) {
  const speedBase = velocity ?? baseSpeed;
  const sourceText = texts && texts.length > 0 ? texts.join(" ") : (text ?? "");

  const [duration, setDuration] = useState(Math.max(8, 160 / speedBase));

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(16, now - lastT);
      const velocity = dy / dt;

      const dynamicSpeed = clamp(speedBase + velocity * 220, 40, 220);
      setDuration(Math.max(6, 180 / dynamicSpeed));

      lastY = window.scrollY;
      lastT = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speedBase]);

  const repeated = new Array(6).fill(sourceText);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`velocity-track flex w-max whitespace-nowrap ${className ?? ""}`}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="px-4">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
