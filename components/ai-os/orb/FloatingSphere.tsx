"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function FloatingSphere() {
  const sphereRef = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    if (!sphereRef.current) return;

    sphereRef.current.rotation.y += 0.005;

    sphereRef.current.rotation.x += 0.002;

    sphereRef.current.position.y =
      Math.sin(clock.elapsedTime) * 0.2;
  });

  return (
    <mesh ref={sphereRef}>

      <sphereGeometry args={[1.2, 128, 128]} />

      <meshPhysicalMaterial
  color="#00E5FF"
  emissive="#00E5FF"
  emissiveIntensity={4}
  metalness={1}
  roughness={0}
  transmission={0.3}
  clearcoat={1}
  clearcoatRoughness={0}
/>

    </mesh>
  );
}