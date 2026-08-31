import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WatchModelSpec } from '../types';

interface WatchMovementProps {
  model: WatchModelSpec;
  disassemblyProgress: number;
  isLuminescentMode?: boolean;
}

export const WatchMovement: React.FC<WatchMovementProps> = ({
  model,
  disassemblyProgress,
  isLuminescentMode = false
}) => {
  const balanceWheelRef = useRef<THREE.Group>(null);
  const hairspringRef = useRef<THREE.Group>(null);
  const escapeWheelRef = useRef<THREE.Group>(null);
  const fourthWheelRef = useRef<THREE.Group>(null);
  const thirdWheelRef = useRef<THREE.Group>(null);
  const centerWheelRef = useRef<THREE.Group>(null);
  const barrelRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);

  // Mechanical Materials
  const materials = useMemo(() => {
    return {
      brassGold: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 0.95,
        roughness: 0.18,
        name: 'brassGold'
      }),
      rhodiumBridge: new THREE.MeshStandardMaterial({
        color: '#E2E6E9',
        metalness: 0.92,
        roughness: 0.25,
        name: 'rhodiumBridge'
      }),
      bluedSteelScrew: new THREE.MeshStandardMaterial({
        color: '#1A428A',
        metalness: 0.9,
        roughness: 0.15,
        name: 'bluedSteel'
      }),
      syntheticRuby: new THREE.MeshPhysicalMaterial({
        color: '#E0115F',
        emissive: '#5A001D',
        emissiveIntensity: 0.2,
        transmission: 0.85,
        opacity: 1,
        transparent: true,
        roughness: 0.05,
        ior: 1.77,
        name: 'syntheticRuby'
      }),
      tungstenRotor: new THREE.MeshStandardMaterial({
        color: model.rotorColor || '#B08D57',
        metalness: 0.92,
        roughness: 0.2,
        name: 'tungstenRotor'
      }),
      goldRotorWeight: new THREE.MeshStandardMaterial({
        color: '#E5C158',
        metalness: 0.96,
        roughness: 0.12,
        name: 'goldRotorWeight'
      }),
      steelGear: new THREE.MeshStandardMaterial({
        color: '#DCDFE3',
        metalness: 0.96,
        roughness: 0.22,
        name: 'steelGear'
      })
    };
  }, [model]);

  // Procedural Archimedean spiral for Hairspring
  const hairspringGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const coils = 5.5;
    const segments = 180;
    const a = 0.02; // inner radius
    const b = 0.025; // pitch

    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * (Math.PI * 2 * coils);
      const r = a + b * theta;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      points.push(new THREE.Vector3(x, y, 0));
      if (i > 0 && i < segments - 1) {
        points.push(new THREE.Vector3(x, y, 0)); // duplicate for line segments
      }
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, []);

  // Gear Geometry Generators
  const makeGearGeometry = (radius: number, teeth: number, depth = 0.03, innerHole = 0.04) => {
    const shape = new THREE.Shape();
    const toothAngle = (Math.PI * 2) / teeth;
    const toothHalf = toothAngle * 0.25;

    for (let i = 0; i < teeth; i++) {
      const angle = i * toothAngle;
      const rOuter = radius;
      const rInner = radius * 0.88;

      const a1 = angle - toothHalf;
      const a2 = angle - toothHalf * 0.5;
      const a3 = angle + toothHalf * 0.5;
      const a4 = angle + toothHalf;

      if (i === 0) {
        shape.moveTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
      } else {
        shape.lineTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
      }
      shape.lineTo(Math.cos(a2) * rOuter, Math.sin(a2) * rOuter);
      shape.lineTo(Math.cos(a3) * rOuter, Math.sin(a3) * rOuter);
      shape.lineTo(Math.cos(a4) * rInner, Math.sin(a4) * rInner);
    }
    shape.closePath();

    // Center pivot hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerHole, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    // Skeletonized spoke cutouts
    if (radius > 0.2) {
      const spokes = 4;
      for (let s = 0; s < spokes; s++) {
        const spokeAngle = (s * (Math.PI * 2)) / spokes;
        const spokeCutout = new THREE.Path();
        const rIn = innerHole + 0.04;
        const rOut = radius * 0.72;
        const arcSpread = (Math.PI * 2) / spokes * 0.6;
        const startA = spokeAngle - arcSpread / 2;
        const endA = spokeAngle + arcSpread / 2;

        spokeCutout.absarc(0, 0, rOut, startA, endA, false);
        spokeCutout.absarc(0, 0, rIn, endA, startA, true);
        spokeCutout.closePath();
        shape.holes.push(spokeCutout);
      }
    }

    return new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.005,
      bevelThickness: 0.005
    });
  };

  const barrelGeom = useMemo(() => makeGearGeometry(0.48, 36, 0.08, 0.06), []);
  const centerGeom = useMemo(() => makeGearGeometry(0.36, 28, 0.04, 0.04), []);
  const thirdGeom = useMemo(() => makeGearGeometry(0.28, 24, 0.03, 0.03), []);
  const fourthGeom = useMemo(() => makeGearGeometry(0.22, 20, 0.03, 0.03), []);
  const escapeGeom = useMemo(() => makeGearGeometry(0.18, 15, 0.025, 0.02), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // 1. Balance wheel oscillation (4Hz frequency = 28,800 vph, amplitude 280-300 deg)
    if (balanceWheelRef.current) {
      const oscAngle = Math.sin(t * (Math.PI * 2 * 4)) * (Math.PI * 0.85);
      balanceWheelRef.current.rotation.z = oscAngle;
    }

    // 2. Hairspring breathing (dynamic scale matching balance oscillation)
    if (hairspringRef.current) {
      const breath = 1.0 + Math.sin(t * (Math.PI * 2 * 4)) * 0.08;
      hairspringRef.current.scale.set(breath, breath, 1);
    }

    // 3. Escapement & Gear Train smooth mechanical stepping/rotation
    // 4th wheel (seconds): 1 revolution per 60s
    if (fourthWheelRef.current) {
      fourthWheelRef.current.rotation.z = t * (Math.PI * 2 / 60) * 4; // visible horology speed
    }
    // Escape wheel: spins fast with escapement pulse
    if (escapeWheelRef.current) {
      escapeWheelRef.current.rotation.z = -t * (Math.PI * 2 / 7.5);
    }
    // 3rd wheel: opposite rotation
    if (thirdWheelRef.current) {
      thirdWheelRef.current.rotation.z = -t * (Math.PI * 2 / 120);
    }
    // Center wheel: slow drive
    if (centerWheelRef.current) {
      centerWheelRef.current.rotation.z = t * (Math.PI * 2 / 300);
    }
    // Mainspring barrel: subtle torque drive
    if (barrelRef.current) {
      barrelRef.current.rotation.z = -t * (Math.PI * 2 / 600);
    }

    // 4. Oscillating Rotor inertial response
    if (rotorRef.current) {
      const wobble = Math.sin(t * 1.5) * 0.4 + Math.cos(t * 0.8) * 0.2;
      rotorRef.current.rotation.z = wobble;
    }
  });

  // Disassembly offsets (Smooth Exploded View Physics)
  const d = disassemblyProgress; // 0 to 1
  const bridgeOffsetZ = d * 0.45;
  const gearOffsetZ = d * 0.25;
  const rotorOffsetZ = -d * 0.55;
  const balanceOffsetZ = d * 0.65;
  const screwOffsetZ = d * 0.85;

  return (
    <group position={[0, 0, 0]} name="MovementCalibre">
      {/* 1. Main Base Plate (Perlage finish, rhodium plated) */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]} material={materials.rhodiumBridge} receiveShadow castShadow>
          <cylinderGeometry args={[1.05, 1.05, 0.08, 64]} />
        </mesh>

        {/* Circular Perlage pattern rings */}
        {[0.3, 0.55, 0.8, 0.95].map((rad, idx) => (
          <mesh key={idx} position={[0, 0, 0.042]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[rad - 0.02, rad + 0.02, 48]} />
            <meshStandardMaterial
              color="#CCD3D9"
              metalness={0.88}
              roughness={0.4}
              wireframe={false}
            />
          </mesh>
        ))}
      </group>

      {/* 2. Gear Train (Mainspring barrel, Center wheel, 3rd, 4th, Escapement) */}
      <group position={[0, 0, 0.06 + gearOffsetZ]}>
        {/* Mainspring Barrel (Top Right) */}
        <group ref={barrelRef} position={[0.42, 0.38, 0]}>
          <mesh geometry={barrelGeom} material={materials.brassGold} castShadow receiveShadow />
          {/* Central Arbor & Ratchet Cap */}
          <mesh position={[0, 0, 0.045]} material={materials.steelGear}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 24]} />
          </mesh>
        </group>

        {/* Center Wheel (Middle) */}
        <group ref={centerWheelRef} position={[0, 0, 0.02]}>
          <mesh geometry={centerGeom} material={materials.brassGold} castShadow />
        </group>

        {/* Third Wheel */}
        <group ref={thirdWheelRef} position={[-0.28, 0.18, 0.035]}>
          <mesh geometry={thirdGeom} material={materials.brassGold} castShadow />
        </group>

        {/* Fourth Wheel (Seconds Wheel) */}
        <group ref={fourthWheelRef} position={[-0.32, -0.22, 0.05]}>
          <mesh geometry={fourthGeom} material={materials.brassGold} castShadow />
        </group>

        {/* Escapement Wheel (Steel / Silicon) */}
        <group ref={escapeWheelRef} position={[-0.12, -0.48, 0.065]}>
          <mesh geometry={escapeGeom} material={materials.steelGear} castShadow />
        </group>
      </group>

      {/* 3. Train Wheel Bridge (Côtes de Genève Rhodium Bridge with Anglage) */}
      <group position={[0, 0, 0.12 + bridgeOffsetZ]}>
        {/* Sculpted Bridge Plate */}
        <mesh position={[0.15, 0.2, 0]} material={materials.rhodiumBridge} castShadow>
          <boxGeometry args={[0.75, 0.65, 0.05]} />
        </mesh>
        <mesh position={[-0.25, -0.15, 0]} material={materials.rhodiumBridge} castShadow>
          <boxGeometry args={[0.55, 0.65, 0.05]} />
        </mesh>

        {/* Synthetic Ruby Jewel Bearings embedded in gold chatons */}
        {[
          { pos: [0.42, 0.38, 0.028] as [number, number, number] },
          { pos: [0, 0, 0.028] as [number, number, number] },
          { pos: [-0.28, 0.18, 0.028] as [number, number, number] },
          { pos: [-0.32, -0.22, 0.028] as [number, number, number] },
          { pos: [-0.12, -0.48, 0.028] as [number, number, number] }
        ].map((jewel, i) => (
          <group key={i} position={jewel.pos}>
            {/* 18k Gold Chaton ring */}
            <mesh material={materials.brassGold}>
              <cylinderGeometry args={[0.045, 0.045, 0.015, 20]} />
            </mesh>
            {/* Synthetic Corundum Ruby Cup */}
            <mesh position={[0, 0, 0.005]} material={materials.syntheticRuby}>
              <cylinderGeometry args={[0.03, 0.03, 0.018, 16]} />
            </mesh>
          </group>
        ))}

        {/* Blued Steel Bridge Screws */}
        {[
          [0.48, -0.05, 0.03] as [number, number, number],
          [-0.45, 0.15, 0.03] as [number, number, number],
          [0.15, 0.52, 0.03] as [number, number, number],
          [-0.1, -0.38, 0.03] as [number, number, number]
        ].map((screwPos, i) => (
          <group key={`screw-${i}`} position={[screwPos[0], screwPos[1], screwPos[2] + (d > 0.4 ? screwOffsetZ : 0)]}>
            <mesh material={materials.bluedSteelScrew}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
            </mesh>
            {/* Screw driver slot */}
            <mesh position={[0, 0, 0.011]}>
              <boxGeometry args={[0.055, 0.01, 0.005]} />
              <meshBasicMaterial color="#0b1a38" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 4. Balance Assembly & Hairspring Cock (The Beating Heart) */}
      <group position={[0.22, -0.38, 0.14 + balanceOffsetZ]}>
        {/* Balance Cock Bridge */}
        <mesh position={[0.08, 0.08, 0.02]} material={materials.rhodiumBridge} castShadow>
          <boxGeometry args={[0.35, 0.28, 0.04]} />
        </mesh>

        {/* Central Incabloc Shock-Protection Ruby Jewel */}
        <mesh position={[0, 0, 0.045]} material={materials.syntheticRuby}>
          <cylinderGeometry args={[0.038, 0.038, 0.02, 20]} />
        </mesh>
        <mesh position={[0, 0, 0.042]} material={materials.brassGold}>
          <ringGeometry args={[0.038, 0.055, 20]} />
        </mesh>

        {/* Glucydur 3-Spoke Balance Wheel */}
        <group ref={balanceWheelRef} position={[0, 0, -0.02]}>
          {/* Gold Balance Rim */}
          <mesh material={materials.brassGold}>
            <torusGeometry args={[0.26, 0.018, 16, 48]} />
          </mesh>

          {/* 3 Glucydur Balance Spokes */}
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, sIdx) => (
            <mesh key={sIdx} rotation={[0, 0, angle]} position={[0, 0, 0]} material={materials.brassGold}>
              <boxGeometry args={[0.26, 0.018, 0.015]} />
            </mesh>
          ))}

          {/* Poising micro-screws around the rim */}
          {[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.14, 3.64, 4.14, 4.64, 5.14, 5.64].map((rad, pIdx) => (
            <mesh
              key={pIdx}
              position={[Math.cos(rad) * 0.26, Math.sin(rad) * 0.26, 0]}
              material={materials.bluedSteelScrew}
            >
              <cylinderGeometry args={[0.012, 0.012, 0.02, 10]} />
            </mesh>
          ))}
        </group>

        {/* Breathing Spiral Hairspring */}
        <group ref={hairspringRef} position={[0, 0, -0.005]}>
          <lineSegments geometry={hairspringGeometry}>
            <lineBasicMaterial color={isLuminescentMode ? '#00FFCC' : '#5F85A8'} linewidth={1.5} />
          </lineSegments>
        </group>
      </group>

      {/* 5. Automatic Winding Skeleton Rotor (Backside) */}
      <group position={[0, 0, -0.12 + rotorOffsetZ]} ref={rotorRef}>
        {/* Rotor Central Ball-Bearing Hub */}
        <mesh material={materials.steelGear} position={[0, 0, 0.02]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
        </mesh>
        <mesh position={[0, 0, 0.042]} material={materials.syntheticRuby}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        </mesh>

        {/* Semicircular Oscillating Blade (Geneva Striped Skeleton) */}
        <mesh position={[0, 0.42, 0]} material={materials.tungstenRotor} castShadow>
          <ringGeometry args={[0.24, 0.98, 48, 1, 0, Math.PI]} />
        </mesh>

        {/* Heavy Gold Perimeter Segment (22k Mass) */}
        <mesh position={[0, 0.42, 0.01]} material={materials.goldRotorWeight} castShadow>
          <ringGeometry args={[0.88, 1.02, 48, 1, 0, Math.PI]} />
        </mesh>

        {/* Engraved Brand Monogram on Rotor */}
        <mesh position={[0, 0.65, 0.025]} material={materials.brassGold}>
          <boxGeometry args={[0.42, 0.06, 0.01]} />
        </mesh>
      </group>
    </group>
  );
};
