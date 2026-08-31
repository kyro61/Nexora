import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { Scene } from './three/Scene';
import { Navigation } from './components/Navigation';
import { ScrollStory } from './components/ScrollStory';
import { FullscreenMenu } from './components/FullscreenMenu';
import { ConsultationModal } from './components/ConsultationModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LoadingScreen } from './components/LoadingScreen';
import { WATCH_COLLECTION } from './data/watchData';
import { WatchModelSpec } from './types';
import { soundManager } from './utils/audioEngine';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentModelId, setCurrentModelId] = useState('aurelis');
  const [disassemblyProgress, setDisassemblyProgress] = useState(0);
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [isLuminescentMode, setIsLuminescentMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // Modals
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationModelId, setConsultationModelId] = useState('aurelis');
  const [productModalWatch, setProductModalWatch] = useState<WatchModelSpec | null>(null);

  // Manual 3D Orbit State
  const [manualOrbit, setManualOrbit] = useState({ x: 0, y: 15, zoom: 1.0 });
  const isDragging = useRef(false);
  const previousPointerPos = useRef({ x: 0, y: 0 });

  const currentModel = WATCH_COLLECTION.find((w) => w.id === currentModelId) || WATCH_COLLECTION[0];

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);

        // Map scroll progress to automatic disassembly in the movement section (0.45 - 0.70)
        if (!isInspectMode) {
          if (progress >= 0.45 && progress <= 0.70) {
            const rangeProgress = (progress - 0.45) / 0.25;
            // Peak at 0.58, then smoothly reconstruct
            const explode = rangeProgress < 0.5 ? rangeProgress * 2 : (1 - rangeProgress) * 2;
            setDisassemblyProgress(explode);
          } else if (progress < 0.45 || progress > 0.75) {
            setDisassemblyProgress(0);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInspectMode]);

  // Handle Sound Toggle
  const handleToggleSound = () => {
    const active = soundManager.toggleMute();
    setIsMuted(!active);
  };

  // Navigate to Section
  const handleNavigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Manual Pointer Controls for 3D Orbit Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInspectMode) return;
    isDragging.current = true;
    previousPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInspectMode || !isDragging.current) return;
    const deltaX = e.clientX - previousPointerPos.current.x;
    const deltaY = e.clientY - previousPointerPos.current.y;

    setManualOrbit((prev) => ({
      x: prev.x + deltaX * 0.5,
      y: Math.max(-60, Math.min(75, prev.y + deltaY * 0.5)),
      zoom: prev.zoom
    }));

    previousPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleResetCamera = () => {
    setManualOrbit({ x: 0, y: 15, zoom: 1.0 });
    setDisassemblyProgress(0);
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#D6D0C5] select-none font-sans overflow-x-hidden">
      {/* Loading Intro Sequence */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Persistent 3D WebGL Canvas */}
      <Scene
        model={currentModel}
        scrollProgress={scrollProgress}
        disassemblyProgress={disassemblyProgress}
        isInspectMode={isInspectMode}
        isLuminescentMode={isLuminescentMode}
        manualOrbit={manualOrbit}
        onCanvasPointerDown={handlePointerDown}
        onCanvasPointerMove={handlePointerMove}
        onCanvasPointerUp={handlePointerUp}
      />

      {/* Geometric Balance Background Calibration Guides & Rings */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        {/* Subtle dot grid pattern */}
        <div className="absolute inset-0 bg-geometric-grid opacity-15" />

        {/* Geometric crosshairs */}
        <div className="w-[1px] h-full bg-white opacity-[0.03] absolute left-1/2" />
        <div className="h-[1px] w-full bg-white opacity-[0.03] absolute top-1/2" />

        {/* Concentric rings */}
        <div className="w-[580px] h-[580px] border-[0.5px] border-[#D6D0C5] rounded-full opacity-[0.07] animate-pulse" />
        <div className="absolute w-[820px] h-[820px] border-[0.5px] border-[#D6D0C5] rounded-full opacity-[0.04]" />
        <div className="absolute w-[1060px] h-[1060px] border-[0.5px] border-[#B08D57] rounded-full opacity-[0.03] border-dashed" />
      </div>

      {/* Luxury Navigation Header */}
      <Navigation
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        isInspectMode={isInspectMode}
        onToggleInspect={() => setIsInspectMode(!isInspectMode)}
        isLuminescentMode={isLuminescentMode}
        onToggleLume={() => setIsLuminescentMode(!isLuminescentMode)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigateToSection={handleNavigateToSection}
        scrollProgress={scrollProgress}
      />

      {/* Fixed Geometric Left HUD (Telemetry & Chronometry) */}
      <div className="fixed left-6 md:left-12 bottom-8 md:bottom-10 z-20 pointer-events-auto hidden md:flex flex-col gap-5 border-l border-[#B08D57]/30 pl-5">
        <div className="group">
          <div className="text-[9px] tracking-widest text-[#B08D57] opacity-60 uppercase mb-0.5 font-mono">
            Reserve
          </div>
          <div className="text-lg md:text-xl font-serif tracking-tight text-white">
            {currentModel.powerReserve}
          </div>
        </div>
        <div className="group">
          <div className="text-[9px] tracking-widest text-[#B08D57] opacity-60 uppercase mb-0.5 font-mono">
            Beat Rate
          </div>
          <div className="text-lg md:text-xl font-serif tracking-tight text-white">
            {currentModel.frequency}
          </div>
        </div>
        <div className="group">
          <div className="text-[9px] tracking-widest text-[#B08D57] opacity-60 uppercase mb-0.5 font-mono">
            Composition
          </div>
          <div className="text-lg md:text-xl font-serif tracking-tight text-white">
            {currentModel.jewels} JEWELS
          </div>
        </div>
      </div>

      {/* Fixed Geometric Right HUD (Active Axis & Disassembly Progress) */}
      <div className="fixed right-6 md:right-12 bottom-8 md:bottom-10 z-20 pointer-events-auto hidden md:flex flex-col items-end gap-1.5 text-right">
        <div className="text-[9px] tracking-[0.4em] font-medium font-mono text-[#D6D0C5]/80">
          EXPERIENCE ACTIVE
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-[9px] tracking-widest opacity-40 font-mono uppercase">Current Axis</span>
          <span className="font-mono text-xs text-[#B08D57]">
            {isInspectMode
              ? `ORBIT: X:${Math.round(manualOrbit.x)}° Y:${Math.round(manualOrbit.y)}°`
              : `Z: ${(1.0294 + scrollProgress * 0.12).toFixed(4)}`}
          </span>
        </div>
        <div className="w-40 md:w-48 h-[1px] bg-[#D6D0C5]/20 mt-2 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#B08D57] shadow-[0_0_10px_#B08D57] transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(10, scrollProgress * 100))}%` }}
          />
        </div>
      </div>

      {/* Fixed Geometric Right Pagination Micro-Dots */}
      <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-6 z-30 pointer-events-auto">
        {[
          { id: 'hero-section', label: '01 / HERO' },
          { id: 'case-section', label: '02 / CHASSIS' },
          { id: 'sapphire-section', label: '03 / SAPPHIRE' },
          { id: 'precision-section', label: '04 / PRECISION' },
          { id: 'movement-section', label: '05 / CALIBRE' },
          { id: 'craft-section', label: '06 / CRAFT' },
          { id: 'collection-section', label: '07 / COLLECTION' },
          { id: 'configurator-section', label: '08 / STUDIO' },
          { id: 'heritage-section', label: '09 / HERITAGE' },
          { id: 'final-section', label: '10 / FINALE' }
        ].map((section, idx) => {
          const stepProgress = idx / 9;
          const isActive = Math.abs(scrollProgress - stepProgress) < 0.08;
          return (
            <button
              key={section.id}
              onClick={() => handleNavigateToSection(section.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              aria-label={section.label}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-1.5 h-1.5 bg-[#B08D57] shadow-[0_0_6px_#B08D57] scale-125'
                    : 'w-1 h-1 bg-white/20 group-hover:bg-white/60'
                }`}
              />
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono tracking-widest text-[#B08D57] whitespace-nowrap uppercase pointer-events-none bg-[#070707]/90 px-2 py-0.5 rounded border border-white/10">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fixed Geometric Subtle Footer */}
      <footer className="fixed bottom-0 left-0 w-full px-6 md:px-12 py-3 hidden lg:flex justify-between items-end z-20 pointer-events-none">
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] tracking-[0.2em] font-mono font-bold text-[#D6D0C5]/90 uppercase">
            {currentModel.name} 01
          </div>
          <div className="text-[9px] tracking-[0.1em] text-[#D6D0C5]/40 font-mono italic uppercase">
            AUTOMATIC MECHANICAL SERIES
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[10px] tracking-[0.5em] font-mono font-bold text-[#D6D0C5]/70">
            TIME, REFINED
          </div>
          <div className="w-12 h-[1px] bg-[#B08D57]" />
        </div>
      </footer>

      {/* Bottom Vignette Layer */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none z-10" />

      {/* Continuous Editorial Scroll Storyline */}
      <ScrollStory
        currentModel={currentModel}
        onSelectModel={(id) => setCurrentModelId(id)}
        onOpenProductModal={(watch) => setProductModalWatch(watch)}
        onOpenConsultation={(modelId) => {
          setConsultationModelId(modelId || currentModelId);
          setConsultationOpen(true);
        }}
        disassemblyProgress={disassemblyProgress}
        onSetDisassemblyProgress={(val) => setDisassemblyProgress(val)}
        isInspectMode={isInspectMode}
        onToggleInspect={() => setIsInspectMode(!isInspectMode)}
        isLuminescentMode={isLuminescentMode}
        onToggleLume={() => setIsLuminescentMode(!isLuminescentMode)}
        scrollProgress={scrollProgress}
        onResetCamera={handleResetCamera}
      />

      {/* Fullscreen Cinematic Drawer Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectSection={handleNavigateToSection}
        onSelectModel={(id) => setCurrentModelId(id)}
        onOpenConsultation={() => {
          setConsultationModelId(currentModelId);
          setConsultationOpen(true);
        }}
      />

      {/* Timepiece Specification Sheet Modal */}
      <ProductDetailModal
        watch={productModalWatch}
        isOpen={!!productModalWatch}
        onClose={() => setProductModalWatch(null)}
        onSelectAndInspect={(id) => {
          setCurrentModelId(id);
          setIsInspectMode(true);
        }}
        onOpenConsultation={() => {
          setConsultationModelId(productModalWatch?.id || currentModelId);
          setConsultationOpen(true);
        }}
      />

      {/* Private Consultation & Boutique Appointment Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        selectedModelId={consultationModelId}
      />
    </div>
  );
}
