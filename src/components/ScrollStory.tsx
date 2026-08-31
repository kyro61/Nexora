import React, { useState } from 'react';
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Compass,
  Sliders,
  Maximize2,
  ExternalLink,
  CheckCircle,
  Eye,
  RotateCcw
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
  const [selectedCallout, setSelectedCallout] = useState<string | null>(null);
  const [activeCraftTab, setActiveCraftTab] = useState(0);

  return (
    <div className="relative z-10 w-full pointer-events-none">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO — THE WATCH EMERGES                                       */}
      {/* ========================================================================= */}
      <section
        id="hero-section"
        className="min-h-screen flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 relative"
      >
        <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto pt-6 space-y-4">
          <div className="text-[10px] md:text-xs tracking-[0.8em] font-light text-[#B08D57] font-mono uppercase">
            CALIBRATING PRECISION
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight leading-none text-center text-[#D6D0C5] select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            EVERY SECOND<br />
            <span className="italic text-[#B08D57] font-normal">MATTERS.</span>
          </h1>

          <div className="pt-2 flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] text-[#D6D0C5]/60 uppercase">
            <span className="w-8 h-[1px] bg-[#B08D57]/40" />
            <span>SWISS MANUFACTURE D'HORLOGERIE</span>
            <span className="w-8 h-[1px] bg-[#B08D57]/40" />
          </div>
        </div>

        {/* Geometric Balance Radial Dial Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] z-0 pointer-events-none opacity-40">
          <div className="w-full h-full border-[8px] md:border-[12px] border-[#111] rounded-full shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden bg-gradient-to-br from-[#1a1a1a]/50 to-[#070707]/70">
            <div className="absolute top-0 left-0 w-full h-full bg-geometric-grid opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
              <div className="w-[1px] h-full bg-white opacity-5 absolute left-1/2" />
              <div className="h-[1px] w-full bg-white opacity-5 absolute top-1/2" />
              <div className="w-[80%] h-[80%] border border-[#B08D57] rounded-full opacity-10 border-dashed" />
              <div className="absolute w-3.5 h-3.5 rounded-full bg-[#B08D57] shadow-[0_0_15px_#B08D57] z-30" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center space-y-3 pointer-events-auto z-20">
          <div className="text-[9px] font-mono tracking-[0.35em] text-white/50 uppercase">
            SCROLL TO COMMENCE THE CINEMATIC JOURNEY
          </div>
          <div className="w-4 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#B08D57] rounded-full animate-bounce shadow-[0_0_8px_#B08D57]" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: ARCHITECTURE & SCULPTED CASE                                   */}
      {/* ========================================================================= */}
      <section
        id="case-section"
        className="min-h-screen flex items-center justify-start px-6 md:px-20 py-24"
      >
        <div className="max-w-lg bg-[#070707]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            01 / ARCHITECTURE
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-wider text-white mt-2">
            THE MONOLITHIC CHASSIS
          </h2>
          <p className="text-xs md:text-sm font-light text-white/70 mt-4 leading-relaxed">
            Forged in grade 5 titanium and surgical 904L steel. Every facet is sculpted through 32 CNC passes, then brought to mirror finish by master polishers in our Geneva atelier.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div>
              <div className="text-xl font-serif text-[#B08D57]">41.0 MM</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
                Case Diameter
              </div>
            </div>
            <div>
              <div className="text-xl font-serif text-[#B08D57]">10.8 MM</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-0.5">
                Slim Ergonomics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE SAPPHIRE PORTAL                                            */}
      {/* ========================================================================= */}
      <section
        id="sapphire-section"
        className="min-h-screen flex items-center justify-end px-6 md:px-20 py-24"
      >
        <div className="max-w-lg bg-[#070707]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            02 / OPTICAL PURITY
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-wider text-white mt-2">
            DOUBLE-DOMED SAPPHIRE
          </h2>
          <p className="text-xs md:text-sm font-light text-white/70 mt-4 leading-relaxed">
            Pure synthetic corundum diamond-machined to 9 Mohs hardness. Seven layers of multi-spectral anti-reflective vapor coating guarantee absolute optical clarity from any viewing trajectory.
          </p>

          <div className="mt-6 flex items-center space-x-3 text-xs font-mono text-[#00FFAA] bg-[#00FFAA]/10 px-4 py-2.5 rounded-lg border border-[#00FFAA]/20">
            <Sparkles className="w-4 h-4" />
            <span>Grade X1 Super-LumiNova luminescence embedded underneath</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: THE ART OF PRECISION — WATCH DISASSEMBLY SEQUENCE             */}
      {/* ========================================================================= */}
      <section
        id="precision-section"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24"
      >
        <div className="max-w-xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-[#B08D57]/30 pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            03 / THE ART OF PRECISION
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-wider text-white mt-2">
            DISASSEMBLY SEQUENCE
          </h2>
          <p className="text-xs md:text-sm font-light text-white/70 mt-3 leading-relaxed">
            As you navigate through the timepiece, all 180+ individual components physically separate along their mechanical axes to reveal the architecture beneath.
          </p>

          {/* Interactive Exploded View Slider */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-white/80">
              <span className="text-[#B08D57] uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4" />
                <span>EXPLODED DISASSEMBLY LEVEL</span>
              </span>
              <span className="text-white font-bold">{Math.round(disassemblyProgress * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={disassemblyProgress}
              onChange={(e) => onSetDisassemblyProgress(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B08D57]"
            />
          </div>

          {/* Component Quick Callouts */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TECHNICAL_CALLOUTS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCallout(selectedCallout === item.id ? null : item.id)}
                className={`px-3 py-2 rounded-lg text-left text-[11px] font-mono border transition-all ${
                  selectedCallout === item.id
                    ? 'bg-[#B08D57]/20 border-[#B08D57] text-white shadow-[0_0_15px_rgba(176,141,87,0.3)]'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:border-white/30'
                }`}
              >
                <div className="font-semibold truncate">{item.componentName}</div>
                <div className="text-[9px] text-[#B08D57] truncate">{item.spec}</div>
              </button>
            ))}
          </div>

          {/* Callout Detail Description Box */}
          {selectedCallout && (
            <div className="mt-4 p-4 rounded-lg bg-[#B08D57]/10 border border-[#B08D57]/30 text-xs font-mono text-white/90 animate-fadeIn">
              <div className="font-bold text-[#B08D57] mb-1">
                {TECHNICAL_CALLOUTS.find((c) => c.id === selectedCallout)?.title}
              </div>
              <div className="text-white/70">
                {TECHNICAL_CALLOUTS.find((c) => c.id === selectedCallout)?.description}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: MECHANICAL MOVEMENT EXPERIENCE (CALIBRE NX-901)               */}
      {/* ========================================================================= */}
      <section
        id="movement-section"
        className="min-h-screen flex flex-col justify-center items-end px-6 md:px-20 py-24"
      >
        <div className="max-w-xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            04 / THE MECHANICAL HEART
          </div>
          <h2 className="text-3xl md:text-5xl font-serif tracking-wider text-white mt-2">
            CALIBRE NX-901
          </h2>
          <p className="text-xs md:text-sm font-light text-white/70 mt-3 leading-relaxed">
            A manufacture automatic movement with free-sprung Glucydur balance wheel oscillating at 28,800 vibrations per hour (4Hz). Bi-directional ball-bearing winding rotor with 22k gold perimeter weight.
          </p>

          {/* Technical Telemetry Dashboard */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">72 HOURS</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                POWER RESERVE
              </div>
            </div>

            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">28,800 VPH</div>
              <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mt-1">
                BEAT FREQUENCY (4 HZ)
              </div>
            </div>

            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-serif text-[#B08D57]">31</div>
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
      {/* SECTION 6: CRAFTED BY HAND (EDITORIAL CRAFTSMANSHIP)                     */}
      {/* ========================================================================= */}
      <section
        id="craft-section"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24"
      >
        <div className="max-w-3xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-14 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57] mb-4" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            05 / SAVOIR-FAIRE
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wider text-white mt-2">
            CRAFTED BY HAND.
          </h2>
          <p className="text-xs md:text-sm font-light text-white/70 mt-3 leading-relaxed">
            In our manufacture near Lake Geneva, our master watchmakers dedicate over 120 hours of manual decoration to every single timepiece before final casing.
          </p>

          {/* Pillars Tab Selector */}
          <div className="flex flex-wrap gap-2 mt-8 border-b border-white/10 pb-4">
            {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.number}
                onClick={() => setActiveCraftTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all focus:outline-none ${
                  activeCraftTab === idx
                    ? 'bg-[#B08D57] text-[#070707] font-bold shadow-[0_0_15px_rgba(176,141,87,0.4)]'
                    : 'bg-white/[0.04] text-white/70 hover:text-white'
                }`}
              >
                {pillar.number} {pillar.title}
              </button>
            ))}
          </div>

          {/* Active Craftsmanship Feature */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="text-sm font-serif text-[#B08D57] uppercase tracking-wider">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].subtitle}
              </div>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-light">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].text}
              </p>
              <div className="text-[11px] font-mono text-white/50 pt-2 flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>{CRAFTSMANSHIP_PILLARS[activeCraftTab].detail}</span>
              </div>
            </div>

            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/10 text-center">
              <div className="text-3xl font-serif text-white font-bold">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].stat}
              </div>
              <div className="text-[10px] font-mono text-[#B08D57] uppercase tracking-widest mt-1">
                {CRAFTSMANSHIP_PILLARS[activeCraftTab].statLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: THE COLLECTION — TIMEPIECE LINEUP                              */}
      {/* ========================================================================= */}
      <section
        id="collection-section"
        className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24"
      >
        <div className="max-w-6xl mx-auto w-full space-y-8 pointer-events-auto">
          <div className="text-center space-y-2">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
              06 / MANUFACTURE LINEAGE
            </div>
            <h2 className="text-4xl md:text-6xl font-serif tracking-wider text-white uppercase">
              THE COLLECTION
            </h2>
            <p className="text-xs md:text-sm font-mono text-white/60 max-w-xl mx-auto">
              Select any creation to instantly switch the active 3D materials, finishes, and open its master specification sheet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WATCH_COLLECTION.map((watch) => {
              const isSelected = currentModel.id === watch.id;
              return (
                <div
                  key={watch.id}
                  onClick={() => onSelectModel(watch.id)}
                  className={`bg-[#070707]/80 backdrop-blur-xl p-6 rounded-2xl border transition-all duration-500 cursor-pointer group flex flex-col justify-between hover:-translate-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'border-[#B08D57] shadow-[0_0_30px_rgba(176,141,87,0.3)] bg-[#111111]/90'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-[#B08D57] uppercase">
                        {watch.caliber.split(' ')[1] || 'CALIBRE'}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 bg-[#B08D57] text-[#070707] text-[8px] font-mono font-bold tracking-wider rounded uppercase">
                          ACTIVE 3D
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-serif tracking-wider text-white group-hover:text-[#B08D57] transition-colors">
                        {watch.name}
                      </h3>
                      <div className="text-xs font-mono text-white/50 mt-1">{watch.subtitle}</div>
                    </div>

                    <p className="text-xs font-light text-white/70 line-clamp-3 leading-relaxed">
                      {watch.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-sm font-serif text-[#B08D57] font-semibold">
                      {watch.price}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductModal(watch);
                      }}
                      className="text-xs font-mono text-white/60 hover:text-white flex items-center space-x-1 focus:outline-none"
                    >
                      <span>SPECS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: 3D INTERACTIVE STUDIO & TIMEPIECE CONFIGURATOR                */}
      {/* ========================================================================= */}
      <section
        id="configurator-section"
        className="min-h-screen flex items-center justify-start px-6 md:px-20 py-24"
      >
        <div className="max-w-md bg-[#070707]/80 backdrop-blur-xl p-8 rounded-2xl border border-[#B08D57]/40 pointer-events-auto shadow-[0_30px_90px_rgba(0,0,0,0.95)] space-y-6 relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57]" />
          <div className="border-b border-white/10 pb-4">
            <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>07 / 3D INTERACTIVE STUDIO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif tracking-wider text-white mt-1">
              FREE INSPECTION
            </h2>
            <p className="text-xs font-mono text-white/60 mt-1">
              Manipulate camera angle, explore exploded movement anatomy, or enable night luminescence.
            </p>
          </div>

          {/* Mode Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={onToggleInspect}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono tracking-wider border flex items-center justify-center space-x-2 transition-all ${
                  isInspectMode
                    ? 'bg-[#B08D57] border-[#B08D57] text-[#070707] font-bold shadow-[0_0_20px_rgba(176,141,87,0.4)]'
                    : 'bg-white/[0.04] border-white/10 text-white/80 hover:border-white/30'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>{isInspectMode ? 'EXIT ORBIT' : 'DRAG TO ORBIT'}</span>
              </button>

              <button
                onClick={onResetCamera}
                title="Reset Camera"
                className="ml-2 p-3 bg-white/[0.04] border border-white/10 hover:border-[#B08D57] rounded-xl text-white/70 hover:text-white transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onToggleLume}
              className={`w-full py-3 px-4 rounded-xl text-xs font-mono tracking-wider border flex items-center justify-center space-x-2 transition-all ${
                isLuminescentMode
                  ? 'bg-[#00FFAA]/20 border-[#00FFAA] text-[#00FFAA] shadow-[0_0_20px_rgba(0,255,170,0.4)]'
                  : 'bg-white/[0.04] border-white/10 text-white/80 hover:border-white/30'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{isLuminescentMode ? 'LUMINESCENCE ACTIVE' : 'TEST SUPER-LUMINOVA LUME'}</span>
            </button>
          </div>

          {/* Exploded Disassembly Slider */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/60">DISASSEMBLY OFFSET</span>
              <span className="text-[#B08D57] font-bold">{Math.round(disassemblyProgress * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={disassemblyProgress}
              onChange={(e) => onSetDisassemblyProgress(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B08D57]"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenConsultation(currentModel.id)}
              className="w-full py-3.5 bg-[#B08D57] hover:bg-[#c29d63] text-[#070707] font-semibold text-xs font-mono tracking-[0.25em] uppercase rounded-full transition-all shadow-[0_0_25px_rgba(176,141,87,0.3)] focus:outline-none"
            >
              ORDER {currentModel.name}
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: GENEVA HERITAGE & ATELIER JOURNAL                             */}
      {/* ========================================================================= */}
      <section
        id="heritage-section"
        className="min-h-screen flex items-center justify-end px-6 md:px-20 py-24"
      >
        <div className="max-w-xl bg-[#070707]/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.9)] space-y-6 relative overflow-hidden">
          <div className="w-12 h-[1px] bg-[#B08D57]" />
          <div className="text-[10px] font-mono tracking-[0.35em] text-[#B08D57] uppercase">
            08 / ATELIER JOURNAL
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-wider text-white">
            THE CHRONOMETRY OF TIME
          </h2>
          <p className="text-xs md:text-sm font-light text-white/70 leading-relaxed">
            Founded on the shores of Lake Geneva, NOXORA operates as an independent family manufacture dedicated to advancing chronometric stability through extreme mechanical precision.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
            <div>
              <div className="text-[#D6D0C5] font-semibold">140-STEP TESTING</div>
              <div className="text-white/50 text-[11px] mt-0.5">
                Every movement undergoes 30 days of dynamic temperature and shock validation.
              </div>
            </div>
            <div>
              <div className="text-[#D6D0C5] font-semibold">5-YEAR GUARANTEE</div>
              <div className="text-white/50 text-[11px] mt-0.5">
                Full international manufacture warranty and complimentary periodic overhaul.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: FINAL CINEMATIC CLIMAX SEQUENCE                               */}
      {/* ========================================================================= */}
      <section
        id="final-section"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative"
      >
        <div className="max-w-3xl space-y-6 pointer-events-auto bg-[#070707]/70 backdrop-blur-xl p-8 md:p-14 rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative overflow-hidden">
          <div className="w-16 h-[1px] bg-[#B08D57] mx-auto" />
          <div className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-[#B08D57] uppercase">
            NOXORA MANUFACTURE GENÈVE
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif tracking-[0.15em] text-[#D6D0C5] uppercase">
            TIME DOESN'T WAIT.
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-light text-white/80 font-serif tracking-widest max-w-xl mx-auto">
            DISCOVER YOUR TIMEPIECE.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => onOpenConsultation(currentModel.id)}
              className="w-full sm:w-auto px-10 py-4 bg-[#B08D57] hover:bg-[#c29d63] text-[#070707] font-semibold text-xs font-mono tracking-[0.25em] uppercase rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(176,141,87,0.4)] focus:outline-none"
            >
              REQUEST PRIVATE CONSULTATION
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('collection-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-10 py-4 border border-white/20 hover:border-[#B08D57] text-[#D6D0C5] hover:text-white font-mono text-xs tracking-[0.25em] uppercase rounded-full transition-all duration-300 focus:outline-none"
            >
              EXPLORE COLLECTION
            </button>
          </div>

          {/* Minimalist Footnote */}
          <div className="pt-12 text-[10px] font-mono text-white/40 tracking-widest flex items-center justify-center space-x-6">
            <span>GENEVA</span>
            <span>•</span>
            <span>ZURICH</span>
            <span>•</span>
            <span>TOKYO</span>
            <span>•</span>
            <span>NEW YORK</span>
          </div>
        </div>
      </section>
    </div>
  );
};
