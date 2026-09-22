import React, { useState, useMemo } from 'react';
import { CelestialCanvas } from './components/CelestialCanvas';
import { LeftPanel } from './components/LeftPanel';
import { TopRightControls } from './components/TopRightControls';
import { FormulaGuideModal } from './components/FormulaGuideModal';
import { calculatePanchang } from './utils/panchang';
import { FestivalInfo } from './types';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [baseDate] = useState<Date>(() => new Date());
  const [offsetDays, setOffsetDays] = useState<number>(0);

  // Initialize minimization: on smaller mobile screens, minimize left panel by default so canvas is immediately visible
  const [isLeftMinimized, setIsLeftMinimized] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });

  const [isMathGuideOpen, setIsMathGuideOpen] = useState<boolean>(false);

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

  return (
    <LanguageProvider defaultLanguage="hi">
      <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#070b16] text-slate-100 select-none">
        {/* 3D WebGL Canvas Layer */}
        <CelestialCanvas panchang={panchang} offsetDays={offsetDays} />

        {/* UI Overlay Layer: pointer-events-none ensures all empty canvas space is draggable and interactive */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-2 sm:p-4 md:p-5 overflow-hidden">
          {/* Top row: Left Panel (Panchang + Math) on Left, Single Control Hub on Right */}
          <div className="relative flex flex-row items-start justify-between gap-2 sm:gap-3 w-full">
            {/* Unified Left Panel: in-flow when minimized, overlay modal on mobile when open so it's never squished */}
            <div className={isLeftMinimized ? 'relative shrink-0' : 'fixed inset-x-2 top-2 sm:static sm:inset-auto z-30 sm:z-auto'}>
              <LeftPanel
                panchang={panchang}
                baseDate={baseDate}
                isMinimized={isLeftMinimized}
                onToggleMinimize={() => setIsLeftMinimized((prev) => !prev)}
                offsetDays={offsetDays}
                onOffsetChange={(days) => setOffsetDays(days)}
                onFestivalSelect={handleFestivalSelect}
              />
            </div>

            {/* Top-Right Controls: Learn Math + The Single Language Toggle */}
            <div className="ml-auto shrink-0 z-20">
              <TopRightControls onOpenMathGuide={() => setIsMathGuideOpen(true)} />
            </div>
          </div>
        </div>

        {/* Learn Math Educational Modal */}
        <FormulaGuideModal
          isOpen={isMathGuideOpen}
          onClose={() => setIsMathGuideOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
