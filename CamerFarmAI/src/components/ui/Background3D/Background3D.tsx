import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import styles from "./Background3D.module.css";

function FloatingParticles({ count = 2000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const particlesRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    particlesRef.current = positions;
    velocitiesRef.current = velocities;
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current && particlesRef.current && velocitiesRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotation globale
      points.current.rotation.x = time * 0.05;
      points.current.rotation.y = time * 0.1;
      
      // Animation des particules individuelles
      const positions = particlesRef.current;
      const velocities = velocitiesRef.current;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3] + Math.sin(time + i) * 0.01;
        positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time + i) * 0.01;
        positions[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.5 + i) * 0.01;
        
        // Réinitialiser si trop loin
        if (Math.abs(positions[i3]) > 30) positions[i3] = (Math.random() - 0.5) * 10;
        if (Math.abs(positions[i3 + 1]) > 30) positions[i3 + 1] = (Math.random() - 0.5) * 10;
        if (Math.abs(positions[i3 + 2]) > 30) positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
      
      if (points.current.geometry) {
        points.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#28a745"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        vertexColors={false}
      />
    </Points>
  );
}

function AnimatedOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const orbsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      
      // Animation individuelle des orbes
      orbsRef.current.forEach((orb, i) => {
        if (orb) {
          const scale = 1 + Math.sin(time * 2 + i) * 0.2;
          orb.scale.set(scale, scale, scale);
          orb.rotation.y = time * (0.5 + i * 0.1);
          orb.rotation.x = time * (0.3 + i * 0.05);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 8 + Math.sin(i) * 2;
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) orbsRef.current[i] = el;
            }}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 4,
              -10 + i * 1.5
            ]}
          >
            <sphereGeometry args={[0.6 + i * 0.15, 32, 32]} />
            <meshStandardMaterial
              color="#28a745"
              emissive="#34ce57"
              emissiveIntensity={0.4 + Math.sin(i) * 0.2}
              transparent
              opacity={0.25 + Math.sin(i) * 0.1}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function EnergyWaves() {
  const wavesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    wavesRef.current.forEach((wave, i) => {
      if (wave) {
        wave.rotation.z = time * (0.5 + i * 0.2);
        const scale = 1 + Math.sin(time * (1 + i * 0.3)) * (0.15 + i * 0.05);
        wave.scale.set(scale, scale, 1);
        const material = wave.material as THREE.MeshStandardMaterial;
        if (material) {
          material.opacity = 0.2 + Math.sin(time + i) * 0.15;
          material.emissiveIntensity = 0.4 + Math.sin(time * 2 + i) * 0.2;
        }
      }
    });
  });

  return (
    <group>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) wavesRef.current[i] = el;
          }}
          position={[0, 0, -5 - i * 2]}
        >
          <ringGeometry args={[2.5 + i * 1.5, 3 + i * 1.5, 64]} />
          <meshStandardMaterial
            color="#34ce57"
            emissive="#28a745"
            emissiveIntensity={0.5}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function EnergyLines() {
  const linesRef = useRef<THREE.Line[]>([]);
  const lineCount = 20;

  const lines = useMemo(() => {
    const lineGeometries: THREE.BufferGeometry[] = [];
    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 10;
      
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const angle = (i / lineCount) * Math.PI * 2 + t * Math.PI;
        const radius = 5 + Math.sin(t * Math.PI * 2) * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle * 2) * 3,
            -8 + t * 4
          )
        );
      }
      
      geometry.setFromPoints(points);
      lineGeometries.push(geometry);
    }
    return lineGeometries;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    linesRef.current.forEach((line, i) => {
      if (line) {
        line.rotation.z = time * 0.1 + i * 0.1;
        const material = line.material as THREE.LineBasicMaterial;
        if (material) {
          material.opacity = 0.3 + Math.sin(time + i) * 0.2;
        }
      }
    });
  });

  return (
    <group>
      {lines.map((geometry, i) => (
        <line
          key={i}
          ref={(el) => {
            if (el) linesRef.current[i] = el;
          }}
          geometry={geometry}
        >
          <lineBasicMaterial
            color="#28a745"
            transparent
            opacity={0.4}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  );
}

export function Background3D() {
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(2000);

  useEffect(() => {
    setMounted(true);
    // Réduire le nombre de particules sur mobile pour les performances
    const updateParticleCount = () => {
      setParticleCount(window.innerWidth < 768 ? 1000 : 2000);
    };
    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);
    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.background3D}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#28a745" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#34ce57" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#28a745" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#34ce57" />
        <FloatingParticles count={particleCount} />
        <AnimatedOrbs />
        <EnergyWaves />
        <EnergyLines />
      </Canvas>
    </div>
  );
}

