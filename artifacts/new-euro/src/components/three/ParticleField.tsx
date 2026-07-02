import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

const vertexShader = `
attribute float aSize;
attribute float aOpacity;
attribute float aSpeed;
uniform float u_time;
varying float vOpacity;

void main() {
  vOpacity = aOpacity;
  vec3 pos = position;
  // Drift upward, wrap around
  pos.y = mod(pos.y + u_time * aSpeed * 0.08, 4.0) - 2.0;
  // Slight horizontal sway
  pos.x += sin(u_time * aSpeed * 0.3 + pos.z * 2.0) * 0.03;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying float vOpacity;
uniform float u_time;

void main() {
  // Soft circular point
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = smoothstep(0.5, 0.1, dist) * vOpacity;
  
  // Gold color with slight shimmer
  vec3 gold = vec3(0.831, 0.686, 0.216); // D4AF37
  vec3 goldLight = vec3(0.941, 0.761, 0.365); // E5C25D
  vec3 color = mix(gold, goldLight, smoothstep(0.3, 0.0, dist));
  
  gl_FragColor = vec4(color, alpha);
}
`;

const COUNT = 180;

function Particles({ layer, zOffset }: { layer: number; zOffset: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, opacities, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const opacities = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = zOffset + (Math.random() - 0.5) * 0.5;

      // Smaller particles on back layers (depth illusion)
      sizes[i] = (0.8 + Math.random() * 1.5) / (layer + 1);
      opacities[i] = (0.15 + Math.random() * 0.45) / (layer * 0.5 + 1);
      speeds[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions, sizes, opacities, speeds };
  }, [layer, zOffset]);

  const uniforms = useMemo(() => ({ u_time: { value: 0 } }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aOpacity" args={[opacities, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ParticleScene() {
  return (
    <>
      {/* 3 parallax layers at different depths */}
      <Particles layer={0} zOffset={0.5} />    {/* front — larger, brighter */}
      <Particles layer={1} zOffset={0} />       {/* mid */}
      <Particles layer={2} zOffset={-0.5} />   {/* back — smaller, dimmer */}
    </>
  );
}

export default function ParticleField({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <WebGLErrorBoundary fallback={<></>}>
        <Canvas
          camera={{ position: [0, 0, 2], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ParticleScene />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
