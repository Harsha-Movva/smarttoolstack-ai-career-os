"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";

export default function AIOrb() {
  return (
    <div
      className="
        relative
        h-[450px]
        w-[450px]
        rounded-full
      "
    >
      {/* Glow Behind Orb */}

      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-cyan-500/20
          blur-[120px]
        "
      />

      {/* 3D Canvas */}

      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 45,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}