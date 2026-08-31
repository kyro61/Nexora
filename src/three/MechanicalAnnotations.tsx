import React from 'react';
import { Html } from '@react-three/drei';

interface MechanicalAnnotationsProps {
  scrollProgress: number;
}

export const MechanicalAnnotations: React.FC<MechanicalAnnotationsProps> = ({ scrollProgress }) => {
  // Mechanism scene is 0.42 -> 0.56
  const isMechanismScene = scrollProgress >= 0.40 && scrollProgress <= 0.57;
  // Exploded scene is 0.56 -> 0.68
  const isExplodedScene = scrollProgress >= 0.57 && scrollProgress <= 0.69;

  if (!isMechanismScene && !isExplodedScene) return null;

  return (
    <group name="Spatial3DAnnotations">
      {/* SCENE 05 LABELS (Inside Calibre NX-901) */}
      {isMechanismScene && (
        <>
          {/* Balance Wheel */}
          <group position={[0.22, -0.38, 0.2]}>
            <Html distanceFactor={4} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 bg-[#070707]/85 backdrop-blur-md border border-[#B08D57]/40 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
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

          {/* Mainspring Barrel Power Reserve */}
          <group position={[0.42, 0.38, 0.15]}>
            <Html distanceFactor={4} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 bg-[#070707]/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <div className="text-left">
                  <div className="text-[8px] font-mono text-[#D6D0C5]/60 tracking-widest uppercase">
                    POWER RESERVE
                  </div>
                  <div className="text-[10px] font-serif font-bold text-white tracking-wider">
                    72 HOURS
                  </div>
                </div>
              </div>
            </Html>
          </group>

          {/* Synthetic Ruby Jewels */}
          <group position={[-0.28, 0.18, 0.12]}>
            <Html distanceFactor={4} center className="pointer-events-none select-none">
              <div className="flex items-center gap-2 bg-[#070707]/85 backdrop-blur-md border border-[#E0115F]/40 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E0115F]" />
                <div className="text-left">
                  <div className="text-[8px] font-mono text-[#E0115F] tracking-widest uppercase">
                    SYNTHETIC RUBY
                  </div>
                  <div className="text-[10px] font-serif font-bold text-white tracking-wider">
                    31 JEWELS
                  </div>
                </div>
              </div>
            </Html>
          </group>
        </>
      )}

      {/* SCENE 06 LABELS (Exploded Architecture) */}
      {isExplodedScene && (
        <>
          {/* Sapphire Crystal */}
          <group position={[0.8, 1.8, 0.6]}>
            <Html distanceFactor={5} center className="pointer-events-none select-none">
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

          {/* Bezel Ring */}
          <group position={[-1.2, 0.8, 0.4]}>
            <Html distanceFactor={5} center className="pointer-events-none select-none">
              <div className="bg-[#070707]/90 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
                <div className="text-[8px] font-mono text-[#B08D57] tracking-widest uppercase">
                  02 / BEZEL
                </div>
                <div className="text-[10px] font-serif text-white uppercase">
                  CERACHROM CERAMIC RING
                </div>
              </div>
            </Html>
          </group>

          {/* Manufacture Calibre */}
          <group position={[1.4, -0.6, 0.0]}>
            <Html distanceFactor={5} center className="pointer-events-none select-none">
              <div className="bg-[#070707]/90 backdrop-blur-md border border-[#B08D57]/40 px-3 py-1.5 rounded shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-fadeIn">
                <div className="text-[8px] font-mono text-[#B08D57] tracking-widest uppercase">
                  03 / IN-HOUSE ENGINE
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
