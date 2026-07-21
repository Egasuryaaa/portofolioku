import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, PresentationControls } from "@react-three/drei";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

function AnimatedModel({ url, scrollYProgress, isMobile, isAtContact }) {
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

  // Ensure transparent materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = true;
      }
    });
  }, [scene]);

  // ─── Keyframe Mapping (0, 0.33, 0.66, 1) ─────────────────────────────────
  // Based on user request:
  // 0.00: Hero (X: -2.5, Y: 1.5, Z: 0, ry: 0)
  // 0.33: About/Skills (X: 4.0, Y: 0.5, Z: -1, ry: -0.5, rz: -0.1)
  // 0.66: Projects/Gallery (X: 6.0, Y: 0, Z: 1, ry: 0.5, rz: -0.2)
  // 1.00: Contact (X: 3.5, Y: -1.5, Z: 0, ry: 0, rz: 0)

  // X Position
  const xDesk = [-2.6, 4.0, 5.5, 2.8]; // Adjusted 2.8 for perfect symmetry in Contact column
  const xMob  = [1.2, -1.0, 1.2, 0];
  const x = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], isMobile ? xMob : xDesk);

  // Y Position
  const yDesk = [1.5, 0.5, 0, -1.5];
  const yMob  = [1.4, 2.0, 1.8, -2.0];
  const y = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], isMobile ? yMob : yDesk);

  // Z Position
  const zDesk = [0, -1, 1, 0];
  const z = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], zDesk);

  // Rotations
  // A perfect 360-degree horizontal spin (Math.PI * 2) precisely completed when arriving at Contact
  const ry = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const rz = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, -0.1, -0.2, 0]);

  // Scale (Bigger at the end)
  const sDesk = [1.5, 1.2, 0.8, 2.5];
  const sMob  = [1.5, 1.2, 0.9, 2.4];
  const scale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], isMobile ? sMob : sDesk);

  // Apply mapped Framer Motion values seamlessly into the 3D world per-frame
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
          global={true} // Allow dragging anywhere on the canvas
          cursor={true}
          snap={{ mass: 3, tension: 400 }} // Smoothly snap back to center when released
          speed={isMobile ? 5.0 : 1.5} // Massively increased speed for effortless mobile touch swiping
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]} // Vertical limits
          azimuth={[-Infinity, Infinity]} // Infinite horizontal rotation
        >
          <primitive object={scene} />
          {/* Invisible Hitbox: Makes it super easy to grab the robot on touch screens without needing precise taps */}
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
  
  // framer-motion natively tracks window scroll here!
  const { scrollYProgress } = useScroll();

  // Toggle pointer events only when reaching the Contact section
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAtContact(latest > 0.65);
  });

  // Handle responsive layout detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: isAtContact ? "auto" : "none",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} castShadow />
        <directionalLight position={[-4, -2, 4]} intensity={0.5} />
        <directionalLight position={[0, 3, -3]} intensity={0.3} />

        <Suspense fallback={null}>
          <AnimatedModel 
            url={modelUrl} 
            scrollYProgress={scrollYProgress} 
            isMobile={isMobile} 
            isAtContact={isAtContact}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/asset3drobot.glb");
