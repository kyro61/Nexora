import React, { useState } from 'react';
import {
  ArrowRight,
  Maximize2,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Layers,
  Compass,
  Cpu,
  Eye
} from 'lucide-react';
import { WATCH_COLLECTION, CRAFTSMANSHIP_PILLARS } from '../data/watchData';
import { WatchModelSpec } from '../types';

interface ScrollStoryProps {
  currentModel: WatchModelSpec;
  onSelectModel: (modelId: string) => void;
  onOpenProductModal: (watch: WatchModelSpec) => void;
  onOpenConsultation: (modelId?: string) => void;
  disassemblyProgress: number;
  onSetDisassemblyProgress: (val: number) => void;
  isInspectMode: boolean;
  onToggleInspect: () => void;
  isLuminescentMode: boolean;
  onToggleLume: () => void;
  scrollProgress: number;
  onResetCamera: () => void;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({
  currentModel,
  onSelectModel,
  onOpenProductModal,
  onOpenConsultation,
  disassemblyProgress,
  isInspectMode,
  onToggleInspect,
  isLuminescentMode,
  onToggleLume,
  scrollProgress
}) => {
  const [activeCraftTab, setActiveCraftTab] = useState(0);

  return (
    <div className="relative z-10 w-full pointer-events-none">
      {/* ========================================================================= */}
      {/* CHAPTER 01 — THE VOID (0.00 -> 0.08)                                      */}
      {/* Starts almost completely black. Subtle silhouette revealed by rim light.  */}
      {/* ========================================================================= */}
      <section
        id="chapter-01-void"
        className="min-h-screen flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 relative"
      >
        <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto pt-16 space-y-6">
          <div className="text-[10px] md:text-xs tracking-[0.8em] font-light text-[#B08D57] font-mono uppercase">
            CALIBRATING PRECISION
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-9xl font-serif font-light tracking-[0.25em] leading-none text-[#D6D0C5] select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
            NOXORA
          </h1>

          <div className="text-xs sm:text-sm md:text-base tracking-[0.6em] text-[#B08D57] font-mono uppercase pt-2">
            TIME, REFINED
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="flex flex-col items-center space-y-3 pointer-events-auto z-20">
          <div className="text-[9px] font-mono tracking-[0.35em] text-white/40 uppercase">
            SCROLL TO COMMENCE THE CINEMATIC JOURNEY
          </div>
          <div className="w-4 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#B08D57] rounded-full animate-bounce shadow-[0_0_8px_#B08D57]" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 02 — REVEAL (0.08 -> 0.18)                                        */}
      {/* Camera approaches, watch rotates ~25 deg, lighting sweeps across metal.   */}
      {/* ========================================================================= */}
      <section
        id="chapter-02-reveal"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative"
      >
        <div className="max-w-4xl space-y-6 pointer-events-auto">
          <div className="inline-block text-[10px] font-mono tracking-[0.4em] text-[#B08D57] uppercase bg-[#070707]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#B08D57]/30">
            CHAPTER 02 / REVEAL
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight leading-tight text-[#D6D0C5] select-none drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]">
            EVERY SECOND<br />
            <span className="italic text-[#B08D57] font-normal">MATTERS.</span>
          </h2>

          <p className="text-sm md:text-base text-[#D6D0C5]/70 font-mono tracking-widest max-w-xl mx-auto uppercase">
            Sculpted from proprietary alloys • Hand-chamfered mirror bevels
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 03 — ORBIT (0.18 -> 0.30)                                         */}
      {/* Camera orbits the watch: side profile, crown, lugs, bezel thickness.      */}
      {/* ========================================================================= */}
      <section
        id="chapter-03-orbit"
        className="min-h-screen flex items-center justify-start px-6 md:px-20 py-24"
      >
        <div className="max-w-lg bg-[#070707]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            CHAPTER 03 / SPATIAL ORBIT
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            Sculpted Geometry. Monobloc Strength.
          </h3>
          <p className="text-sm text-[#D6D0C5]/70 font-light leading-relaxed">
            The monobloc middle case is forged through cold-extrusion stamping at 300 tons, followed by seven-axis robotic micro-milling. Each lug curves seamlessly to fit the natural contours of the wrist.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div>
              <div className="text-xl font-serif text-[#B08D57]">{currentModel.caseDiameter}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
                Case Diameter
              </div>
            </div>
            <div>
              <div className="text-xl font-serif text-[#B08D57]">{currentModel.caseThickness}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
                Slim Ergonomics
              </div>
            </div>
            <div>
              <div className="text-xl font-serif text-[#B08D57]">{currentModel.waterResistance}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
                Water Resistance
              </div>
            </div>
            <div>
              <div className="text-xl font-serif text-[#B08D57]">Screwed Crown</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
                Hermetic Twin-Lock
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 04 — ENTER THE WATCH (0.30 -> 0.42)                               */}
      {/* Sapphire crystal fills viewport, camera physically penetrates into dial.  */}
      {/* ========================================================================= */}
      <section
        id="chapter-04-enter"
        className="min-h-screen flex items-center justify-end px-6 md:px-20 py-24"
      >
        <div className="max-w-lg bg-[#070707]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            CHAPTER 04 / OPTICAL PENETRATION
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            Double-Domed Sapphire Crystal.
          </h3>
          <p className="text-sm text-[#D6D0C5]/70 font-light leading-relaxed">
            Rated 9.0 on the Mohs hardness scale. Dual-sided multi-layer vacuum anti-reflective coating delivers pure optical clarity, inviting the viewer into the beating heart within.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase">
              PHYSICALLY TRAVELING THROUGH CRYSTAL...
            </span>
            <ArrowRight className="w-4 h-4 text-[#B08D57] animate-pulse" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 05 — INSIDE THE MOVEMENT (0.42 -> 0.55)                           */}
      {/* Inside movement. Oscillating balance, gears, jewels, bridges, rotor.       */}
      {/* ========================================================================= */}
      <section
        id="chapter-05-movement"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24"
      >
        <div className="max-w-xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-[#B08D57]/30 pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            CHAPTER 05 / INSIDE THE MOVEMENT
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            In-House Calibre NX-901 Engine.
          </h3>
          <p className="text-sm text-[#D6D0C5]/70 font-light leading-relaxed">
            At the center of NOXORA is the Glucydur balance wheel oscillating at 28,800 vibrations per hour (4 Hz). Paired with an anti-magnetic Breguet overcoil hairspring and 31 synthetic ruby jewel bearings, precision is maintained across all orientations.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">{currentModel.powerReserve}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                72 HOUR POWER RESERVE
              </div>
            </div>
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">{currentModel.frequency}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                28,800 VPH (4 HZ)
              </div>
            </div>
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">{currentModel.jewels}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                31 SYNTHETIC JEWELS
              </div>
            </div>
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">AUTOMATIC</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                MANUFACTURE CALIBRE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 06 — MACRO JOURNEY (0.55 -> 0.62)                                 */}
      {/* Microscopic travel past gear teeth, jewels, springs, bridges, screws.     */}
      {/* ========================================================================= */}
      <section
        id="chapter-06-macro"
        className="min-h-screen flex items-center justify-start px-6 md:px-20 py-24"
      >
        <div className="max-w-lg bg-[#070707]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            CHAPTER 06 / MACRO JOURNEY
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            Microscopic Architecture.
          </h3>
          <p className="text-sm text-[#D6D0C5]/70 font-light leading-relaxed">
            Navigating between the gear teeth, ruby jewel bushings, blued steel screws, and the breathing spiral hairspring. Experience mechanical horology at sub-millimeter scale.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center space-x-3 text-xs font-mono text-[#B08D57]">
            <Compass className="w-4 h-4" />
            <span>SUB-MICRON TOLERANCES (±0.001 MM)</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 07 — EXPLODED VIEW (0.62 -> 0.72)                                 */}
      {/* Physical 3D vector separation of watch components in spatial alignment.   */}
      {/* ========================================================================= */}
      <section
        id="chapter-07-exploded"
        className="min-h-screen flex flex-col justify-center items-end px-6 md:px-20 py-24"
      >
        <div className="max-w-xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            CHAPTER 07 / EXPLODED VIEW
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            THE ART OF PRECISION.
          </h3>
          <p className="text-sm text-[#D6D0C5]/70 font-light leading-relaxed">
            Every component separates along precise geometric vectors. Sapphire crystal, bezel, hands, dial, calibre movement, case chassis, and caseback maintain spatial alignment in full 3D space.
          </p>

          <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
            {[
              { num: '01', name: 'Sapphire Crystal (Double Domed)' },
              { num: '02', name: 'Cerachrom Bezel Ring' },
              { num: '03', name: 'Faceted Dauphine Hands' },
              { num: '04', name: 'Multi-Tiered Guilloché Dial' },
              { num: '05', name: 'Calibre NX-901 Movement' },
              { num: '06', name: 'Monobloc Chassis & Lugs' },
              { num: '07', name: 'Exhibition Caseback & Rotor' },
              { num: '08', name: 'Integrated Hand-Stitched Strap' }
            ].map((part, pIdx) => (
              <div key={pIdx} className="flex items-center justify-between text-xs font-mono text-[#D6D0C5]/80 py-1 border-b border-white/5">
                <span className="text-[#B08D57]">{part.num}</span>
                <span>{part.name}</span>
                <span className="text-[10px] text-white/40">3D VECTOR</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 08 — RECONSTRUCTION (0.72 -> 0.80)                                */}
      {/* Watch reconstructs smoothly. Warm golden atelier lighting.                */}
      {/* ========================================================================= */}
      <section
        id="chapter-08-reconstruction"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24"
      >
        <div className="max-w-3xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-14 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            CHAPTER 08 / RECONSTRUCTION
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            CRAFTED BY HAND.
          </h3>
          <p className="text-sm md:text-base text-[#D6D0C5]/80 font-light leading-relaxed mb-8">
            Every NOXORA timepiece returns into seamless physical unity, requiring over 240 hours of manual decoration, hand-beveled chamfering, and master horologist calibration in our Geneva workshop.
          </p>

          {/* Craftsmanship Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.number}
                onClick={() => setActiveCraftTab(idx)}
                className={`text-left p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeCraftTab === idx
                    ? 'border-[#B08D57] bg-[#B08D57]/10 text-white'
                    : 'border-white/5 bg-white/[0.02] text-white/50 hover:border-white/20'
                }`}
              >
                <div className="text-[9px] font-mono text-[#B08D57]">{pillar.number}</div>
                <div className="text-xs font-serif font-medium truncate mt-1">{pillar.title}</div>
              </button>
            ))}
          </div>

          {/* Active Craftsmanship Detail Card */}
          <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-2 max-w-lg">
              <div className="text-xs font-mono text-[#B08D57] uppercase tracking-wider">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].subtitle}
              </div>
              <p className="text-sm text-[#D6D0C5]/80 font-light leading-relaxed">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].text}
              </p>
              <div className="text-xs text-white/40 italic pt-1">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].detail}
              </div>
            </div>
            <div className="text-right border-l border-white/10 pl-6 shrink-0">
              <div className="text-3xl font-serif text-[#B08D57]">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].stat}
              </div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].statLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 09 — COLLECTION (0.80 -> 0.90)                                    */}
      {/* 4 luxury timepieces spatially arranged in 3D: AURELIS, OBSIDIAN, VANTAGE, ÉCLAT */}
      {/* ========================================================================= */}
      <section
        id="chapter-09-collection"
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-24"
      >
        <div className="w-full max-w-7xl space-y-8 pointer-events-auto">
          <div className="text-center space-y-3">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
              CHAPTER 09 / THE SPATIAL COLLECTION
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#D6D0C5]">
              TIMEPIECES IN SPACE
            </h3>
            <p className="text-sm text-[#D6D0C5]/60 font-light max-w-xl mx-auto">
              Four distinct manufacture expressions forged from 18k Rose Gold, DLC Grade 5 Titanium, High-Frequency 904L Steel, and Pure Synthetic Sapphire.
            </p>
          </div>

          {/* Timepiece Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {WATCH_COLLECTION.map((watch) => {
              const isSelected = watch.id === currentModel.id;
              return (
                <div
                  key={watch.id}
                  onClick={() => onSelectModel(watch.id)}
                  className={`bg-[#070707]/85 backdrop-blur-xl p-6 rounded-2xl border transition-all duration-500 cursor-pointer group flex flex-col justify-between hover:-translate-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'border-[#B08D57] shadow-[0_0_30px_rgba(176,141,87,0.3)] bg-[#111111]/90'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#B08D57] uppercase tracking-widest">
                        {watch.subtitle}
                      </span>
                      {isSelected && (
                        <span className="flex items-center text-[9px] font-mono text-[#B08D57] gap-1">
                          <CheckCircle className="w-3 h-3" /> ACTIVE IN 3D
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-serif text-[#D6D0C5] group-hover:text-white transition-colors">
                      {watch.name}
                    </h4>

                    <p className="text-xs text-[#D6D0C5]/70 font-light line-clamp-3 leading-relaxed">
                      {watch.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-base font-serif text-[#B08D57]">{watch.price}</div>
                      <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                        {watch.caseMaterial.split(',')[0]}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductModal(watch);
                      }}
                      className="p-2 rounded-full border border-white/10 hover:border-[#B08D57] hover:text-[#B08D57] transition-colors cursor-pointer"
                      aria-label="View Specifications"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 10 — FINAL HERO (0.90 -> 1.00)                                    */}
      {/* Deep luxury darkness surrounds watch. Commercial finale & luxury CTAs.    */}
      {/* ========================================================================= */}
      <section
        id="chapter-10-final"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative"
      >
        <div className="max-w-3xl space-y-6 pointer-events-auto bg-[#070707]/75 backdrop-blur-xl p-8 md:p-14 rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative overflow-hidden">
          <div className="w-16 h-[1px] bg-[#B08D57] mx-auto" />
          <div className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-[#B08D57] uppercase">
            NOXORA MANUFACTURE GENÈVE
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light text-[#D6D0C5] leading-tight">
            TIME DOESN'T WAIT.
          </h2>

          <p className="text-base sm:text-lg text-[#D6D0C5]/80 font-light max-w-xl mx-auto leading-relaxed">
            Discover your timepiece. Crafted for those who measure moments with unapologetic precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => onOpenConsultation(currentModel.id)}
              className="w-full sm:w-auto px-8 py-4 bg-[#B08D57] text-[#070707] font-mono text-xs uppercase tracking-[0.25em] font-semibold rounded-full hover:bg-[#c49f69] transition-all duration-300 shadow-[0_0_30px_rgba(176,141,87,0.4)] flex items-center justify-center space-x-3 cursor-pointer"
            >
              <span>CONTACT NOXORA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenProductModal(currentModel)}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#B08D57]/40 text-[#D6D0C5] font-mono text-xs uppercase tracking-[0.25em] rounded-full hover:border-[#B08D57] hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-[#B08D57]" />
              <span>EXPLORE COLLECTION</span>
            </button>
          </div>

          <div className="text-[9px] font-mono text-white/40 tracking-[0.3em] uppercase pt-4">
            ALL TIMEPIECES BACKED BY A 5-YEAR INTERNATIONAL MANUFACTURE WARRANTY
          </div>
        </div>
      </section>
    </div>
  );
};
