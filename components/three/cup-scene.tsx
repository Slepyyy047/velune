"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
  ContactShadows,
  AdaptiveDpr,
} from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as Controls } from "three-stdlib";
export type CupView = "front" | "rim" | "paper";
function ContextLossGuard({ onError }: { onError: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onError);
    // R3F intentionally releases its context on unmount. That is not a failure.
    return () => canvas.removeEventListener("webglcontextlost", onError);
  }, [gl, onError]);
  return null;
}
function PaperCup({
  rotation,
  view,
  reduced,
}: {
  rotation: number;
  view: CupView;
  reduced: boolean;
}) {
  const gltf = useGLTF("/models/velune-sage-study.glb");
  const group = useRef<THREE.Group>(null);
  const intro = useRef(reduced ? 1 : 0);
  const { invalidate } = useThree();
  const { scene, materials, textures } = useMemo(() => {
    const scene = gltf.scene.clone(true);
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#b8cbb3";
    ctx.fillRect(0, 0, 2048, 1024);
    ctx.fillStyle = "#34343a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = '220px "Velune Product Serif", Georgia, serif';
    ctx.fillText("velune.", 1024, 485);
    ctx.font = "25px Arial";
    ctx.fillText("A  S O F T E R  K I N D  O F  R I T U A L", 1024, 632);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    const noise = document.createElement("canvas");
    noise.width = noise.height = 512;
    const nctx = noise.getContext("2d")!;
    const pixels = nctx.createImageData(512, 512);
    let seed = 73;
    for (let i = 0; i < pixels.data.length; i += 4) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const c = 155 + (seed % 75);
      pixels.data[i] = c;
      pixels.data[i + 1] = c;
      pixels.data[i + 2] = c;
      pixels.data[i + 3] = 255;
    }
    nctx.putImageData(pixels, 0, 0);
    const bump = new THREE.CanvasTexture(noise);
    bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set(8, 6);
    const mats: THREE.Material[] = [];
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        const mat = (o.material as THREE.MeshStandardMaterial).clone();
        mat.bumpMap = bump;
        mat.bumpScale = o.name.startsWith("Paper") ? 0.003 : 0.0015;
        mat.roughness = o.name.includes("Lid") ? 0.78 : 0.94;
        if (o.name === "Paper_body") {
          mat.map = map;
          mat.color.set("white");
        }
        o.material = mat;
        o.castShadow = true;
        o.receiveShadow = true;
        mats.push(mat);
      }
    });
    return { scene, materials: mats, textures: [map, bump] };
  }, [gltf]);
  useEffect(
    () => () => {
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    },
    [materials, textures],
  );
  useFrame((_, delta) => {
    if (!group.current) return;
    intro.current = Math.min(1, intro.current + delta / 1.6);
    const t = 1 - Math.pow(1 - intro.current, 3);
    const target = Math.PI + rotation + (1 - t) * 0.5;
    group.current.rotation.y = reduced
      ? target
      : THREE.MathUtils.damp(group.current.rotation.y, target, 7, delta);
    if (
      intro.current < 1 ||
      Math.abs(group.current.rotation.y - target) > 0.001
    )
      invalidate();
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      0,
      7,
      delta,
    );
  });
  return (
    <group ref={group} rotation={[0, Math.PI + 0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}
function CameraRig({
  view,
  zoom,
  reset,
  reduced,
}: {
  view: CupView;
  zoom: number;
  reset: number;
  reduced: boolean;
}) {
  const control = useRef<Controls>(null);
  const { camera, invalidate, performance: renderPerformance } = useThree();
  const goal = useRef(new THREE.Vector3(0, 1.3, 5.6));
  const animating = useRef(true);
  useEffect(() => {
    goal.current
      .set(
        0,
        view === "rim" ? 3.3 : view === "paper" ? 0.35 : 1.3,
        view === "paper" ? 3.6 : 5.6,
      )
      .multiplyScalar(zoom);
    animating.current = true;
    invalidate();
  }, [view, zoom, reset, invalidate]);
  useFrame((_, delta) => {
    if (!animating.current) return;
    const c = control.current;
    if (c) {
      c.target.lerp(
        new THREE.Vector3(0, view === "rim" ? 0.2 : 0, 0),
        reduced ? 1 : 1 - Math.exp(-delta * 6),
      );
      camera.position.lerp(
        goal.current,
        reduced ? 1 : 1 - Math.exp(-delta * 6),
      );
      c.update();
      if (camera.position.distanceTo(goal.current) < 0.015)
        animating.current = false;
      else invalidate();
    }
  });
  return (
    <OrbitControls
      ref={control}
      makeDefault
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.09}
      minPolarAngle={0.15}
      maxPolarAngle={Math.PI * 0.74}
      minDistance={2.7}
      maxDistance={7.5}
      onChange={() => renderPerformance.regress()}
      onStart={() => {
        animating.current = false;
      }}
    />
  );
}
export default function CupScene({
  rotation,
  view,
  zoom,
  reset,
  reduced,
  onReady,
  onError,
}: {
  rotation: number;
  view: CupView;
  zoom: number;
  reset: number;
  reduced: boolean;
  onReady: () => void;
  onError: () => void;
}) {
  const dpr =
    typeof window !== "undefined" && matchMedia("(pointer:coarse)").matches
      ? 1.1
      : 1.5;
  return (
    <Canvas
      frameloop="demand"
      performance={{ min: 0.65 }}
      shadows
      dpr={[1, dpr]}
      camera={{ position: [0, 1.3, 5.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={onReady}
    >
      <ContextLossGuard onError={onError} />
      <AdaptiveDpr />
      <color attach="background" args={["#eee6f2"]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[-3, 5, 4]}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        shadow-normalBias={0.015}
      />
      <directionalLight position={[3, 2, -3]} intensity={1.6} />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer
            form="rect"
            intensity={2}
            position={[-4, 3, 3]}
            rotation={[0, Math.PI / 4, 0]}
            scale={[4, 5, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[3, 3, -2]}
            rotation={[0, -Math.PI / 3, 0]}
            scale={[3, 4, 1]}
          />
        </Environment>
        <PaperCup rotation={rotation} view={view} reduced={reduced} />
        <ContactShadows
          position={[0, -1.18, 0]}
          opacity={0.3}
          scale={9}
          blur={2.7}
          far={5}
          resolution={256}
          frames={1}
        />
      </Suspense>
      <CameraRig view={view} zoom={zoom} reset={reset} reduced={reduced} />
    </Canvas>
  );
}
