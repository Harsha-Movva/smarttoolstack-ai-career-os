"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function CoreGlow() {
  const ref = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const pulse =
      1 + Math.sin(clock.elapsedTime * 2) * 0.08;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.6, 128, 128]} />

      <meshBasicMaterial
        color="#7DF9FF"
      />
    </mesh>
  );
}