import { useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

function GLStars() {
  let groupRef = useRef<THREE.Group>();
  let theta = 0;

  let [geo, mat, coords] = useMemo(() => {
    let geo = new THREE.SphereBufferGeometry(1, 10, 10);
    let mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('slategrey') });
    let coords = new Array(2000)
      .fill(null)
      .map((i) => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
      ]);
    return [geo, mat, coords];
  }, []);

  useFrame(() => {
    let r = Math.sin((Math.PI * (theta += 0.1)) / 180);
    let s = Math.tan((theta / 180) * Math.PI);

    if (groupRef.current) {
      groupRef.current.rotation.set(r, r, r);
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      {coords.map((points, i) => {
        return <mesh key={i} geometry={geo} material={mat} position={points}></mesh>;
      })}
    </group>
  );
}

export default GLStars;
