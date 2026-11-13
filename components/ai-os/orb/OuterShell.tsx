"use client";

export default function OuterShell() {
  return (
    <mesh>

      <sphereGeometry args={[1.35,128,128]} />

      <meshPhysicalMaterial
        transparent
        opacity={0.12}
        transmission={1}
        thickness={0.5}
        roughness={0}
        clearcoat={1}
        metalness={0}
        color="#7DF9FF"
      />

    </mesh>
  );
}