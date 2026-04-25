"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type ScrollDirection = "up" | "down" | "left" | "right";

type ScrollRevealProps = {
  children: React.ReactNode;
  direction?: ScrollDirection;
  delay?: number;
  className?: string;
};

const getHiddenPosition = (direction: ScrollDirection) => {
  return {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  };
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const hiddenPos = getHiddenPosition(direction);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          ...hiddenPos,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
