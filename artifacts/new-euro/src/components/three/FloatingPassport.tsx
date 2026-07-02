import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Passport dimensions (cm scaled to units)
const W = 1.25;   // width
const H = 1.77;   // height
const D = 0.04;   // depth of each page/cover

interface PassportProps {
  progress: number; // 0 → 1, drives page opening
}

function PassportCover({ isBack = false }: { isBack?: boolean }) {
  return (
    <mesh>
      <boxGeometry args={[W, H, D * 2]} />
      <meshStandardMaterial
        color="#0A1A33"
        roughness={0.3}
        metalness={0.6}
        emissive="#050E1F"
        emissiveIntensity={0.4}
        side={isBack ? THREE.BackSide : THREE.FrontSide}
      />
    </mesh>
  );
}

function PassportPage({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Each page opens in sequence as progress advances
  const pageThreshold = index / total;
  const localProgress = Math.max(0, Math.min(1, (progress - pageThreshold) * total));
  const angle = localProgress * -Math.PI * 0.85; // opens up to ~153°

  useFrame(() => {
    if (!groupRef.current) return;
    // Pivot is at the left edge of the page, so translate left by half-width first
    groupRef.current.rotation.y = angle;
  });

  // Alternate page colors for visual variety
  const colors = ['#1A2744', '#0F1E38', '#162040', '#0D1830'];
  const color = colors[index % colors.length];

  return (
    // Pivot at left edge: offset group by -W/2 so pivot is at spine
    <group position={[-W / 2, 0, (index + 1) * D]} ref={groupRef}>
      <mesh position={[W / 2, 0, 0]}>
        <boxGeometry args={[W, H - 0.08, D]} />
        <meshStandardMaterial
          color={color}
          roughness={0.9}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* Gold accent line at top */}
      <mesh position={[W / 2, (H - 0.08) / 2 - 0.04, D / 2 + 0.001]}>
        <planeGeometry args={[W * 0.7, 0.015]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function GoldEmblem() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.2, D * 2 + 0.005]}>
      <circleGeometry args={[0.22, 32]} />
      <meshStandardMaterial
        color="#D4AF37"
        metalness={1.0}
        roughness={0.2}
        emissive="#E5C25D"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

const PAGE_COUNT = 4;

function PassportGroup({ progress }: PassportProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle floating bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    // Gentle sway when not interacted with
    groupRef.current.rotation.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    groupRef.current.rotation.x = 0.1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
  });

  return (
    <group ref={groupRef} rotation={[0.1, -0.3, 0]}>
      {/* Back cover */}
      <mesh position={[0, 0, -D]}>
        <boxGeometry args={[W, H, D * 2]} />
        <meshStandardMaterial color="#0A1A33" roughness={0.3} metalness={0.6} emissive="#050E1F" emissiveIntensity={0.3} />
      </mesh>

      {/* Inner pages */}
      {Array.from({ length: PAGE_COUNT }).map((_, i) => (
        <PassportPage key={i} index={i} total={PAGE_COUNT} progress={progress} />
      ))}

      {/* Front cover */}
      <group position={[-W / 2, 0, D * (PAGE_COUNT + 2)]}>
        <mesh
          position={[W / 2, 0, 0]}
          rotation={[0, progress * -Math.PI * 0.9, 0]}
        >
          <boxGeometry args={[W, H, D * 2]} />
          <meshStandardMaterial color="#0A1A33" roughness={0.3} metalness={0.7} emissive="#050E1F" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Gold emblem on cover */}
      <GoldEmblem />

      {/* "PASSPORT" text placeholder: thin gold bar */}
      <mesh position={[0, -0.35, D * 2 + 0.006]}>
        <planeGeometry args={[0.7, 0.025]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.6} />
      </mesh>

      {/* Spine */}
      <mesh position={[-W / 2 - 0.025, 0, D * 1.5]}>
        <boxGeometry args={[0.05, H, D * (PAGE_COUNT + 4)]} />
        <meshStandardMaterial color="#0F1E38" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function FloatingPassport({ progress = 0 }: { progress?: number }) {
  return (
    <WebGLErrorBoundary fallback={null}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#5B8DEF" />
        <pointLight position={[0, 2, 3]} intensity={1.5} color="#D4AF37" distance={8} />
        <PassportGroup progress={progress} />
      </Canvas>
    </WebGLErrorBoundary>
  );
}
