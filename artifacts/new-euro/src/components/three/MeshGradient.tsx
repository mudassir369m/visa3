import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  float noise1 = snoise(uv * 1.5 + u_time * 0.1);
  float noise2 = snoise(uv * 2.5 - u_time * 0.15);
  float noise3 = snoise(uv * 1.0 + vec2(noise1, noise2) + u_time * 0.05);

  vec3 col1 = vec3(0.357, 0.553, 0.937); // aurora-1 (#5B8DEF)
  vec3 col2 = vec3(0.655, 0.545, 0.980); // aurora-2 (#A78BFA)
  vec3 col3 = vec3(0.831, 0.686, 0.216); // gold-500 (#D4AF37)
  vec3 bg   = vec3(0.020, 0.055, 0.122); // dark primary

  vec3 color = mix(bg, col1, noise1 * 0.5 + 0.5);
  color = mix(color, col2, noise2 * 0.4 + 0.4);
  color = mix(color, col3, noise3 * 0.3 + 0.3);

  gl_FragColor = vec4(color, 1.0);
}
`;

function GradientMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
  }), []);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function MeshGradient() {
  return (
    <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
      <WebGLErrorBoundary fallback={<></>}>
        <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
          <GradientMesh />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}