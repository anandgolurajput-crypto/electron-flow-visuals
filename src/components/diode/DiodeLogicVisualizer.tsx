import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Zap, ShieldOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Bias = "forward" | "reverse";

function Lattice({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const positions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let x = -3; x <= 3; x++)
      for (let y = -2; y <= 2; y++)
        for (let z = -2; z <= 2; z++) arr.push(new THREE.Vector3(x * 0.7, y * 0.7, z * 0.7));
    return arr.slice(0, count);
  }, [count]);

  useEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#9ec4ff" transparent opacity={0.22} />
    </instancedMesh>
  );
}

function DepletionRegion({ bias }: { bias: Bias }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const target = bias === "reverse" ? 1.4 : 0.25;
    ref.current.scale.x += (target - ref.current.scale.x) * Math.min(1, dt * 3);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    const tOp = bias === "reverse" ? 0.55 : 0.14;
    mat.opacity += (tOp - mat.opacity) * Math.min(1, dt * 3);
  });
  return (
    <mesh ref={ref} scale={[0.25, 1, 1]}>
      <boxGeometry args={[1, 3, 3]} />
      <meshBasicMaterial color="#c4b5fd" transparent opacity={0.14} />
    </mesh>
  );
}

function Carriers({ bias, kind, count }: { bias: Bias; kind: "electron" | "hole"; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const color = kind === "electron" ? "#7dd3fc" : "#fda4af";
  const sideSign = kind === "electron" ? 1 : -1;

  const data = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      pos: new THREE.Vector3(
        sideSign * (0.6 + Math.random() * 2.4),
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.6,
      ),
      seed: Math.random() * 100,
    }));
  }, [count, sideSign]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, dt) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const forward = bias === "forward";
    const driftDir = forward ? -sideSign : sideSign;
    const depletionHalf = bias === "reverse" ? 0.7 : 0.12;

    for (let i = 0; i < count; i++) {
      const d = data[i];
      d.pos.y += Math.sin(t * 2 + d.seed) * dt * 0.15;
      d.pos.z += Math.cos(t * 1.7 + d.seed) * dt * 0.15;
      d.pos.x += driftDir * dt * (forward ? 1.6 : 0.6);

      if (bias === "reverse") {
        if (sideSign === 1 && d.pos.x < depletionHalf) d.pos.x = depletionHalf + Math.random() * 0.3;
        if (sideSign === -1 && d.pos.x > -depletionHalf) d.pos.x = -depletionHalf - Math.random() * 0.3;
      }
      if (d.pos.x > 3.2) d.pos.x = -3.2;
      if (d.pos.x < -3.2) d.pos.x = 3.2;
      if (d.pos.y > 1.4) d.pos.y = 1.4; else if (d.pos.y < -1.4) d.pos.y = -1.4;
      if (d.pos.z > 1.4) d.pos.z = 1.4; else if (d.pos.z < -1.4) d.pos.z = -1.4;

      dummy.position.copy(d.pos);
      dummy.scale.setScalar(0.07);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}

function Terminals({ bias }: { bias: Bias }) {
  return (
    <group>
      <Html position={[-3.4, 1.9, 0]} center distanceFactor={8}>
        <div className="px-2 py-0.5 rounded-md text-[10px] font-mono glass text-rose-200">P · Anode</div>
      </Html>
      <Html position={[3.4, 1.9, 0]} center distanceFactor={8}>
        <div className="px-2 py-0.5 rounded-md text-[10px] font-mono glass text-sky-200">N · Cathode</div>
      </Html>
      <Html position={[0, -2.0, 0]} center distanceFactor={8}>
        <div className="px-2 py-0.5 rounded-md text-[10px] font-mono glass">
          {bias === "forward" ? "I → flowing" : "I ≈ 0"}
        </div>
      </Html>
    </group>
  );
}

export function DiodeLogicVisualizer() {
  const [bias, setBias] = useState<Bias>("forward");
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => setMounted(true), []);

  // performance tiers
  const carrierCount = isMobile ? 70 : 180;
  const dpr: [number, number] = isMobile ? [1, 1.25] : [1, 1.6];
  const showBloom = !isMobile;

  return (
    <div className="relative w-full h-[460px] md:h-[560px] rounded-2xl overflow-hidden glass">
      <div className="absolute z-10 top-4 left-4 flex gap-2">
        <BiasButton active={bias === "forward"} onClick={() => setBias("forward")} icon={<Zap size={14} />} label="Forward Bias" tone="sky" />
        <BiasButton active={bias === "reverse"} onClick={() => setBias("reverse")} icon={<ShieldOff size={14} />} label="Reverse Bias" tone="rose" />
      </div>
      <div className="absolute z-10 bottom-4 left-4 right-4 flex justify-between text-[11px] font-mono text-slate-400">
        <span className="hidden sm:inline">● drag to rotate · scroll to zoom</span>
        <span className="sm:hidden">● drag to rotate</span>
        <span className="text-slate-500">P-N JUNCTION · WebGL</span>
      </div>
      {mounted && (
        <Canvas
          camera={{ position: [0, 1.6, 7], fov: 50 }}
          dpr={dpr}
          gl={{ antialias: !isMobile, powerPreference: "high-performance", alpha: false }}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={["#0f1428"]} />
          <ambientLight intensity={0.4} />
          <Lattice count={isMobile ? 60 : 175} />
          <DepletionRegion bias={bias} />
          <Carriers bias={bias} kind="electron" count={carrierCount} />
          <Carriers bias={bias} kind="hole" count={carrierCount} />
          <Terminals bias={bias} />
          <OrbitControls enablePan={false} autoRotate={!isMobile} autoRotateSpeed={0.4} />
          {showBloom && (
            <EffectComposer>
              <Bloom intensity={1.0} luminanceThreshold={0.25} luminanceSmoothing={0.5} mipmapBlur />
            </EffectComposer>
          )}
        </Canvas>
      )}
    </div>
  );
}

function BiasButton({
  active, onClick, icon, label, tone,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; tone: "sky" | "rose" }) {
  const ring = tone === "sky" ? "ring-sky-300/60 text-sky-100" : "ring-rose-300/60 text-rose-100";
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-xs font-medium glass transition-all flex items-center gap-1.5 ${active ? `ring-1 ${ring}` : "text-slate-300 hover:text-white"}`}
    >
      {icon}
      {label}
    </motion.button>
  );
}
