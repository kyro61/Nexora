import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnvironmentProps {
  scrollProgress: number;
}

export const Environment: React.FC<EnvironmentProps> = ({ scrollProgress }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 80;

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sca = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical distribution around watch
      const radius = 1.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.0;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.sin(theta);

      sca[i] = 0.5 + Math.random() * 1.5;
    }

    return [pos, sca];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    const posAttr = particlesRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    // Slow organic micro-dust drift
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      array[i3 + 1] += delta * 0.04 * (i % 2 === 0 ? 1 : -0.7);
      array[i3] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.001;

      // Wrap around bounds
      if (array[i3 + 1] > 3) array[i3 + 1] = -3;
      if (array[i3 + 1] < -3) array[i3 + 1] = 3;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Floating Micro Dust Motes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-scale"
            args={[scales, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color={scrollProgress > 0.7 ? '#D4AF37' : '#D6D0C5'}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Subtle Studio Ground Shadow Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
};
