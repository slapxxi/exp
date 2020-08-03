import { useMemo, useRef } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import * as meshline from 'threejs-meshline';
import { lerp } from './ThreeFiber';

extend(meshline);

interface Props {
  mouse: any;
  count: number;
  radius?: number;
  colors: string[];
}

function Sparks(props: Props) {
  let { mouse, count, colors, radius = 10 } = props;
  let ref = useRef<any>();

  let lines = useMemo(
    () =>
      new Array(count).fill(null).map((_, index) => {
        const pos = new THREE.Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0);
        const points = new Array(30).fill(null).map((_, index) => {
          const angle = (index / 20) * Math.PI * 2;
          return pos
            .add(
              new THREE.Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0),
            )
            .clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: colors[Math.floor(colors.length * Math.random())],
          width: Math.max(0.1, (0.2 * index) / 10),
          speed: Math.max(0.001, 0.004 * Math.random()),
          curve,
        };
      }),
    [count],
  );

  let { size, viewport } = useThree();
  let aspect = size.width / viewport.width;

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = lerp(
        ref.current.rotation.x,
        0 + mouse.current[1] / aspect / 200,
        0.1,
      );
      ref.current.rotation.y = lerp(
        ref.current.rotation.y,
        0 + mouse.current[0] / aspect / 400,
        0.1,
      );
    }
  });

  return (
    <group ref={ref}>
      <group position={[-radius * 2, -radius, -10]} scale={[1, 1.3, 1]}>
        {lines.map((line, index) => (
          <Fatline key={index} {...line}></Fatline>
        ))}
      </group>
    </group>
  );
}

function Fatline(props: any) {
  let { curve, color, width, speed } = props;
  let material = useRef<any>();

  useFrame(() => {
    material.current.uniforms.dashOffset.value -= speed;
  });

  return (
    <mesh>
      <meshLine attach="geometry" vertices={curve}></meshLine>
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.95}
      ></meshLineMaterial>
    </mesh>
  );
}

function r() {
  return Math.max(0.2, Math.random());
}

export default Sparks;
