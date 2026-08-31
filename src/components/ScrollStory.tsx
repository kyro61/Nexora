import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowRight,
  Shield,
  Layers,
  Sliders,
  Maximize2,
  ExternalLink,
  CheckCircle,
  Eye,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { WATCH_COLLECTION, TECHNICAL_CALLOUTS, CRAFTSMANSHIP_PILLARS } from '../data/watchData';
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
  onSetDisassemblyProgress,
  isInspectMode,
  onToggleInspect,
  isLuminescentMode,
  onToggleLume,
  scrollProgress,
  onResetCamera
}) => {
  const [activeCraftTab, setActiveCraftTab] = useState(0);

  return (
    <div className="relative z-10 w-full pointer-events-none">
      {/* ========================================================================= */}
      {/* SCENE 01 — VOID (0.00 -> 0.08)                                            */}
      {/* Starts in near darkness. Thin rim light revealing silhouette.              */}
      {/* ========================================================================= */}
      <section
        id="scene-void"
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
      {/* SCENE 02 — FIRST REVEAL (0.08 -> 0.18)                                    */}
      {/* Camera approaches, watch rotates ~25 deg, lighting sweeps across metal.   */}
      {/* ========================================================================= */}
      <section
        id="scene-reveal"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative"
      >
        <div className="max-w-4xl space-y-6 pointer-events-auto">
          <div className="inline-block text-[10px] font-mono tracking-[0.4em] text-[#B08D57] uppercase bg-[#070707]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#B08D57]/30">
            01 / FIRST REVEAL
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
      {/* SCENE 03 — ORBIT (0.18 -> 0.30)                                           */}
      {/* Camera orbits the watch: case thickness, crown, lugs, side profile.       */}
      {/* ========================================================================= */}
      <section
        id="scene-orbit"
        className="min-h-screen flex items-center justify-start px-6 md:px-20 py-24"
      >
        <div className="max-w-lg bg-[#070707]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            02 / SPATIAL ORBIT & ARCHITECTURE
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
      {/* SCENE 04 — ENTER THE WATCH (0.30 -> 0.42)                                 */}
      {/* Camera moves toward dial, penetrates sapphire crystal into the movement.  */}
      {/* ========================================================================= */}
      <section
        id="scene-crystal"
        className="min-h-screen flex items-center justify-end px-6 md:px-20 py-24"
      >
        <div className="max-w-lg bg-[#070707]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            03 / OPTICAL PENETRATION
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            Double-Domed Sapphire Crystal.
          </h3>
          <p className="text-sm text-[#D6D0C5]/70 font-light leading-relaxed">
            Rated 9.0 on the Mohs hardness scale. Dual-sided multi-layer vacuum anti-reflective coating delivers pure optical clarity, inviting the viewer into the beating heart within.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase">
              ENTERING INTERNAL MECHANICAL HEART...
            </span>
            <ArrowRight className="w-4 h-4 text-[#B08D57] animate-pulse" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 05 — THE MECHANISM (0.42 -> 0.56)                                   */}
      {/* Inside the movement. Gears rotate, balance oscillates, jewels glisten.    */}
      {/* ========================================================================= */}
      <section
        id="scene-mechanism"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24"
      >
        <div className="max-w-xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-[#B08D57]/30 pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            04 / THE MECHANICAL HEART
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
                POWER RESERVE
              </div>
            </div>
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">{currentModel.frequency}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                FREQUENCY (4 HZ)
              </div>
            </div>
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">{currentModel.jewels}</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                SYNTHETIC RUBY JEWELS
              </div>
            </div>
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">COSC</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                MASTER CHRONOMETER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 06 — EXPLODED WATCH (0.56 -> 0.68)                                   */}
      {/* Physical 3D vector separation of watch components in alignment.            */}
      {/* ========================================================================= */}
      <section
        id="scene-exploded"
        className="min-h-screen flex flex-col justify-center items-end px-6 md:px-20 py-24"
      >
        <div className="max-w-xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            05 / EXPLODED ARCHITECTURE
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            THE ART OF PRECISION.
          </h3>
          <p className="text-sm text-[#D6D0C5]/70 font-light leading-relaxed">
            Every component is engineered along precise geometric vectors. Sapphire crystal, cerachrom bezel, dial assembly, hands, calibre movement, case chassis, and exhibition caseback maintain perfect axial harmony.
          </p>

          <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
            {[
              { num: '01', name: 'Sapphire Crystal (Double Domed)' },
              { num: '02', name: 'Cerachrom Bezel Ring & Tachymeter' },
              { num: '03', name: 'Faceted Hands & Sweeping Chrono Needle' },
              { num: '04', name: 'Multi-Tiered Guilloché Dial Plate' },
              { num: '05', name: 'Calibre NX-901 Mechanical Engine' },
              { num: '06', name: 'Monobloc 904L / 18k Rose Gold Case' },
              { num: '07', name: 'Exhibition Sapphire Caseback & Rotor' }
            ].map((part, pIdx) => (
              <div key={pIdx} className="flex items-center justify-between text-xs font-mono text-[#D6D0C5]/80 py-1 border-b border-white/5">
                <span className="text-[#B08D57]">{part.num}</span>
                <span>{part.name}</span>
                <span className="text-[10px] text-white/40">Z-AXIS 3D</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 07 — CRAFTSMANSHIP (0.68 -> 0.78)                                   */}
      {/* Watch reconstructs. Warm lighting. CRAFTED BY HAND editorial statements.   */}
      {/* ========================================================================= */}
      <section
        id="scene-craft"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24"
      >
        <div className="max-w-3xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-14 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            06 / SAVOIR-FAIRE & ATELIER
          </div>
          <h3 className="text-4xl sm:text-5xl font-serif text-[#D6D0C5] mt-2 mb-4 leading-tight">
            CRAFTED BY HAND.
          </h3>
          <p className="text-sm md:text-base text-[#D6D0C5]/80 font-light leading-relaxed mb-8">
            Every NOXORA timepiece requires over 240 hours of manual decoration, hand-beveled chamfering, wooden wheel polishing, and master horologist calibration in our Geneva workshop.
          </p>

          {/* Craftsmanship Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.number}
                onClick={() => setActiveCraftTab(idx)}
                className={`text-left p-3 rounded-lg border transition-all duration-300 ${
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
      {/* SCENE 08 — COLLECTION (0.78 -> 0.88)                                      */}
      {/* 3 luxury timepieces exist in the same 3D environment with camera focus.   */}
      {/* ========================================================================= */}
      <section
        id="scene-collection"
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-24"
      >
        <div className="w-full max-w-6xl space-y-8 pointer-events-auto">
          <div className="text-center space-y-3">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
              07 / SPATIAL COLLECTION
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#D6D0C5]">
              THE TIMEPIECE ATELIER
            </h3>
            <p className="text-sm text-[#D6D0C5]/60 font-light max-w-xl mx-auto">
              Three horological philosophies forged from 18k Rose Gold, DLC Grade 5 Titanium, and High-Frequency 904L Steel.
            </p>
          </div>

          {/* Timepiece Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {WATCH_COLLECTION.slice(0, 3).map((watch) => {
              const isSelected加快 = watch.id === currentModel.id;
              return (
                <div
                  key={watch.id}
                  onClick={() => onSelectModel(watch.id)}
                  className={`bg-[#070707]/80 backdrop-blur-xl p-6 rounded-2xl border transition-all duration-500 cursor-pointer group flex flex-col justify-between hover:-translate-y-2 relative overflow-hidden ${
                    isSelected加快
                      ? 'border-[#B08D57] shadow-[0_0_30px_rgba(176,141,87,0.3)] bg-[#111111]/90'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#B08D57] uppercase tracking-widest">
                        {watch.subtitle}
                      </span>
                      {isSelected加快 && (
                        <span className="flex items-center text-[9px] font-mono text-[#B08D57] gap-1">
                          <CheckCircle className="w-3 h-3" /> ACTIVE IN 3D
                        </span>
                      )}
                    </div>

                    <h4 className="text-2xl font-serif text-[#D6D0C5] group-hover:text-white transition-colors">
                      {watch.name}
                    </h4>

                    <p className="text-xs text-[#D6D0C5]/70 font-light line-clamp-3 leading-relaxed">
                      {watch.tagline}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-serif text-[#B08D57]">{watch.price}</div>
                      <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                        {watch.caseMaterial.split(',')[0]}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductModal(watch);
                      }}
                      className="p-2 rounded-full border border-white/10 hover:border-[#B08D57] hover:text-[#B08D57] transition-colors"
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
      {/* SCENE 09 — FINAL HERO (0.88 -> 1.00)                                      */}
      {/* Darkness surrounds watch. Final iconic commercial frame & luxury CTAs.    */}
      {/* ========================================================================= */}
      <section
        id="scene-final"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative"
      >
        <div className="max-w-3xl space-y-6 pointer-events-auto bg-[#070707]/70 backdrop-blur-xl p-8 md:p-14 rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative overflow-hidden">
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
