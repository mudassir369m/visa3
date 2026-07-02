import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Custom atmosphere shader — cyan rim glow
const atmVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const atmFragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
  intensity = clamp(intensity, 0.0, 1.0);
  vec3 atmColor = mix(vec3(0.357, 0.553, 0.937), vec3(0.153, 0.690, 1.0), intensity);
  gl_FragColor = vec4(atmColor, intensity * 0.85);
}
`;

function Atmosphere({ radius }: { radius: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius + 0.18, 64, 64]} />
      <shaderMaterial
        vertexShader={atmVertexShader}
        fragmentShader={atmFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function DestinationDot({ dest, radius }: { dest: typeof DESTINATIONS[0]; radius: number }) {
  const pos = latLonToVector3(dest.lat, dest.lon, radius + 0.02);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const outerRef2 = useRef<THREE.Mesh>(null);

  const color = dest.isOrigin ? '#D4AF37' : '#5B8DEF';
  const emissive = dest.isOrigin ? '#E5C25D' : '#7AAEFF';

  useFrame((state) => {
    const t = state.clock.elapsedTime * 2.5 + (dest.lat * 0.1 + dest.lon * 0.05);
    const pulse = 0.85 + Math.sin(t) * 0.4;
    if (innerRef.current) innerRef.current.scale.setScalar(pulse);
    if (outerRef.current) {
      const op = 0.3 + Math.sin(t * 0.8) * 0.2;
      (outerRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0.05, op);
      outerRef.current.scale.setScalar(1 + (1 - pulse) * 0.8);
    }
    if (outerRef2.current) {
      const op2 = 0.15 + Math.sin(t * 0.6 + 1) * 0.1;
      (outerRef2.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0.02, op2);
      outerRef2.current.scale.setScalar(1.5 + (1 - pulse) * 1.2);
    }
  });

  return (
    <group position={pos}>
      {/* Core dot */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[dest.isOrigin ? 0.055 : 0.04, 16, 16]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={2.0} />
      </mesh>
      {/* Inner halo */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[dest.isOrigin ? 0.1 : 0.075, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Outer halo */}
      <mesh ref={outerRef2}>
        <sphereGeometry args={[dest.isOrigin ? 0.16 : 0.12, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// Arc with progressive draw animation
function ArcLine({ start, end, radius, index }: { start: THREE.Vector3; end: THREE.Vector3; radius: number; index: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const curve = useMemo(() => {
    const mid = start.clone().lerp(end, 0.5);
    mid.normalize().multiplyScalar(radius + 0.55 + index * 0.05);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end, radius, index]);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.008, 6, false), [curve]);

  // Arc draw shader — draws tube from start to end via t uniform
  const arcVertShader = `
    attribute float aT; // 0→1 along tube
    uniform float u_progress;
    uniform float u_time;
    varying float vT;
    varying float vOpacity;
    void main() {
      vT = aT;
      // Only show vertices where aT <= progress
      float visible = step(aT, u_progress);
      vOpacity = visible;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const arcFragShader = `
    varying float vT;
    varying float vOpacity;
    uniform float u_time;
    void main() {
      if (vOpacity < 0.5) discard;
      // Fade to tip
      float alpha = (1.0 - vT * 0.5) * 0.8;
      // Gold with slight shimmer
      vec3 gold = vec3(0.831, 0.686, 0.216);
      vec3 bright = vec3(0.94, 0.80, 0.42);
      float shimmer = 0.8 + 0.2 * sin(u_time * 3.0 + vT * 6.28);
      vec3 color = mix(gold, bright, shimmer * 0.3);
      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Compute per-vertex T values
  const tAttr = useMemo(() => {
    const positions = (tubeGeo.attributes.position as THREE.BufferAttribute).array;
    const count = positions.length / 3;
    const segments = 80;
    const radialSegments = 6;
    const vertsPerRing = radialSegments + 1;
    const t = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Which segment ring is this vertex in?
      const ring = Math.floor(i / vertsPerRing);
      t[i] = ring / segments;
    }
    return t;
  }, [tubeGeo]);

  const uniforms = useMemo(() => ({
    u_progress: { value: 0 },
    u_time: { value: 0 },
  }), []);

  useFrame((state) => {
    if (!matRef.current) return;
    const elapsed = state.clock.elapsedTime;
    matRef.current.uniforms.u_time.value = elapsed;

    // Staggered draw: each arc starts at a different time, loops every 8s
    const delay = index * 1.0;
    const period = 8.0;
    const t = ((elapsed - delay) % period) / (period * 0.4); // draw in 40% of period
    matRef.current.uniforms.u_progress.value = Math.max(0, Math.min(1, t));
  });

  return (
    <mesh geometry={tubeGeo}>
      <bufferAttribute attach="attributes-aT" args={[tAttr, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={arcVertShader}
        fragmentShader={arcFragShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function OrbitalRing({ radius }: { radius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[radius + 0.55, 0.008, 8, 120]} />
      <meshStandardMaterial
        color="#D4AF37"
        emissive="#E5C25D"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

// Earth surface using custom shader to mimic land/ocean without textures
const earthVertShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const earthFragShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPos;
uniform float u_time;

// Simple pseudo noise for land/ocean texture
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Ocean base — deep blue
  vec3 ocean = vec3(0.04, 0.10, 0.22);
  // Land — muted teal/green
  vec3 land = vec3(0.06, 0.18, 0.16);
  // Ice caps
  vec3 ice = vec3(0.65, 0.75, 0.82);

  float lat = vUv.y;
  float lon = vUv.x;

  // Land coverage using fbm noise
  float landMask = fbm(vec2(lon * 4.0, lat * 4.0) + 0.5);
  landMask = smoothstep(0.47, 0.55, landMask);

  // Ice caps at poles
  float pole = smoothstep(0.08, 0.0, abs(lat - 0.5) - 0.38);

  vec3 color = mix(ocean, land, landMask);
  color = mix(color, ice, pole);

  // Lighting
  vec3 lightDir = normalize(vec3(0.8, 0.5, 1.0));
  float diff = max(dot(vNormal, lightDir), 0.0);
  float ambient = 0.25;
  color *= (ambient + diff * 0.75);

  // Specular on ocean
  vec3 viewDir = normalize(-vPos);
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(vNormal, halfDir), 0.0), 60.0) * (1.0 - landMask) * 0.4;
  color += vec3(spec * 0.3, spec * 0.5, spec);

  gl_FragColor = vec4(color, 1.0);
}
`;

function EarthSurface({ radius }: { radius: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ u_time: { value: 0 } }), []);
  useFrame((s) => {
    if (matRef.current) matRef.current.uniforms.u_time.value = s.clock.elapsedTime;
  });
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={earthVertShader}
        fragmentShader={earthFragShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// Subtle grid overlay
function EarthGrid({ radius }: { radius: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius + 0.005, 36, 36]} />
      <meshBasicMaterial color="#5B8DEF" wireframe transparent opacity={0.04} depthWrite={false} />
    </mesh>
  );
}

function EarthGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0018;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.04;
    }
  });

  const origin = DESTINATIONS.find((d) => d.isOrigin)!;
  const originPos = latLonToVector3(origin.lat, origin.lon, radius);

  return (
    <group ref={groupRef}>
      <EarthSurface radius={radius} />
      <EarthGrid radius={radius} />
      <Atmosphere radius={radius} />
      <OrbitalRing radius={radius} />
      {DESTINATIONS.map((dest) => (
        <DestinationDot key={dest.name} dest={dest} radius={radius} />
      ))}
      {DESTINATIONS.filter((d) => !d.isOrigin).map((dest, i) => {
        const destPos = latLonToVector3(dest.lat, dest.lon, radius);
        return (
          <ArcLine key={`arc-${dest.name}`} start={originPos} end={destPos} radius={radius} index={i} />
        );
      })}
    </group>
  );
}

export default function HeroEarth() {
  return (
    <WebGLErrorBoundary>
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 42 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <ambientLight intensity={0.3} color="#1A3060" />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-6, -2, -4]} intensity={0.6} color="#5B8DEF" />
        <pointLight position={[0, 4, 3]} intensity={1} color="#D4AF37" distance={12} />
        <Suspense fallback={null}>
          <EarthGroup />
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.6}
              radius={0.7}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
