import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex items-center bg-background overflow-hidden">
      {/* Mesh gradient background approximation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
      
      <div className="container relative z-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-8">
          <p className="text-primary font-semibold tracking-widest uppercase">Premium Visa Services</p>
          <h1 className="text-6xl lg:text-8xl font-display font-bold leading-tight">
            A Step Before <span className="gold-gradient-text">Embassy.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg">
            18 years of trusted excellence in helping Pakistani clients reach their global destinations securely and efficiently.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gold-gradient-bg text-primary-foreground font-semibold border-none rounded-none px-8">
              Start Application
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-none px-8">
              <Link href="/eligibility-check">Check Eligibility</Link>
            </Button>
          </div>
        </div>
        
        <div className="h-[600px] w-full relative">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-primary">Loading 3D Earth...</div>}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial color="#1E3A5F" wireframe emissive="#050E1F" emissiveIntensity={0.5} />
              </Sphere>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              <Environment preset="night" />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
