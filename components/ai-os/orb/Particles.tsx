"use client";

import { useMemo } from "react";

export default function Particles() {
  const particles = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 250; i++) {
      arr.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ]);
    }

    return arr;
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />

          <meshBasicMaterial color="#00E5FF" />
        </mesh>
      ))}
    </>
  );
}