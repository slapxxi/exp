import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Props {}

extend({ OrbitControls, GLTFLoader });

let Main: React.FunctionComponent<Props> = () => {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 15] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={0.5}></ambientLight>
        <spotLight position={[15, 30, 10]} penumbra={1} castShadow></spotLight>
        {/* <fog attach="fog" args={['white', 30, 55]}></fog> */}
        <Model></Model>
        {/* <Plane></Plane> */}
        <Controls></Controls>
      </Canvas>
    </>
  );
};

function Model() {
  let [model, setModel] = useState(null);

  useEffect(() => {
    new GLTFLoader().load('/models/lees_motorworks/scene.gltf', (result) => setModel(result));
  }, []);

  if (model) {
    return <primitive object={model.scene} scale={[1, 1, 1]}></primitive>;
  }

  return null;
}

function Box(props: any) {
  let { color } = props;
  let meshRef = useRef();

  return (
    <mesh ref={meshRef} castShadow>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
      <meshPhysicalMaterial attach="material" color={color}></meshPhysicalMaterial>
    </mesh>
  );
}

function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[200, 200]}></planeBufferGeometry>
      <meshPhysicalMaterial attach="material" color="slategrey"></meshPhysicalMaterial>
    </mesh>
  );
}

function Controls() {
  let orbitRef = useRef();
  let { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      ref={orbitRef}
      autoRotate
      autoRotateSpeed={10}
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      enableDamping
    ></orbitControls>
  );
}

export default Main;
