import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

// Country flag color presets
const FLAG_COLORS: Record<string, { primary: string; secondary: string; tertiary?: string }> = {
  uk: { primary: '#012169', secondary: '#C8102E', tertiary: '#FFFFFF' },
  usa: { primary: '#B22234', secondary: '#FFFFFF', tertiary: '#3C3B6E' },
  canada: { primary: '#FF0000', secondary: '#FFFFFF' },
  australia: { primary: '#00008B', secondary: '#FFFFFF', tertiary: '#FF0000' },
  turkey: { primary: '#E30A17', secondary: '#FFFFFF' },
  schengen: { primary: '#003399', secondary: '#FFCC00' },
};

const vertexShader = `
uniform float u_time;
uniform float u_waveSpeed;
uniform float u_waveAmp;
varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Wave displacement: more at right edge, zero at left (pole)
  float wave = sin(pos.x * 3.5 + u_time * u_waveSpeed) * u_waveAmp * pos.x;
  wave += sin(pos.x * 5.0 + u_time * u_waveSpeed * 1.3 + pos.y * 2.0) * u_waveAmp * 0.4 * pos.x;
  pos.z += wave;
  vWave = wave;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform float u_time;
varying vec2 vUv;
varying float vWave;

void main() {
  vec2 uv = vUv;
  
  // Build flag color based on horizontal stripes (simplified for all flags)
  vec3 color;
  float stripe = floor(uv.y * 3.0) / 3.0;
  
  if (uv.y < 0.33) {
    color = u_color1;
  } else if (uv.y < 0.67) {
    color = u_color2;
  } else {
    color = u_color3;
  }
  
  // Lighting based on wave (simulate sun reflection)
  float light = 0.7 + 0.3 * (vWave * 3.0 + 0.5);
  color *= light;
  
  // Slight vignette at edges
  float vignette = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
  vignette *= smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
  color *= mix(0.4, 1.0, vignette);
  
  gl_FragColor = vec4(color, 0.95);
}
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new THREE.Vector3(r, g, b);
}

function FlagMesh({ country, waveSpeed = 1.8 }: { country: string; waveSpeed?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const colors = FLAG_COLORS[country] ?? FLAG_COLORS.uk;

  const c1 = hexToVec3(colors.primary);
  const c2 = hexToVec3(colors.secondary);
  const c3 = hexToVec3(colors.tertiary ?? colors.primary);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_waveSpeed: { value: waveSpeed },
    u_waveAmp: { value: 0.08 },
    u_color1: { value: c1 },
    u_color2: { value: c2 },
    u_color3: { value: c3 },
  }), []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      matRef.current.uniforms.u_waveSpeed.value = waveSpeed;
    }
  });

  return (
    <mesh position={[0.5, 0, 0]}>
      <planeGeometry args={[1, 0.67, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Flagpole() {
  return (
    <mesh position={[-0.02, 0, 0]}>
      <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

interface WavingFlagProps {
  country: string;
  className?: string;
  waveSpeed?: number; // higher = faster wave
}

export default function WavingFlag({ country, className = '', waveSpeed = 1.8 }: WavingFlagProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <WebGLErrorBoundary fallback={
        <div className="w-full h-full flex items-center justify-center text-4xl">
          {country === 'uk' ? '🇬🇧' : country === 'usa' ? '🇺🇸' : country === 'canada' ? '🇨🇦' : country === 'australia' ? '🇦🇺' : country === 'turkey' ? '🇹🇷' : '🇪🇺'}
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 1.8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <Flagpole />
          <FlagMesh country={country} waveSpeed={waveSpeed} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
