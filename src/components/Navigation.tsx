import React from 'react';
import { Volume2, VolumeX, Moon, Compass } from 'lucide-react';

interface NavigationProps {
  isMuted: boolean;
  onToggleSound: () => void;
  isInspectMode: boolean;
  onToggleInspect: () => void;
  isLuminescentMode: boolean;
  onToggleLume: () => void;
  onOpenMenu: () => void;
  onNavigateToSection: (sectionId: string) => void;
  scrollProgress: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  isMuted,
  onToggleSound,
  isInspectMode,
  onToggleInspect,
  isLuminescentMode,
  onToggleLume,
  onOpenMenu,
  onNavigateToSection,
  scrollProgress
}) => {
  // Determine active section by scroll progress
  const getActiveIndex = () => {
    if (scrollProgress < 0.12) return 0; // HERO / JOURNAL
    if (scrollProgress < 0.35) return 1; // ARCHITECTURE
    if (scrollProgress < 0.55) return 2; // CRAFT
    if (scrollProgress < 0.78) return 3; // COLLECTION
    return 4; // HERITAGE
  };

  const activeIdx = getActiveIndex();

  const navItems = [
    { label: 'COLLECTION', id: 'collection-section' },
    { label: 'CALIBRE', id: 'movement-section' },
    { label: 'CRAFT', id: 'craft-section' },
    { label: 'HERITAGE', id: 'heritage-section' },
    { label: 'JOURNAL', id: 'hero-section' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 md:py-8 flex items-center justify-between pointer-events-none transition-all duration-500">
      {/* Brand Identity */}
      <div className="flex items-center space-x-6 pointer-events-auto">
        <button
          onClick={() => onNavigateToSection('hero-section')}
          className="group text-left focus:outline-none flex flex-col"
          aria-label="NOXORA Home"
        >
          <span className="text-xl md:text-2xl font-serif tracking-[0.4em] text-[#B08D57] group-hover:text-white transition-colors uppercase font-light">
            NOXORA
          </span>
          <span className="text-[8px] md:text-[9px] tracking-[0.35em] text-[#D6D0C5]/40 font-mono uppercase">
            GENÈVE • MANUFACTURE
          </span>
        </button>
      </div>

      {/* Center Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center gap-8 xl:gap-12 pointer-events-auto text-[10px] tracking-[0.3em] font-mono uppercase font-medium">
        {navItems.map((item, idx) => {
          const isItemActive = activeIdx === idx;
          return (
            <button
              key={item.id}
              onClick={() => onNavigateToSection(item.id)}
              className={`transition-all duration-300 focus:outline-none ${
                isItemActive
                  ? 'text-[#B08D57] font-bold opacity-100 border-b border-[#B08D57] pb-1'
                  : 'text-[#D6D0C5] opacity-60 hover:opacity-100 hover:text-[#B08D57]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 md:space-x-4 pointer-events-auto">
        {/* Luminescent Night Mode Toggle */}
        <button
          onClick={onToggleLume}
          title={isLuminescentMode ? 'Disable Super-LumiNova' : 'Enable Super-LumiNova Night Vision'}
          className={`p-2 md:p-2.5 rounded-full border transition-all duration-300 focus:outline-none ${
            isLuminescentMode
              ? 'bg-[#00FFAA]/20 border-[#00FFAA] text-[#00FFAA] shadow-[0_0_15px_rgba(0,255,170,0.4)]'
              : 'bg-[#111111]/70 border-white/10 text-[#D6D0C5] hover:border-[#B08D57]'
          }`}
          aria-label="Toggle Super-LumiNova Lume"
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        {/* 3D Inspect Orbit Mode Toggle */}
        <button
          onClick={onToggleInspect}
          title={isInspectMode ? 'Exit Free 3D Inspection' : 'Enter Free 3D Inspection'}
          className={`px-3 py-1.5 md:py-2 rounded-full border text-[10px] font-mono tracking-wider flex items-center space-x-2 transition-all duration-300 focus:outline-none ${
            isInspectMode
              ? 'bg-[#B08D57] border-[#B08D57] text-[#070707] font-semibold shadow-[0_0_20px_rgba(176,141,87,0.4)]'
              : 'bg-[#111111]/70 border-white/10 text-[#D6D0C5] hover:border-[#B08D57]'
          }`}
          aria-label="Toggle 3D Orbit Mode"
        >
          <Compass className={`w-3.5 h-3.5 ${isInspectMode ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isInspectMode ? 'INSPECTING' : '3D ORBIT'}</span>
        </button>

        {/* Sound Cadence Toggle */}
        <button
          onClick={onToggleSound}
          title={isMuted ? 'Unmute Mechanical Cadence' : 'Mute Sound'}
          className="p-2 md:p-2.5 rounded-full bg-[#111111]/70 border border-white/10 text-[#D6D0C5] hover:border-[#B08D57] transition-all duration-300 focus:outline-none"
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/40" /> : <Volume2 className="w-3.5 h-3.5 text-[#B08D57]" />}
        </button>

        {/* Geometric 2-Line Minimalist Menu Trigger */}
        <button
          onClick={onOpenMenu}
          className="w-9 h-9 flex flex-col justify-center gap-1.5 cursor-pointer group p-1.5 rounded-lg border border-white/10 hover:border-[#B08D57]/50 bg-[#111111]/60 transition-all focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          <div className="w-full h-[1px] bg-[#D6D0C5] group-hover:bg-[#B08D57] transition-colors" />
          <div className="w-2/3 h-[1px] bg-[#D6D0C5] self-end group-hover:bg-[#B08D57] transition-colors" />
        </button>
      </div>

      {/* Top Scroll Progress Indicator Line */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-[#B08D57] shadow-[0_0_10px_#B08D57] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>
    </header>
  );
};

