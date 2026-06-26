"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function EnergyRing() {
  const ringRef = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;

    ringRef.current.rotation.z += 0.01;
    ringRef.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.5) * 0.4;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1.8, 0.05, 32, 200]} />

      <meshStandardMaterial
        color="#00E5FF"
        emissive="#00E5FF"
        emissiveIntensity={3}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
}