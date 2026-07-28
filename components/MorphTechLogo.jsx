"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "./GradientText";
import "./MorphTechLogo.css";

export default function MorphTechLogo({ size = "md", className = "", onClick = undefined }) {
  const [isLogo, setIsLogo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isSmall = size === "sm";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic timing: 4 detik saat menjadi tulisan (text), 2 detik saat menjadi ikon (logo)
  useEffect(() => {
    if (isHovered) return; // Jeda otomatis saat di-hover

    const delay = isLogo ? 2000 : 4000; // 2000ms untuk icon, 4000ms untuk tulisan
    const timer = setTimeout(() => {
      setIsLogo((prev) => !prev);
    }, delay);

    return () => clearTimeout(timer);
  }, [isLogo, isHovered]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`morph-logo-container group relative flex items-center justify-center select-none cursor-pointer overflow-visible ${
        isSmall ? "w-[125px] h-8" : "w-[155px] md:w-[170px] h-10 md:h-11"
      } ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* ── Content Switcher (Text <-> Logo) dengan animasi Ease In Out yang sangat halus ── */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        <AnimatePresence mode="popLayout">
          {!isLogo ? (
            /* STATE 1: BRAND TEXT (Surya.Tech - Tampil 4 Detik) */
            <motion.div
              key="text-state"
              initial={{ opacity: 0, scale: 0.5, filter: isMobile ? "blur(0px)" : "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.4, filter: isMobile ? "blur(0px)" : "blur(12px)" }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="flex items-center justify-center w-full h-full"
            >
              <GradientText
                colors={["#a78bfa", "#22d3ee", "#a78bfa", "#22d3ee", "#a78bfa"]}
                animationSpeed={5}
                showBorder={false}
                className={`font-extrabold tracking-tight whitespace-nowrap transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(167,139,250,0.85)] ${
                  isSmall ? "text-base md:text-lg" : "text-xl md:text-2xl"
                }`}
              >
                Surya.Tech
              </GradientText>
            </motion.div>
          ) : (
            /* STATE 2: TECHNOLOGY ICON (Bulat Sempurna - Tampil 2 Detik) */
            <motion.div
              key="logo-state"
              initial={{ opacity: 0, scale: 2.0, filter: isMobile ? "blur(0px)" : "blur(12px)", rotate: -180 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: 0 }}
              exit={{ opacity: 0, scale: 1.8, filter: isMobile ? "blur(0px)" : "blur(10px)", rotate: 180 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {/* Container BULAT (round circle 1:1 ratio) dengan gradasi ungu ke cyan */}
              <div
                className={`relative flex items-center justify-center rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#8b5cf6] to-[#06b6d4] shadow-[0_0_16px_rgba(124,58,237,0.7)] group-hover:shadow-[0_0_24px_rgba(6,182,212,0.9)] transition-all duration-500 ${
                  isSmall ? "w-8 h-8" : "w-10 h-10 md:w-11 md:h-11"
                }`}
              >
                {/* Technology Icon Asset */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/technology.png"
                  alt="Surya Tech Icon"
                  className={`object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] group-hover:scale-115 group-hover:rotate-180 transition-all duration-700 ${
                    isSmall ? "w-5 h-5" : "w-6 h-6 md:w-7 md:h-7"
                  }`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
