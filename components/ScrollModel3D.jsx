import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, PresentationControls, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

function AnimatedModel({ url, scrollYProgress, isMobile }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  // Play the first embedded animation if it exists
  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    if (firstAction) {
      firstAction.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  // ─── Keyframe Mapping (0, 0.33, 0.66, 1) ─────────────────────────────────
  const xDesk = [-2.6, 4.0, 5.5, 2.8];
  const xMob  = [1.2, -1.0, 1.2, 0];
  const x = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], isMobile ? xMob : xDesk);

  const yDesk = [1.5, 0.5, 0, -1.5];
  const yMob  = [1.4, 2.0, 1.8, -2.0];
  const y = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], isMobile ? yMob : yDesk);

  const zDesk = [0, -1, 1, 0];
  const z = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], zDesk);

  const ry = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const rz = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, -0.1, -0.2, 0]);

  const sDesk = [1.5, 1.2, 0.8, 2.5];
  const sMob  = [1.5, 1.2, 0.9, 2.4];
  const scale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], isMobile ? sMob : sDesk);

  useFrame(() => {
    if (group.current) {
      group.current.position.set(x.get(), y.get(), z.get());
      group.current.rotation.set(0, ry.get(), rz.get());
      group.current.scale.setScalar(scale.get());
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <PresentationControls
          enabled={true}
          global={true}
          cursor={true}
          snap={{ mass: 3, tension: 400 }}
          speed={isMobile ? 5.0 : 1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Infinity, Infinity]}
        >
          <primitive object={scene} />
          {/* Invisible Hitbox for easy touch interaction */}
          <mesh>
            <boxGeometry args={[7, 10, 7]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </PresentationControls>
      </Float>
    </group>
  );
}

// ─── Outer wrapper ────────────────────────────────────────────────────────────

export default function ScrollModel3D({ modelUrl = "/assets/asset3drobot.glb" }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);
  // DPR: desktop kuat tetap tajam penuh (hingga 2.0), mobile dioptimalkan ke 1.0
  const [dpr, setDpr] = useState([1, 1.5]);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAtContact(latest > 0.65);
  });

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setHasWebGL(!!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))));
    } catch {
      setHasWebGL(false);
    }

    const checkDevice = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Desktop tetap tajam hingga DPR 2.0, mobile dibatasi 1.0 agar tidak lag
      const maxDpr = mobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 2.0);
      setDpr([1, maxDpr]);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });

    const handleVis = () => setIsTabActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVis);

    return () => {
      window.removeEventListener("resize", checkDevice);
      document.removeEventListener("visibilitychange", handleVis);
    };
  }, []);

  if (!hasWebGL) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: isAtContact ? "auto" : "none",
        zIndex: 0,
      }}
    >
      <Canvas
        frameloop={isTabActive ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={dpr}
        gl={{ alpha: true, antialias: false, stencil: false, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr([1, 1.0])}
          onIncline={() => setDpr([1, isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 2.0)])}
          flipflops={3}
          threshold={0.85}
        >
          <AdaptiveDpr pixelated />

          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={1.6} />
          <directionalLight position={[-4, 2, -2]} intensity={0.4} />

          <Suspense fallback={null}>
            <AnimatedModel
              url={modelUrl}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
            />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/asset3drobot.glb");
