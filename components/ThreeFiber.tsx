import { OrbitControls, shaderMaterial } from 'drei';
import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';

interface Props {}

const URL = 'https://source.unsplash.com/random/960x640';

let BasicMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('tomato'),
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(100, 100),
  },
  `
  varying vec3 vPosition;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uMouse;

  #define PI 3.14159265358

  void main() {
    vPosition = position;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.); 
  }`,
  `
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform sampler2D uTexture;

  #define PI 3.14159265

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution;
    // vec3 texture = texture2D(uTexture, vUv).rgb;

    vec2 uv = vUv + (sin(mod(uTime*10., PI*2.)) / 120.);

    float r = texture2D(uTexture, uv).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv).b;

    gl_FragColor = vec4(r,g,b, 1.);
  }`,
  null,
);

extend({ BasicMaterial });

let Component: React.FunctionComponent<Props> = () => {
  return (
    <>
      <Canvas
        onCreated={({ gl }) => {
          gl.setClearColor('#202023');
        }}
      >
        <ambientLight castShadow></ambientLight>
        <spotLight intensity={1} position={[10, 1, 10]} castShadow></spotLight>
        <Suspense fallback={null}>
          <Image></Image>
        </Suspense>
        <OrbitControls></OrbitControls>
      </Canvas>
    </>
  );
};

function Image() {
  const SIZE = 5;
  let ref = useRef<any>();
  let texture = useLoader(THREE.TextureLoader, URL);

  let resolution = useMemo(() => {
    return new THREE.Vector2(window.innerWidth, window.innerHeight);
  }, []);

  useFrame(({ mouse }, delta) => {
    ref.current.material.uMouse = mouse;
    ref.current.material.uTime += delta;
  });

  return (
    <mesh ref={ref}>
      <planeBufferGeometry
        attach="geometry"
        args={[SIZE, (6 / 8) * SIZE, 64, 64]}
      ></planeBufferGeometry>
      <basicMaterial
        uTexture={texture}
        uResolution={resolution}
        attach="material"
        side={THREE.DoubleSide}
        transparent
      ></basicMaterial>
    </mesh>
  );
}

function lerp(min: number, max: number, progress: number) {
  return (1 - progress) * min + progress * max;
}

export default Component;
