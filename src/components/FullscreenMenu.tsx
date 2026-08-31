import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { WATCH_COLLECTION } from '../data/watchData';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
  onSelectModel: (modelId: string) => void;
  onOpenConsultation: () => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onSelectModel,
  onOpenConsultation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070707]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-16 overflow-y-auto animate-fadeIn relative">
      {/* Geometric background dot pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-geometric-grid opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 relative z-10">
        <div>
          <div className="text-2xl font-light tracking-[0.4em] text-[#B08D57] uppercase font-serif">
            NOXORA
          </div>
          <div className="text-[10px] tracking-[0.35em] text-[#D6D0C5]/50 font-mono uppercase">
            MANUFACTURE D'HORLOGERIE GENÈVE
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full border border-white/10 text-[#D6D0C5] hover:text-white hover:border-[#B08D57] transition-all duration-300 focus:outline-none cursor-pointer"
          aria-label="Close Menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
        {/* Navigation Sections */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-[11px] font-mono tracking-[0.3em] text-[#B08D57] uppercase">
            CINEMATIC TIMELINE
          </div>
          <div className="space-y-4">
            {[
              { label: '01 / VOID SILHOUETTE', id: 'scene-void' },
              { label: '02 / FIRST REVEAL', id: 'scene-reveal' },
              { label: '03 / SPATIAL ORBIT', id: 'scene-orbit' },
              { label: '04 / SAPPHIRE PENETRATION', id: 'scene-crystal' },
              { label: '05 / CALIBRE NX-901 MECHANISM', id: 'scene-mechanism' },
              { label: '06 / EXPLODED ARCHITECTURE', id: 'scene-exploded' },
              { label: '07 / ATELIER CRAFTSMANSHIP', id: 'scene-craft' },
              { label: '08 / SPATIAL COLLECTION', id: 'scene-collection' },
              { label: '09 / HERO FINALE', id: 'scene-final' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id);
                  onClose();
                }}
                className="block text-left text-xl md:text-2xl font-serif tracking-[0.1em] text-[#D6D0C5]/80 hover:text-white hover:translate-x-3 transition-all duration-300 focus:outline-none group cursor-pointer"
              >
                <span className="group-hover:text-[#B08D57] transition-colors">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Collection Direct Select */}
        <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
          <div className="text-[11px] font-mono tracking-[0.3em] text-[#B08D57] uppercase">
            THE ATELIER COLLECTION
          </div>
          <div className="space-y-4">
            {WATCH_COLLECTION.map((watch) => (
              <div
                key={watch.id}
                onClick={() => {
                  onSelectModel(watch.id);
                  onClose();
                }}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#B08D57]/40 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="font-serif text-lg tracking-wider text-[#D6D0C5] group-hover:text-white">
                    {watch.name}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-white/50 font-mono mt-1">{watch.subtitle}</div>
                <div className="text-xs text-[#B08D57] font-mono mt-2">{watch.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Boutique & Consultation */}
        <div className="lg:col-span-3 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
          <div className="text-[11px] font-mono tracking-[0.3em] text-[#B08D57] uppercase">
            ATELIER & BOUTIQUES
          </div>
          
          <div className="space-y-4 text-xs font-mono text-white/70">
            <div>
              <div className="text-[#D6D0C5] font-semibold">GENÈVE MANUFACTURE</div>
              <div className="text-white/50">Rue du Rhône 42, 1204 Genève</div>
              <div className="text-white/50">+41 22 819 00 00</div>
            </div>

            <div>
              <div className="text-[#D6D0C5] font-semibold">ZÜRICH SALON</div>
              <div className="text-white/50">Bahnhofstrasse 18, 8001 Zürich</div>
            </div>

            <div>
              <div className="text-[#D6D0C5] font-semibold">TOKYO GINZA</div>
              <div className="text-white/50">6-10-1 Ginza, Chuo-ku, Tokyo</div>
            </div>

            <div>
              <div className="text-[#D6D0C5] font-semibold">NEW YORK FLAGSHIP</div>
              <div className="text-white/50">645 Fifth Avenue, New York, NY</div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full py-3.5 bg-[#B08D57] hover:bg-[#c29d63] text-[#070707] font-semibold text-xs font-mono tracking-[0.25em] uppercase rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(176,141,87,0.3)] focus:outline-none cursor-pointer"
            >
              BOOK PRIVATE SALON
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-6 text-[10px] font-mono text-white/40 tracking-wider">
        <div>© 2026 NOXORA MANUFACTURE HORLOGÈRE S.A. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <span>SWISS MADE</span>
          <span>COSC CHRONOMETER</span>
          <span>MASTER REGULATION</span>
        </div>
      </div>
    </div>
  );
};
