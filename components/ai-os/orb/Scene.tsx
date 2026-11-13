"use client";

import { OrbitControls } from "@react-three/drei";

import FloatingSphere from "./FloatingSphere";
import CoreGlow from "./CoreGlow";
import OuterShell from "./OuterShell";
import EnergyRing from "./EnergyRing";
import OrbitDots from "./OrbitDots";
import Particles from "./Particles";
import MouseFollower from "./MouseFollower";

export default function Scene() {
  return (
    <>
      {/* =========================
          LIGHTING
      ========================== */}

      <ambientLight intensity={1.8} />

      <pointLight
        position={[5, 5, 5]}
        intensity={35}
        color="#00E5FF"
      />

      <pointLight
        position={[-5, 3, -5]}
        intensity={25}
        color="#7C3AED"
      />

      <pointLight
        position={[0, -4, 4]}
        intensity={18}
        color="#00FFFF"
      />

      <directionalLight
        position={[0, 8, 5]}
        intensity={2}
      />

      {/* =========================
          PARTICLES
      ========================== */}

      <Particles />

      {/* =========================
          AI CORE
      ========================== */}

      <MouseFollower>

        <OuterShell />

        <EnergyRing />

        <OrbitDots />

        <FloatingSphere />

        <CoreGlow />

      </MouseFollower>

      {/* =========================
          CAMERA
      ========================== */}

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.8}
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
}