type LiquidChromeProps = {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  interactive?: boolean;
};

const toRgb = (color: [number, number, number]) => {
  const [r, g, b] = color.map((value) => Math.max(0, Math.min(255, Math.round(value * 255))));
  return `${r}, ${g}, ${b}`;
};

export default function LiquidChrome({
  baseColor = [0.04, 0.0, 0.1],
  speed = 0.25,
  amplitude = 0.35,
  interactive = true,
}: LiquidChromeProps) {
  const rgb = toRgb(baseColor);
  const durationScale = Math.max(0.15, speed);
  const intensity = Math.max(0.15, amplitude);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{
        background: `radial-gradient(ellipse at 20% 50%, rgba(${rgb}, 0.55) 0%, #0d0221 45%, #000510 100%)`,
      }}
      data-interactive={interactive ? "true" : "false"}
    >
      <div
        className="absolute -left-12 top-8 h-80 w-80 rounded-full blur-[80px]"
        style={{
          background: `rgba(${rgb}, ${0.45 + intensity * 0.3})`,
          animation: `liquid-drift-a ${24 / durationScale}s ease-in-out infinite alternate`,
        }}
      />
      <div
        className="absolute right-0 top-28 h-72 w-72 rounded-full blur-[90px]"
        style={{
          background: `rgba(6, 182, 212, ${0.2 + intensity * 0.4})`,
          animation: `liquid-drift-b ${28 / durationScale}s ease-in-out infinite alternate`,
        }}
      />
      <div
        className="absolute bottom-6 left-1/3 h-96 w-96 rounded-full blur-[110px]"
        style={{
          background: `rgba(124, 58, 237, ${0.15 + intensity * 0.3})`,
          animation: `liquid-drift-c ${21 / durationScale}s ease-in-out infinite alternate`,
        }}
      />
    </div>
  );
}
