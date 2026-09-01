import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Gears } from './Gears';

interface MovementProps {
  metalColor?: string;
  rotorColor?: string;
  disassemblyFactor?: number;
  isLuminescentMode?: boolean;
}

// Synthetic Corundum Ruby Jewel in Gold Chaton
const RubyJewel: React.FC<{
  position: [number, number, number];
  size?: number;
  isLuminescent?: boolean;
}> = ({ position, size = 0.045, isLuminescent = false }) => {
  const rubyMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: isLuminescent ? '#00FFCC' : '#C71585',
      emissive: isLuminescent ? '#00FFCC' : '#4A002A',
      emissiveIntensity: isLuminescent ? 0.8 : 0.25,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.77,
      thickness: 0.05,
      transparent: true,
      opacity: 0.95
    });
  }, [isLuminescent]);

  const chatonMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      metalness: 0.95,
      roughness: 0.15
    });
  }, []);

  return (
    <group position={position}>
      {/* 18k Gold Chaton Setting */}
      <mesh material={chatonMat}>
        <cylinderGeometry args={[size * 1.5, size * 1.5, 0.015, 20]} />
      </mesh>
      {/* Precision Synthetic Ruby Jewel */}
      <mesh position={[0, 0, 0.008]} material={rubyMat}>
        <cylinderGeometry args={[size, size, 0.018, 20]} />
      </mesh>
    </group>
  );
};

// Blued Steel Screw (Heat-Treated at 290°C)
const BluedScrew: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const screwMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1A3B6B',
      metalness: 0.92,
      roughness: 0.18
    });
  }, []);

  return (
    <group position={position}>
      <mesh material={screwMat}>
        <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
      </mesh>
      {/* Screw slot */}
      <mesh position={[0, 0, 0.008]}>
        <boxGeometry args={[0.055, 0.01, 0.004]} />
        <meshBasicMaterial color="#0A182E" />
      </mesh>
    </group>
  );
};

export const Movement: React.FC<MovementProps> = ({
  metalColor = '#D4AF37',
  rotorColor = '#BFA068',
  disassemblyFactor = 0,
  isLuminescentMode = false
}) => {
  const balanceWheelRef = useRef<THREE.Group>(null);
  const hairspringRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);
  const gearTrainRef = useRef<THREE.Group>(null);

  // Archimedean Spiral Hairspring Geometry
  const hairspringGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 8;
    const count = 300;
    const maxRadius = 0.22;

    for (let i = 0; i <= count; i++) {
      const theta = (i / count) * turns * Math.PI * 2;
      const r = 0.02 + (i / count) * (maxRadius - 0.02);
      points.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Continuous Horological Kinematics in R3F Frame Loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 4Hz (28,800 vph) Glucydur balance wheel harmonic oscillation
    if (balanceWheelRef.current) {
      const oscillationFreq = 4.0 * Math.PI * 2;
      const amplitude = 1.35; // ~270 degree oscillation amplitude
      balanceWheelRef.current.rotation.z = Math.sin(time * oscillationFreq) * amplitude;
    }

    // Breathing spiral hairspring expansion and contraction
    if (hairspringRef.current) {
      const breathe = 1.0 + Math.sin(time * 8.0 * Math.PI) * 0.06;
      hairspringRef.current.scale.set(breathe, breathe, 1);
    }

    // Bi-directional Tungsten Rotor inertial rotation
    if (rotorRef.current) {
      rotorRef.current.rotation.z += delta * 0.45;
    }

    // Gear train kinematics
    if (gearTrainRef.current) {
      gearTrainRef.current.rotation.z += delta * 0.05;
    }
  });

  const materials = useMemo(() => {
    return {
      mainplate: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#07242B' : '#C8CED6',
        metalness: 0.88,
        roughness: 0.28
      }),
      bridgeRhodium: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#09363F' : '#DCE3EB',
        metalness: 0.92,
        roughness: 0.22
      }),
      balanceGlucydur: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#00FFCC' : '#D8A030',
        metalness: 0.95,
        roughness: 0.15,
        emissive: isLuminescentMode ? '#004433' : '#000000',
        emissiveIntensity: isLuminescentMode ? 0.4 : 0
      }),
      rotorTungsten: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#0A404D' : rotorColor,
        metalness: 0.94,
        roughness: 0.25
      }),
      rotorGoldEdge: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 0.96,
        roughness: 0.12
      })
    };
  }, [rotorColor, isLuminescentMode]);

  // Exploded disassembly Z-offsets
  const plateZ = -0.05 * disassemblyFactor;
  const bridgesZ = 0.12 * disassemblyFactor;
  const balanceZ = 0.28 * disassemblyFactor;
  const rotorZ = -0.32 * disassemblyFactor;

  return (
    <group name="CalibreNX901">
      {/* 01: Mainplate (Circular Grained Perlage Base) */}
      <group position={[0, 0, plateZ]}>
        <mesh material={materials.mainplate} castShadow receiveShadow>
          <cylinderGeometry args={[0.96, 0.96, 0.04, 64]} />
        </mesh>

        {/* Jewels on Mainplate */}
        <RubyJewel position={[0.42, 0.38, 0.022]} isLuminescent={isLuminescentMode} />
        <RubyJewel position={[0, 0, 0.022]} isLuminescent={isLuminescentMode} />
        <RubyJewel position={[-0.26, 0.22, 0.022]} isLuminescent={isLuminescentMode} />
        <RubyJewel position={[-0.24, -0.16, 0.022]} isLuminescent={isLuminescentMode} />
        <RubyJewel position={[0.02, -0.34, 0.022]} isLuminescent={isLuminescentMode} />

        {/* Mainplate Blued Assembly Screws */}
        <BluedScrew position={[0.68, 0.48, 0.022]} />
        <BluedScrew position={[-0.68, 0.48, 0.022]} />
        <BluedScrew position={[-0.55, -0.62, 0.022]} />
      </group>

      {/* 02: Kinematic Gear Train */}
      <group position={[0, 0, bridgesZ * 0.5]}>
        <Gears metalColor={metalColor} isLuminescentMode={isLuminescentMode} />
      </group>

      {/* 03: Three-Quarter Barrel & Train Bridge (Côtes de Genève) */}
      <group position={[0, 0, 0.05 + bridgesZ]}>
        {/* Barrel Bridge */}
        <mesh position={[0.24, 0.28, 0]} material={materials.bridgeRhodium} castShadow receiveShadow>
          <cylinderGeometry args={[0.62, 0.62, 0.035, 48, 1, false, 0, Math.PI * 1.1]} />
        </mesh>
        {/* Gear Train Bridge */}
        <mesh position={[-0.2, 0.08, 0.005]} material={materials.bridgeRhodium} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.03, 36, 1, false, Math.PI * 0.8, Math.PI * 0.95]} />
        </mesh>

        {/* Bridge Jewels & Screws */}
        <RubyJewel position={[0.42, 0.38, 0.02]} isLuminescent={isLuminescentMode} />
        <RubyJewel position={[-0.26, 0.22, 0.02]} isLuminescent={isLuminescentMode} />
        <RubyJewel position={[-0.24, -0.16, 0.02]} isLuminescent={isLuminescentMode} />
        <BluedScrew position={[0.18, 0.72, 0.02]} />
        <BluedScrew position={[-0.48, 0.32, 0.02]} />
        <BluedScrew position={[0.64, 0.12, 0.02]} />
      </group>

      {/* 04: Regulating Organ: Glucydur Balance Wheel & Hairspring */}
      <group position={[0.22, -0.38, 0.07 + balanceZ]}>
        {/* Balance Cock (Bridge) */}
        <mesh position={[-0.04, 0.14, 0.04]} material={materials.bridgeRhodium} castShadow>
          <boxGeometry args={[0.24, 0.42, 0.028]} />
        </mesh>
        <RubyJewel position={[0, 0, 0.045]} size={0.055} isLuminescent={isLuminescentMode} />
        <BluedScrew position={[-0.1, 0.28, 0.045]} />

        {/* Oscillating Balance Wheel Group */}
        <group ref={balanceWheelRef}>
          {/* Glucydur Rim */}
          <mesh material={materials.balanceGlucydur} castShadow>
            <torusGeometry args={[0.26, 0.016, 16, 48]} />
          </mesh>
          {/* 3 Curved Spokes */}
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
            <mesh key={idx} rotation={[0, 0, angle]} material={materials.balanceGlucydur}>
              <boxGeometry args={[0.26, 0.02, 0.012]} />
            </mesh>
          ))}
          {/* 16 Peripheral Gold Timing Micro-Screws */}
          {Array.from({ length: 16 }).map((_, sIdx) => {
            const angle = (sIdx / 16) * Math.PI * 2;
            const x = Math.cos(angle) * 0.27;
            const y = Math.sin(angle) * 0.27;
            return (
              <mesh key={sIdx} position={[x, y, 0]} material={materials.rotorGoldEdge}>
                <cylinderGeometry args={[0.014, 0.014, 0.025, 8]} />
              </mesh>
            );
          })}
        </group>

        {/* Breathing Spiral Hairspring */}
        <group ref={hairspringRef} position={[0, 0, -0.008]}>
          <lineSegments geometry={hairspringGeometry}>
            <lineBasicMaterial
              color={isLuminescentMode ? '#00FFCC' : '#5F85A8'}
              linewidth={1.5}
            />
          </lineSegments>
        </group>
      </group>

      {/* 05: Bi-Directional Winding Rotor (Exhibition Side) */}
      <group position={[0, 0, -0.07 + rotorZ]}>
        <group ref={rotorRef}>
          {/* Semi-Circular Heavy Tungsten Weight */}
          <mesh material={materials.rotorTungsten} castShadow>
            <cylinderGeometry args={[0.94, 0.94, 0.035, 48, 1, false, 0, Math.PI]} />
          </mesh>
          {/* Outer 22k Gold Heavy Segment */}
          <mesh material={materials.rotorGoldEdge} castShadow>
            <cylinderGeometry args={[0.94, 0.94, 0.038, 48, 1, false, 0.1, Math.PI - 0.2]} />
          </mesh>
          {/* Central Ball Bearing Arbor */}
          <mesh material={materials.bridgeRhodium}>
            <cylinderGeometry args={[0.22, 0.22, 0.045, 32]} />
          </mesh>
          <RubyJewel position={[0, 0, 0.024]} size={0.06} isLuminescent={isLuminescentMode} />
        </group>
      </group>
    </group>
  );
};
