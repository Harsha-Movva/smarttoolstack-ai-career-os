"use client";

import { OrbitControls } from "@react-three/drei";

import FloatingSphere from "./FloatingSphere";
import EnergyRing from "./EnergyRing";
import Particles from "./Particles";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={2} />

      <pointLight
        position={[5, 5, 5]}
        intensity={40}
        color="#00E5FF"
      />

      <pointLight
        position={[-5, -5, -5]}
        intensity={20}
        color="#7C3AED"
      />

      <directionalLight
        position={[0, 10, 0]}
        intensity={3}
      />

      <Particles />

      <EnergyRing />

      <FloatingSphere />

      <OrbitControls
        autoRotate
        autoRotateSpeed={1.5}
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
}