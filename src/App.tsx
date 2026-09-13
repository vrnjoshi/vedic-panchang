import React, { useState, useMemo } from 'react';
import { CelestialCanvas } from './components/CelestialCanvas';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { calculatePanchang } from './utils/panchang';
import { FestivalInfo } from './types';

export default function App() {
  const [baseDate] = useState<Date>(() => new Date());
  const [offsetDays, setOffsetDays] = useState<number>(0);

  // Initialize minimization: on smaller mobile screens, minimize left panel by default so canvas is immediately visible!
  const [isLeftMinimized, setIsLeftMinimized] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });
  const [isRightMinimized, setIsRightMinimized] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 1024;
  });

  // Calculate simulated date based on base date and offset
  const simulatedDate = useMemo(() => {
    const timeMs = baseDate.getTime() + offsetDays * 86400000;
    return new Date(timeMs);
  }, [baseDate, offsetDays]);

  // Astronomical panchang data calculated with Jean Meeus & Lahiri Ayanamsa algorithms
  const panchang = useMemo(() => {
    return calculatePanchang(simulatedDate);
  }, [simulatedDate]);

  const handleFestivalSelect = (_fest: FestivalInfo) => {
    // Optional jump callback
  };

  // On small/mobile screens, expanding one panel automatically minimizes the other to prevent vertical overflow
  const handleToggleLeft = () => {
    setIsLeftMinimized((prev) => {
      const willExpand = prev; // if prev is true (minimized), it will expand
      if (willExpand && typeof window !== 'undefined' && window.innerWidth < 768) {
        setIsRightMinimized(true);
      }
      return !prev;
    });
  };

  const handleToggleRight = () => {
    setIsRightMinimized((prev) => {
      const willExpand = prev;
      if (willExpand && typeof window !== 'undefined' && window.innerWidth < 768) {
        setIsLeftMinimized(true);
      }
      return !prev;
    });
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#070b16] text-slate-100 select-none">
      {/* 3D WebGL Canvas Layer (Earth with axial tilt, Sun, Moon with tidal locking, Orbits, Tithi Arc, Vedic 27 Nakshatras Ring, and 3,500+ Stars) */}
      <CelestialCanvas panchang={panchang} offsetDays={offsetDays} />

      {/* UI Overlay Layer: pointer-events-none ensures all empty canvas space is draggable and interactive */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-2 sm:p-4 md:p-5 overflow-hidden">
        {/* Responsive Panels Layout: Stacks vertically in mobile portrait, sits side-by-side in landscape and desktop */}
        <div className="flex flex-col landscape:flex-row md:flex-row items-start justify-between gap-2.5 sm:gap-3 w-full max-h-full">
          {/* Left Panel: Panchang Information */}
          <LeftPanel
            panchang={panchang}
            isMinimized={isLeftMinimized}
            onToggleMinimize={handleToggleLeft}
            offsetDays={offsetDays}
            onOffsetChange={(days) => setOffsetDays(days)}
            onFestivalSelect={handleFestivalSelect}
          />

          {/* Right Panel: Time Simulator, Math, and Coordinate Calculations */}
          <RightPanel
            panchang={panchang}
            isMinimized={isRightMinimized}
            onToggleMinimize={handleToggleRight}
            offsetDays={offsetDays}
            onOffsetChange={(days) => setOffsetDays(days)}
          />
        </div>

        {/* Minimalist Hint Bar on Desktop */}
        <div className="hidden sm:flex justify-center pointer-events-none pb-1">
          <div className="px-3.5 py-1 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md text-[11px] text-slate-400 shadow-md">
            <span>🖱️ Drag to rotate 3D celestial sphere • Scroll / Pinch to zoom • Moon faces Earth (Tidal Locked)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
