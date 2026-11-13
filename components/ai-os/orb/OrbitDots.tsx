"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

export default function OrbitDots() {

  const group = useRef<Group>(null!);

  const dots = useMemo(() => {

    return [...Array(24)].map((_, i) => {

      const angle =
        (i / 24) * Math.PI * 2;

      return {
        x: Math.cos(angle) * 2.2,
        z: Math.sin(angle) * 2.2,
      };

    });

  }, []);

  useFrame(() => {

    group.current.rotation.y += 0.004;

  });

  return (

    <group ref={group}>

      {dots.map((dot, i) => (

        <mesh
          key={i}
          position={[dot.x,0,dot.z]}
        >

          <sphereGeometry
            args={[0.04,16,16]}
          />

          <meshBasicMaterial
            color="#00E5FF"
          />

        </mesh>

      ))}

    </group>

  );

}