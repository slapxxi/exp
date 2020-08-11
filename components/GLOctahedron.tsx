import { useRef, useState } from 'react';
import { a, config, useSpring } from 'react-spring/three';
import * as THREE from 'three';

function GLOctahedron() {
  let geo = useRef(null);
  let [active, setActive] = useState(false);
  const vertices = [
    [-1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [0, -1, 0],
  ];
  let animated = useSpring({
    position: active ? [0, 0, 2] : [0, 0, 0],
    rotation: active ? [Math.PI / 2, 0, Math.PI / 2] : [0, 0, 0],
    'material-opacity': active ? 1 : 0.5,
    config: config.wobbly,
  });

  return (
    <group>
      <a.lineLoop position={animated.position}>
        <geometry
          attach="geometry"
          vertices={vertices.map((v) => new THREE.Vector3(...v))}
        ></geometry>
        <lineBasicMaterial attach="material" color="red"></lineBasicMaterial>
      </a.lineLoop>
      <a.mesh
        rotation={animated.rotation}
        position={animated.position}
        material-opacity={animated['material-opacity']}
        onClick={() => setActive(!active)}
      >
        <octahedronGeometry attach="geometry" ref={geo}></octahedronGeometry>
        <meshStandardMaterial
          attach="material"
          color="slategrey"
          transparent
        ></meshStandardMaterial>
      </a.mesh>
    </group>
  );
}

export default GLOctahedron;
