import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DeveloperCoreProps {
  wireframeMode?: boolean;
  dramaticSpin?: boolean;
}

function ControlRoomScene({ wireframeMode = false, dramaticSpin = false }: DeveloperCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const count = 32;
  const spinSpeed = useRef(0.005);

  // Generate position network for translucent glass cubes
  const initialPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const radius = 3.5;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const r = radius * (0.7 + Math.random() * 0.4);
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(initialPositions), [initialPositions]);

  // Line connections geometry buffer
  const maxConnections = (count * (count - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Handle dramatic spin easter egg
    if (dramaticSpin) {
      spinSpeed.current = THREE.MathUtils.lerp(spinSpeed.current, 0.08, 0.05);
    } else {
      spinSpeed.current = THREE.MathUtils.lerp(spinSpeed.current, 0.004, 0.02);
    }

    // Slow cinematic 3D rotation & tilt
    groupRef.current.rotation.y += spinSpeed.current;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.08;

    // Mouse perspective tilt
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.4;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;

    let lineVertexCount = 0;
    const connectionDistSq = 3.0 * 3.0;

    for (let i = 0; i < count; i++) {
      let x = initialPositions[i * 3];
      let y = initialPositions[i * 3 + 1];
      let z = initialPositions[i * 3 + 2];

      // Slow floating oscillation
      const floatY = Math.sin(time * 1.5 + i) * 0.15;
      y += floatY;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      dummy.position.set(x, y, z);
      dummy.rotation.x = time * 0.2 + i;
      dummy.rotation.y = time * 0.3 + i;
      const cubeScale = 0.22 + Math.sin(time * 2 + i) * 0.04;
      dummy.scale.set(cubeScale, cubeScale, cubeScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Build connection lines
      for (let j = i + 1; j < count; j++) {
        const jx = currentPositions[j * 3];
        const jy = currentPositions[j * 3 + 1];
        const jz = currentPositions[j * 3 + 2];

        const distSq = (x - jx) ** 2 + (y - jy) ** 2 + (z - jz) ** 2;
        if (distSq < connectionDistSq) {
          linePositions[lineVertexCount * 3] = x;
          linePositions[lineVertexCount * 3 + 1] = y;
          linePositions[lineVertexCount * 3 + 2] = z;

          linePositions[lineVertexCount * 3 + 3] = jx;
          linePositions[lineVertexCount * 3 + 4] = jy;
          linePositions[lineVertexCount * 3 + 5] = jz;

          lineVertexCount += 2;
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    if (linesRef.current) {
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineVertexCount);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Translucent Floating Glass Cubes */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#2563EB"
          roughness={0.1}
          metalness={0.1}
          transmission={0.85}
          opacity={0.8}
          transparent
          wireframe={wireframeMode}
          emissive="#2563EB"
          emissiveIntensity={0.25}
        />
      </instancedMesh>

      {/* Thin Glowing Connection Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={wireframeMode ? "#3B82F6" : "#2563EB"}
          transparent
          opacity={wireframeMode ? 0.6 : 0.25}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function DeveloperCoreCanvas({
  wireframeMode = false,
  dramaticSpin = false,
}: DeveloperCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldMountCanvas, setShouldMountCanvas] = useState(false);

  // Defer Three.js WebGL Canvas mounting until user interaction or 2.5s post-load timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const triggerMount = () => {
      setShouldMountCanvas(true);
      window.removeEventListener("scroll", triggerMount);
      window.removeEventListener("mousemove", triggerMount);
      window.removeEventListener("touchstart", triggerMount);
      if (timer) clearTimeout(timer);
    };

    window.addEventListener("scroll", triggerMount, { passive: true });
    window.addEventListener("mousemove", triggerMount, { passive: true });
    window.addEventListener("touchstart", triggerMount, { passive: true });

    timer = setTimeout(triggerMount, 2500);

    return () => {
      window.removeEventListener("scroll", triggerMount);
      window.removeEventListener("mousemove", triggerMount);
      window.removeEventListener("touchstart", triggerMount);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Pause WebGL rendering loop when Canvas is scrolled offscreen or window is hidden
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-75"
    >
      {shouldMountCanvas ? (
        <Canvas
          frameloop={isVisible ? "always" : "never"}
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[10, 15, 8]} intensity={2.5} color="#FFFFFF" />
          <pointLight position={[-8, -8, -5]} intensity={1.2} color="#2563EB" />
          <spotLight position={[0, 10, 0]} intensity={1.5} color="#7C3AED" angle={0.6} penumbra={1} />
          <ControlRoomScene wireframeMode={wireframeMode} dramaticSpin={dramaticSpin} />
        </Canvas>
      ) : null}
    </div>
  );
}
