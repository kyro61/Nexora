import React from 'react';
import { X, Shield, Clock, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { WatchModelSpec } from '../types';

interface ProductDetailModalProps {
  watch: WatchModelSpec | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAndInspect: (watchId: string) => void;
  onOpenConsultation: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  watch,
  isOpen,
  onClose,
  onSelectAndInspect,
  onOpenConsultation
}) => {
  if (!isOpen || !watch) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070707]/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#0c0c0e] border border-[#B08D57]/30 rounded-2xl max-w-4xl w-full p-6 md:p-12 relative text-[#D6D0C5] shadow-[0_0_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
        {/* Subtle geometric dot grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full bg-geometric-grid opacity-10 pointer-events-none" />

        {/* Top Gold Accent */}
        <div className="w-12 h-[1px] bg-[#B08D57] mb-6" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-[#D6D0C5] hover:text-white hover:border-[#B08D57] transition-all focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="text-xs font-mono tracking-[0.3em] text-[#B08D57] uppercase">
            MASTER CHRONOMETER SPECIFICATION
          </div>
          <h1 className="text-3xl md:text-4xl font-serif tracking-wider text-white mt-1">
            {watch.name}
          </h1>
          <div className="text-sm font-mono text-white/60 mt-1">{watch.subtitle}</div>
          <div className="text-2xl font-serif text-[#B08D57] mt-3">{watch.price}</div>
        </div>

        {/* Overview Story */}
        <div className="py-6">
          <p className="text-sm md:text-base font-light text-white/80 leading-relaxed">
            {watch.description}
          </p>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-y border-white/10">
          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="text-[10px] font-mono tracking-widest text-[#B08D57] uppercase">
              CASE ARCHITECTURE
            </div>
            <div className="text-sm font-medium text-white mt-1">{watch.caseMaterial}</div>
            <div className="text-xs font-mono text-white/50 mt-1">
              Diameter {watch.caseDiameter} • Height {watch.caseThickness}
            </div>
          </div>

          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="text-[10px] font-mono tracking-widest text-[#B08D57] uppercase">
              CALIBRE & ESCAPEMENT
            </div>
            <div className="text-sm font-medium text-white mt-1">{watch.caliber}</div>
            <div className="text-xs font-mono text-white/50 mt-1">
              {watch.frequency} • {watch.jewels} Jewels
            </div>
          </div>

          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="text-[10px] font-mono tracking-widest text-[#B08D57] uppercase">
              AUTONOMY & DEPTH
            </div>
            <div className="text-sm font-medium text-white mt-1">{watch.powerReserve} Reserve</div>
            <div className="text-xs font-mono text-white/50 mt-1">
              Water Resistance: {watch.waterResistance}
            </div>
          </div>
        </div>

        {/* Strap & Finishing */}
        <div className="py-6 space-y-3">
          <div className="text-xs font-mono text-[#B08D57] uppercase tracking-wider">
            STRAP & ATTACHMENT
          </div>
          <p className="text-xs md:text-sm font-mono text-white/70">
            {watch.strap}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <button
            onClick={() => {
              onSelectAndInspect(watch.id);
              onClose();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-[#070707] transition-all font-mono text-xs tracking-[0.2em] uppercase font-semibold focus:outline-none"
          >
            LOAD INTO 3D SCENE
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B08D57] hover:bg-[#c29d63] text-[#070707] font-semibold font-mono text-xs tracking-[0.2em] uppercase transition-all shadow-[0_0_25px_rgba(176,141,87,0.3)] focus:outline-none"
          >
            ACQUIRE TIMEPIECE
          </button>
        </div>
      </div>
    </div>
  );
};
