import React from 'react';
import { Html } from '@react-three/drei';

interface MechanicalAnnotationsProps {
  scrollProgress: number;
}

export const MechanicalAnnotations: React.FC<MechanicalAnnotationsProps> = ({ scrollProgress }) => {
  // Chapter 05 (Inside Movement) & Chapter 06 (Macro Journey): 0.42 -> 0.62
  const isMovementScene = scrollProgress >= 0.41 && scrollProgress <= 0.62;
  // Chapter 07 (Exploded View): 0.62 -> 0.72
  const isExplodedScene = scrollProgress > 0.62 && scrollProgress <= 0.73;

  if (!isMovementScene && !isExplodedScene) return null;

  return (
    <group name="Spatial3DAnnotations">
      {/* CHAPTER 05 & 06 LABELS (Inside Mechanical Movement) */}
      {isMovementScene && (
        <>
          {/* 01: BALANCE WHEEL / 28,800 VPH */}
          <group position={[0.22, -0.38, 0.18]}>
            <Html distanceFactor={3.6} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 bg-[#070707]/90 backdrop-blur-md border border-[#B08D57]/60 px-3 py-1.5 rounded shadow-[0_4px_25px_rgba(0,0,0,0.9)] animate-fadeIn">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B08D57] animate-ping" />
                <div className="text-left">
                  <div className="text-[8px] font-mono text-[#B08D57] tracking-widest uppercase">
                    BALANCE WHEEL
                  </div>
                  <div className="text-[10px] font-serif font-bold text-white tracking-wider">
                    28,800 VPH (4 HZ)
                  </div>
                </div>
              </div>
            </Html>
          </group>

          {/* 02: 72 HOUR POWER RESERVE */}
          <group position={[0.42, 0.38, 0.14]}>
            <Html distanceFactor={3.6} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 bg-[#070707]/90 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded shadow-[0_4px_25px_rgba(0,0,0,0.9)] animate-fadeIn">
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <div className="text-left">
                  <div className="text-[8px] font-mono text-[#D6D0C5]/70 tracking-widest uppercase">
                    72 HOUR POWER RESERVE
                  </div>
                  <div className="text-[10px] font-serif font-bold text-white tracking-wider">
                    TWIN-BARREL KINEMATICS
                  </div>
                </div>
              </div>
            </Html>
          </group>

          {/* 03: 31 JEWELS (Synthetic Ruby Bearings) */}
          <group position={[-0.26, 0.22, 0.12]}>
            <Html distanceFactor={3.6} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 bg-[#070707]/90 backdrop-blur-md border border-[#E0115F]/50 px-3 py-1.5 rounded shadow-[0_4px_25px_rgba(0,0,0,0.9)] animate-fadeIn">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E0115F]" />
                <div className="text-left">
                  <div className="text-[8px] font-mono text-[#E0115F] tracking-widest uppercase">
                    31 JEWELS
                  </div>
                  <div className="text-[10px] font-serif font-bold text-white tracking-wider">
                    SYNTHETIC CORUNDUM
                  </div>
                </div>
              </div>
            </Html>
          </group>

          {/* 04: AUTOMATIC CALIBRE */}
          <group position={[-0.24, -0.22, 0.1]}>
            <Html distanceFactor={3.6} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 bg-[#070707]/90 backdrop-blur-md border border-[#B08D57]/40 px-3 py-1.5 rounded shadow-[0_4px_25px_rgba(0,0,0,0.9)] animate-fadeIn">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                <div className="text-left">
                  <div className="text-[8px] font-mono text-[#B08D57] tracking-widest uppercase">
                    AUTOMATIC CALIBRE
                  </div>
                  <div className="text-[10px] font-serif font-bold text-white tracking-wider">
                    IN-HOUSE NX-901
                  </div>
                </div>
              </div>
            </Html>
          </group>
        </>
      )}

      {/* CHAPTER 07 LABELS (Exploded Disassembly) */}
      {isExplodedScene && (
        <>
          {/* Sapphire Crystal */}
          <group position={[0.8, 1.6, 0.6]}>
            <Html distanceFactor={4.5} center className="pointer-events-none select-none">
              <div className="bg-[#070707]/90 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
                <div className="text-[8px] font-mono text-[#B08D57] tracking-widest uppercase">
                  01 / OPTICS
                </div>
                <div className="text-[10px] font-serif text-white uppercase">
                  DOUBLE-DOMED SAPPHIRE
                </div>
              </div>
            </Html>
          </group>

          {/* Bezel */}
          <group position={[-1.2, 0.8, 0.4]}>
            <Html distanceFactor={4.5} center className="pointer-events-none select-none">
              <div className="bg-[#070707]/90 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
                <div className="text-[8px] font-mono text-[#B08D57] tracking-widest uppercase">
                  02 / BEZEL
                </div>
                <div className="text-[10px] font-serif text-white uppercase">
                  CERACHROM RING
                </div>
              </div>
            </Html>
          </group>

          {/* Calibre Engine */}
          <group position={[1.4, -0.6, 0.0]}>
            <Html distanceFactor={4.5} center className="pointer-events-none select-none">
              <div className="bg-[#070707]/90 backdrop-blur-md border border-[#B08D57]/50 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
                <div className="text-[8px] font-mono text-[#B08D57] tracking-widest uppercase">
                  03 / MANUFACTURE
                </div>
                <div className="text-[10px] font-serif text-white uppercase">
                  CALIBRE NX-901
                </div>
              </div>
            </Html>
          </group>
        </>
      )}
    </group>
  );
};
