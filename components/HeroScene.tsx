
/// <reference types="@react-three/fiber" />
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Central 3D hero object ─── */
const HeroMesh: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.06;
    meshRef.current.rotation.y += delta * 0.10;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={2.1}>
        <torusKnotGeometry args={[1, 0.36, 220, 20]} />
        <MeshDistortMaterial
          color="#FF6B35"
          metalness={0.95}
          roughness={0.08}
          distort={0.18}
          speed={1.6}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
};

/* ─── Wireframe satellite shards ─── */
const Shard: React.FC<{
  position: [number, number, number];
  scale: number;
  spin: number;
  isDark: boolean;
}> = ({ position, scale, spin, isDark }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_s, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * spin;
    ref.current.rotation.y += delta * spin * 1.4;
  });
  return (
    <Float speed={1.2} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={isDark ? '#ffffff' : '#1a1a1a'}
          wireframe
          opacity={0.25}
          transparent
        />
      </mesh>
    </Float>
  );
};

/* ─── Particle field ─── */
const ParticleField: React.FC = () => {
  const COUNT = 2200;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 35;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 35;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_s, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#ffffff" opacity={0.35} transparent sizeAttenuation />
    </points>
  );
};

/* ─── Camera mouse parallax ─── */
const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_s, delta) => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ─── HTML overlay ─── */
interface OverlayProps { isDark: boolean }

const HeroOverlay: React.FC<OverlayProps> = ({ isDark }) => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef   = useRef<HTMLDivElement>(null);
  const ctaRef   = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(titleRef.current, {
      yPercent: 110,
      opacity: 0,
      duration: 1.3,
      ease: 'power4.out',
    })
    .from(subRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.5')
    .from(ctaRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4')
    .from(lineRef.current, {
      scaleY: 0,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    }, '-=0.6');
  }, { scope: wrapRef });

  const textC = isDark ? 'text-white' : 'text-black';
  const subC  = isDark ? 'text-white/45' : 'text-black/45';
  const btnBorderC = isDark ? 'border-white/25 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white';

  return (
    <div ref={wrapRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 select-none">

      {/* Main title */}
      <div className="overflow-hidden mb-5">
        <h1
          ref={titleRef}
          className={`text-[13vw] sm:text-[11vw] font-black tracking-tighter uppercase leading-none text-center ${textC}`}
        >
          FILMM<span style={{ color: '#FF6B35' }}>AI</span>KER
        </h1>
      </div>

      {/* Sub line */}
      <div ref={subRef} className="flex flex-col items-center gap-3 mb-10">
        <p
          className="uppercase tracking-[0.65em] text-[10px] font-black"
          style={{ color: '#FF6B35' }}
        >
          AI-Powered Creative Agency
        </p>
        <p className={`text-center max-w-lg text-sm font-medium leading-relaxed ${subC}`}>
          Brand Films · Advertising Campaigns · Generative AI · Visual Identity
        </p>
      </div>

      {/* CTAs */}
      <div ref={ctaRef} className="flex gap-4 pointer-events-auto flex-wrap justify-center">
        <a
          href="#portfolio"
          className="px-9 py-4 text-black font-black uppercase tracking-widest text-[10px] rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl"
          style={{ background: '#FF6B35', boxShadow: '0 20px 60px rgba(255,107,53,0.35)' }}
        >
          View Our Work
        </a>
        <a
          href="#contact"
          className={`px-9 py-4 font-black uppercase tracking-widest text-[10px] rounded-full border transition-all hover:scale-105 active:scale-95 ${btnBorderC}`}
        >
          Start a Project
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={lineRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ transformOrigin: 'top' }}
      >
        <span className={`text-[9px] uppercase tracking-[0.4em] font-black ${isDark ? 'text-white/30' : 'text-black/30'}`}>
          Scroll
        </span>
        <div
          className="w-px h-14"
          style={{ background: 'linear-gradient(to bottom, #FF6B35, transparent)' }}
        />
      </div>
    </div>
  );
};

/* ─── Main export ─── */
interface HeroSceneProps { isDark: boolean }

const HeroScene: React.FC<HeroSceneProps> = ({ isDark }) => {
  return (
    <section className={`relative w-full h-screen overflow-hidden ${isDark ? 'bg-[#050505]' : 'bg-[#f4f5f5]'}`}>

      {/* WebGL canvas */}
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={isDark ? 0.25 : 0.5} />
        <directionalLight color="#FF6B35" intensity={3.5} position={[5, 5, 5]} />
        <directionalLight color="#ffffff"  intensity={0.8} position={[-5, -3, 2]} />
        <pointLight       color="#FF9A6C" intensity={2.5} position={[0, 0, 3]} />

        {/* Scene */}
        <CameraRig />
        <HeroMesh isDark={isDark} />

        <Shard position={[-4.5,  2.2, -2]} scale={0.55} spin={0.035}  isDark={isDark} />
        <Shard position={[ 4.2, -1.5, -3]} scale={0.40} spin={-0.045} isDark={isDark} />
        <Shard position={[-3.0, -2.8, -1]} scale={0.28} spin={0.06}   isDark={isDark} />
        <Shard position={[ 3.5,  3.0, -4]} scale={0.32} spin={-0.03}  isDark={isDark} />

        <ParticleField />
        <Stars radius={80} depth={50} count={2500} factor={4} saturation={0} fade speed={0.5} />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={isDark ? 1.4 : 0.6}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0008, 0.0008)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette darkness={isDark ? 0.65 : 0.35} offset={0.2} />
        </EffectComposer>
      </Canvas>

      {/* HTML overlay */}
      <HeroOverlay isDark={isDark} />
    </section>
  );
};

export default HeroScene;
