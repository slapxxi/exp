import React, { useRef } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Model(props: any) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useLoader(GLTFLoader, '/models/skull.gltf');

  useFrame(({ clock }) => {
    let time = clock.getElapsedTime();
    let interpolatedTime = Math.tan(time);
    group.current.position.set(0, -interpolatedTime, 0);
    group.current.rotation.set(interpolatedTime / 4, interpolatedTime, 0);
  });

  return (
    <group ref={group} {...props} dispose={null} castShadow>
      <mesh geometry={nodes.uploads_files_2109301_SkullSnakes.geometry} scale={[0.05, 0.05, 0.05]}>
        <meshPhysicalMaterial
          attach="material"
          color="goldenrod"
          roughness={0.5}
          metalness={1}
        ></meshPhysicalMaterial>
      </mesh>
    </group>
  );
}
