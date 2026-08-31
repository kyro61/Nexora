import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onLoaded, 700);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12 + 6);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#070707] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="space-y-6 max-w-sm w-full">
        {/* Brand Display */}
        <div className="space-y-2">
          <div className="text-3xl md:text-4xl font-bold tracking-[0.35em] text-[#D6D0C5] uppercase font-serif">
            NOXORA
          </div>
          <div className="text-[10px] tracking-[0.45em] text-[#B08D57] font-mono uppercase">
            TIME, REFINED
          </div>
        </div>

        {/* Oscillating Calibration Bar */}
        <div className="space-y-2 pt-4">
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div
              className="h-full bg-[#B08D57] transition-all duration-150 ease-out shadow-[0_0_10px_#B08D57]"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 tracking-wider">
            <span>CALIBRATING PRECISION</span>
            <span className="text-[#B08D57] font-semibold">{Math.min(100, progress)}%</span>
          </div>
        </div>

        <div className="text-[9px] font-mono text-white/30 tracking-[0.25em] pt-6">
          GENÈVE • MANUFACTURE HORLOGÈRE
        </div>
      </div>
    </div>
  );
};
