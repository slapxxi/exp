import { useRef } from 'react';
import { a, useSpring } from 'react-spring/three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

interface Props {}

let Component: React.FunctionComponent<Props> = () => {
  return (
    <Canvas>
      <ambientLight></ambientLight>
      <spotLight intensity={1} position={[10, 10, 10]}></spotLight>
      <Box></Box>
    </Canvas>
  );
};

function Box() {
  let boxRef = useRef<THREE.Mesh>(null);
  let { size } = useThree();
  let boxSize = size.width < 250 ? 0.5 : size.width > 800 ? 1 : 0.7;
  let animated = useSpring({
    size: [boxSize, boxSize, boxSize],
  });

  useFrame(({ clock }) => {
    let time = clock.getElapsedTime();
    let interpolatedTime = Math.tan(time);
    boxRef.current.position.set(0, interpolatedTime, 0);
    boxRef.current.rotation.set(interpolatedTime / 2, interpolatedTime, 0);
  });

  return (
    <a.mesh rotation={[1, 1, 1]} ref={boxRef} scale={animated.size} position={animated.position}>
      <boxBufferGeometry attach="geometry"></boxBufferGeometry>
      <meshPhysicalMaterial attach="material" color="hotpink"></meshPhysicalMaterial>
    </a.mesh>
  );
}

export default Component;
