"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import cardGLB from "./card.glb";
import lanyardTexture from "./lanyard.png";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const cardGLBPath = typeof cardGLB === "string" ? cardGLB : cardGLB?.src;
const lanyardTexturePath =
  typeof lanyardTexture === "string" ? lanyardTexture : lanyardTexture?.src;

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(null);
  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const cardData = useGLTF(cardGLBPath);
  const texture = useTexture(lanyardTexturePath);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
    [],
  );

  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!texture) return;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }, [texture]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    [fixed, j1, j2, j3].forEach((ref) => {
      if (ref.current) {
        ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      }
    });
  }, []);

  useFrame((state, delta) => {
    if (!card.current || !j1.current || !j2.current || !j3.current || !fixed.current) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current.lerped) {
      fixed.current.lerped.lerp(fixed.current.translation(), 0.16);
      j1.current.lerped.lerp(j1.current.translation(), 0.16);
      j2.current.lerped.lerp(j2.current.translation(), 0.16);
      j3.current.lerped.lerp(j3.current.translation(), 0.16);
    }

    if (band.current && j1.current.lerped && j2.current.lerped && j3.current.lerped && card.current.translation()) {
      curve.points[0].copy(j3.current.lerped);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(card.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, false);
    }

    const linearVelocity = card.current.linvel();
    const speed = Math.hypot(linearVelocity.x, linearVelocity.y, linearVelocity.z);

    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      card.current.setLinvel(
        {
          x: linearVelocity.x * scale,
          y: linearVelocity.y * scale,
          z: linearVelocity.z * scale,
        },
        true,
      );
    }

    if (speed < minSpeed) {
      card.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }

    ang.multiplyScalar(0.95);
    card.current.setAngvel({ x: ang.x, y: ang.y, z: ang.z }, true);

    if (dragged && !card.current.isSleeping()) {
      const force = Math.max(0.1, Math.min(1, delta * 8));
      card.current.setTranslation(
        {
          x: THREE.MathUtils.lerp(card.current.translation().x, vec.x, force),
          y: THREE.MathUtils.lerp(card.current.translation().y, vec.y, force),
          z: THREE.MathUtils.lerp(card.current.translation().z, vec.z, force),
        },
        true,
      );
    }
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" canSleep={false} />
        <RigidBody ref={j1} position={[0.5, 0, 0]} linearDamping={0.95} angularDamping={0.95}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} linearDamping={0.95} angularDamping={0.95}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} linearDamping={0.95} angularDamping={0.95}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type={dragged ? "kinematicPosition" : "dynamic"}
          linearDamping={0.95}
          angularDamping={0.95}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event) => {
              event.target?.releasePointerCapture?.(event.pointerId);
              setDragged(false);
            }}
            onPointerDown={(event) => {
              event.target?.setPointerCapture?.(event.pointerId);
              const hit = event.point;
              const current = card.current?.translation();
              if (!current) return;
              setDragged(new THREE.Vector3(hit.x - current.x, hit.y - current.y, hit.z - current.z));
            }}
          >
            <mesh geometry={cardData.nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardData.materials.base.map}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.35}
                metalness={0.1}
              />
            </mesh>
            <mesh geometry={cardData.nodes.clip.geometry} material={cardData.materials.metal} material-roughness={0.25} />
            <mesh geometry={cardData.nodes.clamp.geometry} material={cardData.materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1000, 1000]}
          useMap={1}
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
          transparent
        />
      </mesh>
    </>
  );
}

function Scene({ position }) {
  return (
    <>
      <ambientLight intensity={Math.PI} />
      <RigidBody type="fixed" position={position}>
        <Band />
      </RigidBody>
      <Environment background blur={0.75}>
        <color attach="background" args={["#050816"]} />
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
      <directionalLight position={[0, 0, 5]} intensity={0.3} />
      <directionalLight position={[0, 0, -5]} intensity={0.3} />
    </>
  );
}

if (cardGLBPath) {
  useGLTF.preload(cardGLBPath);
}

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!cardGLBPath || !lanyardTexturePath) {
    return (
      <div className="lanyard-fallback">
        <p className="lanyard-fallback-title">Lanyard assets missing</p>
        <p className="lanyard-fallback-text">Pastikan file card.glb dan lanyard.png ada di folder components.</p>
      </div>
    );
  }

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: isMobile ? [0, 0, 14] : [0, 0, 13], fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <Physics gravity={gravity} timeStep={1 / 60} interpolate>
          <Scene position={position} />
        </Physics>
      </Canvas>
    </div>
  );
}
