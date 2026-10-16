"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
function Beans({ progress }: { progress: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(0.12, 16, 12);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        y = pos.getY(i),
        z = pos.getZ(i);
      const seam = Math.exp(-Math.pow(x / 0.024, 2)) * Math.max(0, z) * 0.32;
      pos.setXYZ(i, x * 0.77, y * 1.25, z * 0.67 - seam);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(() => {
    if (!ref.current) return;
    for (let i = 0; i < 36; i++) {
      const delay = (i % 9) / 11;
      const t = Math.max(0, Math.min(1, (progress - delay) * 2));
      const x = (((i * 37) % 101) / 101) * 3 - 1.5;
      const z = (((i * 29) % 83) / 83) * 1.3 - 0.65;
      const fall = 2.6 - 4.9 * t * t;
      const floor = -0.8 + (i % 4) * 0.08;
      const y =
        fall > floor
          ? fall
          : floor +
            Math.abs(Math.sin((t - 0.82) * 15)) * 0.12 * Math.max(0, 1 - t);
      dummy.position.set(x, y, z);
      dummy.rotation.set(i * 0.77 + t * 3, i * 1.3 + t * 2, i * 0.44);
      const s = 0.8 + (i % 5) * 0.1;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[geometry, undefined, 36]}>
      <meshStandardMaterial color="#563725" roughness={0.82} />
    </instancedMesh>
  );
}
export default function BeanScene({ progress }: { progress: number }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.3]}
      camera={{ position: [0, 1, 4.8], fov: 38 }}
      gl={{ powerPreference: "low-power" }}
    >
      <color attach="background" args={["#e9e5dc"]} />
      <ambientLight intensity={1.3} />
      <directionalLight position={[-2, 4, 3]} intensity={3} />
      <Beans progress={progress} />
    </Canvas>
  );
}
