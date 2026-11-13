"use client";

import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useRef } from "react";

export default function MouseFollower({
  children,
}: {
  children: React.ReactNode;
}) {

  const group = useRef<Group>(null!);

  useFrame(({ mouse }) => {

    group.current.rotation.y =
      mouse.x * 0.35;

    group.current.rotation.x =
      -mouse.y * 0.25;

  });

  return (
    <group ref={group}>
      {children}
    </group>
  );

}