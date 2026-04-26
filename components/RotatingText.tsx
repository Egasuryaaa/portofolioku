"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTextProps = {
  texts: string[];
  rotationInterval?: number;
  mainClassName?: string;
  staggerFrom?: "first" | "last" | "center" | number;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: unknown;
};

export default function RotatingText({
  texts,
  rotationInterval = 2500,
  mainClassName,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => window.clearInterval(timer);
  }, [texts, rotationInterval]);

  return (
    <span className="relative inline-flex min-h-10 min-w-[220px] overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className={mainClassName}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
