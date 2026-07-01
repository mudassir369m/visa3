import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

const DESTINATIONS = [
  { name: 'Pakistan', lat: 30.3753, lon: 69.3451, isOrigin: true },
  { name: 'UK', lat: 55.3781, lon: -3.4360 },
  { name: 'USA', lat: 37.0902, lon: -95.7129 },
  { name: 'Canada', lat: 56.1304, lon: -106.3468 },
  { name: 'Australia', lat: -25.2744, lon: 133.7751 },
  { name: 'Turkey', lat: 38.9637, lon: 35.2433 },
  { name: 'Schengen', lat: 46.2276, lon: 2.2137 },
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}

function DestinationDot({ dest, radius }: { dest: typeof DESTINATIONS[0], radius: number }) {
  const pos = latLonToVector3(dest.lat, dest.lon, radius);
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 2 + (dest.lat + dest.lon);
      const scale = 0.8 + Math.sin(t) * 0.4;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  const color = dest.isOrigin ? "#D4AF37" : "#5B8DEF";

  return (
    <mesh position={pos} ref={ref}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color={color} />
      <mesh position={[0,0,0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </mesh>
  );
}

function ArcLine({ start, end, radius, index }: { start: THREE.Vector3, end: THREE.Vector3, radius: number, index: number }) {
  const curve = useMemo(() => {
    const mid = start.clone().lerp(end, 0.5);
    mid.normalize().multiplyScalar(radius + 0.5); // Control point height
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end, radius]);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.01, 8, false), [curve]);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      // Simple drawing animation based on time and index
      const t = (state.clock.elapsedTime * 0.5 + index * 0.2) % 1;
      // You can implement dashed lines using shaders, but for simplicity here we just pulse opacity
      matRef.current.opacity = Math.max(0.1, Math.sin(t * Math.PI * 2) * 0.8);
    }
  });

  return (
    <mesh geometry={tubeGeo}>
      <meshBasicMaterial ref={matRef} color="#D4AF37" transparent opacity={0.6} depthWrite={false} />
    </mesh>
  );
}

function EarthGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const origin = DESTINATIONS.find(d => d.isOrigin)!;
  const originPos = latLonToVector3(origin.lat, origin.lon, radius);

  return (
    <group ref={groupRef}>
      {/* Base Ocean/Land Sphere */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color="#0A1A33" roughness={0.8} metalness={0.2} emissive="#050E1F" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Wireframe Grid */}
      <mesh>
        <sphereGeometry args={[radius + 0.01, 32, 32]} />
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Atmosphere Rim */}
      <mesh>
        <sphereGeometry args={[radius + 0.1, 64, 64]} />
        <meshBasicMaterial color="#5B8DEF" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      {/* Dots & Arcs */}
      {DESTINATIONS.map((dest, i) => (
        <DestinationDot key={dest.name} dest={dest} radius={radius + 0.02} />
      ))}
      {DESTINATIONS.filter(d => !d.isOrigin).map((dest, i) => {
        const destPos = latLonToVector3(dest.lat, dest.lon, radius);
        return <ArcLine key={`arc-${dest.name}`} start={originPos} end={destPos} radius={radius} index={i} />;
      })}
    </group>
  );
}

export default function HeroEarth() {
  return (
    <WebGLErrorBoundary>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#5B8DEF" />
        <Suspense fallback={null}>
          <EarthGroup />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}