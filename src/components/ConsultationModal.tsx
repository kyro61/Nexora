import React, { useState } from 'react';
import { X, Check, Calendar, MapPin, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { WATCH_COLLECTION } from '../data/watchData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModelId?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  selectedModelId = 'aurelis'
}) => {
  const [model, setModel] = useState(selectedModelId);
  const [city, setCity] = useState('Geneva');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070707]/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#0c0c0e] border border-[#B08D57]/30 rounded-2xl max-w-2xl w-full p-6 md:p-10 relative text-[#D6D0C5] shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Subtle geometric dot grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full bg-geometric-grid opacity-10 pointer-events-none" />

        {/* Top Gold Geometric Accent */}
        <div className="w-12 h-[1px] bg-[#B08D57] mb-6" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-[#D6D0C5] hover:text-white hover:border-[#B08D57] transition-all focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#B08D57]/20 border border-[#B08D57] text-[#B08D57] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="text-2xl font-serif tracking-wider text-white">
              SALON APPOINTMENT REQUESTED
            </div>
            <p className="text-sm font-mono text-white/70 max-w-md mx-auto leading-relaxed">
              Our Master Horologist Concierge will contact you within 4 hours to confirm your private viewing in {city}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 bg-[#B08D57] text-[#070707] font-semibold text-xs font-mono tracking-[0.25em] uppercase rounded-full hover:bg-[#c29d63] transition-colors"
            >
              RETURN TO EXPERIENCE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-[#B08D57] uppercase">
                PRIVATE HOROLOGY SALON
              </div>
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-white mt-1">
                REQUEST A PRIVATE VIEWING
              </h2>
              <p className="text-xs font-mono text-white/60 mt-1">
                Experience NOXORA timepieces in an exclusive one-on-one session with our certified master watchmakers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Timepiece Selection */}
              <div>
                <label className="block text-[11px] font-mono text-white/70 mb-2 uppercase tracking-wider">
                  TIMEPIECE OF INTEREST
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#17171a] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#D6D0C5] focus:border-[#B08D57] focus:outline-none"
                >
                  {WATCH_COLLECTION.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} — {w.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Boutique Location */}
              <div>
                <label className="block text-[11px] font-mono text-white/70 mb-2 uppercase tracking-wider">
                  SALON LOCATION
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#17171a] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#D6D0C5] focus:border-[#B08D57] focus:outline-none"
                >
                  <option value="Geneva">Geneva Atelier (Rue du Rhône)</option>
                  <option value="Zurich">Zurich Salon (Bahnhofstrasse)</option>
                  <option value="Tokyo">Tokyo Ginza Maison</option>
                  <option value="New York">New York Flagship (5th Ave)</option>
                  <option value="VIP Private Concierge">VIP Concierge at Private Residence</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-white/70 mb-2 uppercase tracking-wider">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Wright"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#17171a] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#D6D0C5] focus:border-[#B08D57] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/70 mb-2 uppercase tracking-wider">
                    CONFIDENTIAL EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alexander@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#17171a] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#D6D0C5] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/70 mb-2 uppercase tracking-wider">
                    DIRECT TELEPHONE
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+41 22 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#17171a] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#D6D0C5] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[10px] font-mono text-white/40">
              <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
              <span>Strict Swiss confidentiality & data discretion guaranteed.</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#B08D57] hover:bg-[#c29d63] text-[#070707] font-semibold text-xs font-mono tracking-[0.25em] uppercase rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(176,141,87,0.4)] focus:outline-none"
            >
              CONFIRM PRIVATE CONSULTATION
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
