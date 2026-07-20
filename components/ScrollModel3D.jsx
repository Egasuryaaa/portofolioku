"use client";

import { useRef, useEffect, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// ─── Smooth easing helper ─────────────────────────────────────────────────────
// Ease-in-out cubic for buttery smooth transitions
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Smoothly interpolate a value toward a target each frame (damping)
function damp(current, target, smoothing, dt) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-smoothing * dt));
}

// ─── Inner 3D Scene (runs inside Canvas) ──────────────────────────────────────

function AnimatedModel({ url, scrollProgress, dragRotation }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  // Smoothed values for damped interpolation
  const smoothed = useRef({ x: -2.5, y: 1.5, z: 0, s: 1.3, ry: 0, opacity: 1 });

  // Play the first embedded animation if it exists
  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    if (firstAction) {
      firstAction.reset().fadeIn(0.5).play();
    }
    return () => {
      const a = Object.values(actions)[0];
      if (a) a.fadeOut(0.5);
    };
  }, [actions]);

  const materialRefs = useRef([]);

  // Gather all mesh materials once & enable transparency
  useEffect(() => {
    const mats = [];
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = true;
        mats.push(child.material);
      }
    });
    materialRefs.current = mats;
  }, [scene]);

  // ── Animation phases ──────────────────────────────────────────────────────
  //
  // Phase 1  (0.00 → 0.20)  Hero:    left-top, visible, subtle idle
  // Phase 2  (0.20 → 0.35)  Exit:    move UP + scale down + fade out
  // Phase 3  (0.35 → 0.60)  Hidden:  invisible, rotating in void
  // Phase 4  (0.60 → 0.80)  Return:  fade in + move to RIGHT-BOTTOM
  // Phase 5  (0.80 → 1.00)  Contact: settle at right of contact cards
  //
  // Start position : X=-2.5  Y=1.5   (top-left)
  // End position   : X=2.5   Y=-1.2  (right of contact cards)

  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.1); // clamp for tab-switch spikes

    const t = scrollProgress.get(); // 0 → 1
    const smoothing = 14; // damping factor (higher = snappier)

    // Optional: auto-rotate slowly when in contact section
    if (t > 0.85) {
      dragRotation.current += dt * 0.5; // slow spin
    }

    // ── Target Y ──
    let targetY;
    if (t < 0.12) {
      targetY = 1.5;                                                          // idle top-left
    } else if (t < 0.25) {
      const p = easeInOutCubic((t - 0.12) / 0.13);
      targetY = THREE.MathUtils.lerp(1.5, 4.5, p);                           // fly up out
    } else if (t < 0.50) {
      targetY = THREE.MathUtils.lerp(4.5, 3.0, (t - 0.25) / 0.25);          // drift high
    } else if (t < 0.72) {
      const p = easeInOutCubic((t - 0.50) / 0.22);
      targetY = THREE.MathUtils.lerp(3.0, -1.5, p);                          // descend to contact
    } else {
      targetY = -1.5;                                                         // settle in right column
    }

    // ── Target X ──
    let targetX;
    if (t < 0.12) {
      targetX = -2.5;                                                         // left side (hero)
    } else if (t < 0.25) {
      const p = easeInOutCubic((t - 0.12) / 0.13);
      targetX = THREE.MathUtils.lerp(-2.5, -0.5, p);                         // drift center
    } else if (t < 0.50) {
      targetX = THREE.MathUtils.lerp(-0.5, 1.5, (t - 0.25) / 0.25);         // cross to right
    } else if (t < 0.72) {
      const p = easeInOutCubic((t - 0.50) / 0.22);
      targetX = THREE.MathUtils.lerp(1.5, 3.5, p);                           // land in right column
    } else {
      targetX = 3.5;                                                          // right column of contact
    }

    // ── Target Scale (bigger overall) ──
    let targetS;
    if (t < 0.12) {
      targetS = 1.8;                                                          // hero size
    } else if (t < 0.25) {
      const p = easeInOutCubic((t - 0.12) / 0.13);
      targetS = THREE.MathUtils.lerp(1.8, 0.5, p);                           // shrink
    } else if (t < 0.50) {
      targetS = THREE.MathUtils.lerp(0.5, 1.3, (t - 0.25) / 0.25);          // grow mid
    } else if (t < 0.72) {
      const p = easeInOutCubic((t - 0.50) / 0.22);
      targetS = THREE.MathUtils.lerp(1.3, 2.0, p);                           // settle contact
    } else {
      targetS = 2.0;                                                          // contact size
    }

    // ── Target Rotation Y (elegant spin) ──
    let targetRY;
    if (t < 0.12) {
      targetRY = 0;
    } else if (t < 0.50) {
      const p = (t - 0.12) / 0.38;
      targetRY = p * Math.PI * 4;                                             // 2 full spins
    } else if (t < 0.72) {
      const p = easeInOutCubic((t - 0.50) / 0.22);
      targetRY = THREE.MathUtils.lerp(Math.PI * 4, Math.PI * 4.5, p);        // half extra spin settling
    } else {
      targetRY = Math.PI * 4.5;
    }
    
    // Add the interactive drag rotation (only kicks in heavily at contact section)
    targetRY += dragRotation.current;

    // ── Target Opacity ──
    let targetOpacity;
    if (t < 0.10) {
      targetOpacity = 1;
    } else if (t < 0.22) {
      targetOpacity = THREE.MathUtils.lerp(1, 0, (t - 0.10) / 0.12);
    } else if (t < 0.48) {
      targetOpacity = 0;
    } else if (t < 0.65) {
      targetOpacity = THREE.MathUtils.lerp(0, 1, (t - 0.48) / 0.17);
    } else {
      targetOpacity = 1;
    }

    // ── Apply damped smoothing (snap when settled at contact) ──
    const s = smoothed.current;
    if (t > 0.72) {
      // Snap directly — no more damping lag at contact section
      s.x       = targetX;
      s.y       = targetY;
      s.s       = targetS;
      s.ry      = targetRY;
      s.opacity = targetOpacity;
    } else {
      s.x       = damp(s.x,       targetX,       smoothing, dt);
      s.y       = damp(s.y,       targetY,       smoothing, dt);
      s.s       = damp(s.s,       targetS,       smoothing, dt);
      s.ry      = damp(s.ry,      targetRY,      smoothing, dt);
      s.opacity = damp(s.opacity, targetOpacity, smoothing * 1.5, dt);
    }

    // Apply transforms
    group.current.position.set(s.x, s.y, 0);
    group.current.scale.setScalar(s.s);
    group.current.rotation.y = s.ry;

    // Apply opacity to all materials
    materialRefs.current.forEach((mat) => {
      mat.opacity = s.opacity;
    });
  });

  return <primitive ref={group} object={scene} />;
}

// (OrbitControls removed in favor of local rotation to avoid camera centering issues)

// ─── Shared scroll ref (plain JS — works across React trees) ─────────────────
// R3F Canvas creates a separate React tree, so we need a plain mutable object
// that both the DOM component and the Canvas components can read from.

const scrollRef = { current: 0 };

function useWindowScroll() {
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = scrollHeight > 0
        ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
        : 0;
    }
    onScroll(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// A tiny wrapper so AnimatedModel can call scrollProgress.get()
const scrollProgress = { get: () => scrollRef.current };

// ─── Outer wrapper (provides Canvas + scroll binding) ─────────────────────────

export default function ScrollModel3D({ modelUrl = "/assets/asset3drobot.glb" }) {
  useWindowScroll(); // start listening to scroll

  const containerRef = useRef();
  const [isAtContact, setIsAtContact] = useState(false);
  const isAtContactRef = useRef(false);

  // Drag-to-rotate state
  const dragRotation = useRef(0);
  const isDragging = useRef(false);
  const previousX = useRef(0);

  // Handle dragging
  useEffect(() => {
    function onPointerDown(e) {
      if (!isAtContactRef.current) return;
      isDragging.current = true;
      previousX.current = e.clientX;
    }
    function onPointerMove(e) {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousX.current;
      dragRotation.current += deltaX * 0.01; // sensitivity
      previousX.current = e.clientX;
    }
    function onPointerUp() {
      isDragging.current = false;
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // Toggle pointer-events based on scroll position
  useEffect(() => {
    function onScroll() {
      const shouldEnable = scrollRef.current > 0.85;
      if (shouldEnable !== isAtContactRef.current) {
        isAtContactRef.current = shouldEnable;
        setIsAtContact(shouldEnable);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: isAtContact ? "auto" : "none",
        zIndex: 10,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} castShadow />
        <directionalLight position={[-4, -2, 4]} intensity={0.5} />
        <directionalLight position={[0, 3, -3]} intensity={0.3} />

        <Suspense fallback={null}>
          <AnimatedModel url={modelUrl} scrollProgress={scrollProgress} dragRotation={dragRotation} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Pre-load GLB so there's no flash
useGLTF.preload("/assets/asset3drobot.glb");
