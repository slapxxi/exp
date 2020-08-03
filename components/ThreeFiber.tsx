import { GlitchPass } from '@self/components/GlitchPass';
import React, {
  forwardRef,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Canvas, extend, useFrame, useLoader, useThree, useUpdate } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import Sparks from './Sparks';

interface Props {}

extend({ OrbitControls, EffectComposer, RenderPass, UnrealBloomPass, GlitchPass });

let Main: React.FunctionComponent<Props> = () => {
  let [isMouseDown, setIsMouseDown] = useState(false);
  let [hovered, hover] = useState(false);
  let mouse = useRef([0, 0]);
  let onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    [],
  );

  return (
    <Canvas
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseMove={onMouseMove}
      camera={{ position: [0, 0, 4] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        gl.toneMapping = THREE.CineonToneMapping;
        gl.setClearColor(new THREE.Color('#334'));
      }}
    >
      <Lights></Lights>
      <Box></Box>
      <Number mouse={mouse} hover={hovered}></Number>
      <Plane position={[0, 3, -5]}></Plane>
      <Plane position={[0, -2, 0]} rotation={[-Math.PI / 2.1, 0, 0]}></Plane>
      <Controls></Controls>
      <Sparks
        mouse={mouse}
        count={20}
        colors={['#a2ccb6', '#fceeb5', '#ee786e', '#1166ff']}
      ></Sparks>
      <Effects down={isMouseDown}></Effects>
    </Canvas>
  );
};

function Box() {
  let meshRef = useRef<any>();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh rotation={[1, 1, 1]} ref={meshRef} castShadow>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
      <meshPhysicalMaterial attach="material" color="orange"></meshPhysicalMaterial>
    </mesh>
  );
}

function Number(props) {
  let { mouse, hover } = props;
  let ref = useRef();
  let { size, viewport } = useThree();
  let aspect = size.width / viewport.width;

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1);
      ref.current.rotation.x = lerp(
        ref.current.rotation.x,
        0 + mouse.current[1] / aspect / 50,
        0.1,
      );
      ref.current.rotation.y = 0.8;
    }
  });

  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Text>S</Text>
      </group>
    </Suspense>
  );
}

let Text = forwardRef((props, ref) => {
  let { children } = props;
  let font = useLoader(THREE.FontLoader, '/font.json');
  let config = useMemo(() => ({ font, size: 2, height: 0.3 }), [font]);
  let mesh = useUpdate(
    (self) => {
      let size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
    },
    [children],
  );

  return (
    <group>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[children, config]}></textGeometry>
        <meshNormalMaterial attach="material"></meshNormalMaterial>
      </mesh>
    </group>
  );
});

function Plane(props: any) {
  let { position, rotation } = props;

  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10, 10]}></planeBufferGeometry>
      <meshPhysicalMaterial attach="material" color="cyan"></meshPhysicalMaterial>
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3}></ambientLight>
      <spotLight position={[1, 3, 1]} penumbra={1} castShadow></spotLight>;
    </>
  );
}

function Controls() {
  let { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]}></orbitControls>;
}

function Effects(props) {
  let { down } = props;
  let ref = useRef();
  let aspect = new THREE.Vector2(512, 512);
  let { gl, scene, size, camera } = useThree();

  useEffect(() => {
    void ref.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    ref.current.render();
  }, 1);

  return (
    <effectComposer args={[gl]} ref={ref}>
      <renderPass attachArray="passes" scene={scene} camera={camera}></renderPass>
      <unrealBloomPass attachArray="passes" args={[aspect, 0.2, 0.3, 0.1]}></unrealBloomPass>
      <glitchPass attachArray="passes" factor={down ? 0.6 : 0}></glitchPass>
    </effectComposer>
  );
}

export function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

export default Main;
