import type { ReactNode } from "react";

type InfiniteMarqueeProps = {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
};

export default function InfiniteMarquee({
  children,
  speed = 40,
  pauseOnHover = false,
  className,
}: InfiniteMarqueeProps) {
  const duration = Math.max(14, 140 / speed);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className={`logo-track flex w-max items-center gap-8 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex items-center gap-8">{children}</div>
        <div className="flex items-center gap-8">{children}</div>
      </div>
    </div>
  );
}
