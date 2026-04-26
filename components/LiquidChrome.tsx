"use client";

import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("./LiquidEther"), { ssr: false });

type LiquidChromeProps = {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  interactive?: boolean;
};

const toHex = (color: [number, number, number]) => {
  const [r, g, b] = color.map((value) => Math.max(0, Math.min(255, Math.round(value * 255))));
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
};

export default function LiquidChrome({
  baseColor = [0.04, 0.0, 0.1],
  speed = 0.25,
  amplitude = 0.35,
  interactive = true,
}: LiquidChromeProps) {
  const accent = toHex(baseColor);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      data-interactive={interactive ? "true" : "false"}
    >
      <LiquidEther
        colors={[accent, "#FF9FFC", "#B497CF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={Math.max(0.2, speed)}
        autoIntensity={Math.max(1.2, 2.2 * amplitude)}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ width: "100%", height: "100%", position: "relative" }}
      />
    </div>
  );
}
