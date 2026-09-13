import React from 'react';
import { 
  Minimize2, 
  Maximize2, 
  Calculator,
  Compass,
  Sparkles,
  Layers
} from 'lucide-react';
import { PanchangData } from '../types';
import { VEDIC_NAKSHATRAS } from '../data/nakshatras';

interface RightPanelProps {
  panchang: PanchangData;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  offsetDays: number;
  onOffsetChange: (days: number) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  panchang,
  isMinimized,
  onToggleMinimize,
  offsetDays,
}) => {
  const currentNakshatraData = VEDIC_NAKSHATRAS[panchang.nakshatra.index] || VEDIC_NAKSHATRAS[0];

  // If minimized, render ONLY a compact floating pill
  if (isMinimized) {
    return (
      <div className="pointer-events-auto">
        <button
          id="btn-expand-right-panel"
          onClick={onToggleMinimize}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/95 border border-indigo-500/40 text-indigo-200 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group max-w-[calc(100vw-2rem)]"
          title="Click to expand Astronomical Math & Nakshatra Details"
        >
          <Calculator className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="tracking-wide">खगोलीय गणित (Math)</span>
          <span className="text-slate-400 font-normal shrink-0">|</span>
          <span className="text-sky-300 font-mono font-bold shrink-0">
            Δθ: {panchang.angles.relative.toFixed(1)}°
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-indigo-300/70 group-hover:text-indigo-200 ml-0.5 shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <aside
      id="right-panel"
      className="pointer-events-auto w-full sm:w-96 md:w-[420px] landscape:w-[360px] md:landscape:w-[420px] max-w-[calc(100vw-2rem)] landscape:max-w-[48vw] md:landscape:max-w-[420px] flex flex-col rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 max-h-[calc(100dvh-2rem)] sm:max-h-[85vh] md:max-h-[90vh] overflow-hidden transition-all duration-300"
    >
      {/* Header */}
      <div className="p-3.5 sm:p-4 pb-3 border-b border-white/10 flex items-center justify-between gap-2 bg-gradient-to-r from-indigo-950/20 to-slate-900/80 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner shrink-0">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              खगोलीय गणित व नक्षत्र
            </h2>
            <p className="text-[11px] sm:text-xs text-indigo-200/80 font-medium truncate">
              Astronomical Math & Coordinates
            </p>
          </div>
        </div>

        <button
          id="btn-minimize-right-panel"
          onClick={onToggleMinimize}
          className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          title="Minimize panel"
        >
          <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Content - flex-1 min-h-0 guarantees smooth internal scrolling without container cutoff */}
      <div className="flex-1 min-h-0 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto overscroll-contain custom-scrollbar text-sm">
        {/* Vedic Nakshatra Ritual Icon & Deity Spotlight */}
        <div className="bg-gradient-to-br from-indigo-950/50 via-purple-950/40 to-slate-900/70 p-3 sm:p-4 rounded-xl border border-indigo-500/30 space-y-2.5 sm:space-y-3 shadow-inner">
          <div className="flex items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="text-3xl drop-shadow select-none shrink-0">{currentNakshatraData.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm sm:text-base font-bold text-amber-200 leading-snug break-words">
                  {currentNakshatraData.name} ({currentNakshatraData.transliteration})
                </div>
                <div className="text-xs text-slate-300 font-medium leading-tight break-words mt-0.5">
                  {currentNakshatraData.symbolName}
                </div>
              </div>
            </div>
            {/* Pada Badge - strictly whitespace-nowrap and shrink-0 so it never wraps or clips */}
            <div className="shrink-0 pt-0.5 sm:pt-0">
              <span className="inline-flex items-center justify-center whitespace-nowrap text-xs font-bold text-purple-200 bg-purple-500/30 px-2.5 py-1 rounded-full border border-purple-400/40 shadow-sm">
                चरण {panchang.nakshatra.pada}
              </span>
            </div>
          </div>

          {/* Deity & Ruling Planet - wrapped with break-words so nothing gets truncated */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex flex-col justify-center">
              <span className="text-slate-400 text-[11px] block font-medium">अधिष्ठाता देव (Deity):</span>
              <span className="text-white text-xs sm:text-sm font-bold block mt-0.5 leading-snug break-words">
                {currentNakshatraData.deity}
              </span>
            </div>
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex flex-col justify-center">
              <span className="text-slate-400 text-[11px] block font-medium">स्वामी ग्रह (Lord):</span>
              <span className="text-amber-300 text-xs sm:text-sm font-bold block mt-0.5 leading-snug break-words">
                {currentNakshatraData.rulingPlanet}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-200 italic leading-relaxed bg-white/[0.02] p-2.5 rounded-lg border border-white/5 break-words">
            "{currentNakshatraData.description}"
          </p>
        </div>

        {/* Live Astronomical Coordinates */}
        <div className="bg-slate-900/70 p-3 sm:p-4 rounded-xl border border-white/10 space-y-2.5 sm:space-y-3 shadow-inner">
          <div className="text-xs uppercase font-bold text-slate-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="break-words">सटीक खगोलीय रेखांश (Sidereal Longitudes)</span>
          </div>

          <div className="bg-black/50 rounded-xl p-3 font-mono text-xs text-slate-200 space-y-2 border border-white/10">
            <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
              <span className="text-slate-400">चन्द्र निरयण (Moon):</span>
              <span id="ui-moon-long" className="text-sky-300 font-bold text-sm sm:text-base shrink-0">{panchang.angles.moonSidereal.toFixed(2)}°</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
              <span className="text-slate-400">सूर्य निरयण (Sun):</span>
              <span id="ui-sun-long" className="text-amber-300 font-bold text-sm sm:text-base shrink-0">{panchang.angles.sunSidereal.toFixed(2)}°</span>
            </div>
            <div className="h-px w-full bg-white/10 my-1" />
            <div className="flex justify-between items-center text-blue-300 font-bold text-xs sm:text-sm gap-2">
              <span>कोणीय अंतर (Elongation Δθ):</span>
              <span id="ui-rel-angle" className="text-sm sm:text-base text-blue-200 shrink-0">{panchang.angles.relative.toFixed(2)}°</span>
            </div>
          </div>

          {/* Formulas and Math Breakdown */}
          <div className="space-y-2 pt-1 text-xs">
            <div className="bg-blue-950/40 border border-blue-500/40 rounded-xl p-2.5 sm:p-3 text-center font-mono">
              <div className="text-slate-300 text-xs font-semibold">तिथि गणना सूत्र (Tithi Formula):</div>
              <div className="text-xs sm:text-sm font-bold text-blue-200 mt-1 break-words">
                Tithi = Floor(Δθ / 12°) + 1
              </div>
              <div id="ui-tithi-math" className="text-xs sm:text-sm font-bold text-white mt-1.5 bg-blue-900/30 py-1 px-2 rounded-lg border border-blue-400/20 inline-block max-w-full break-words">
                Floor({panchang.angles.relative.toFixed(1)}° / 12°) + 1 = {panchang.tithi.number} ({panchang.tithi.name})
              </div>
            </div>

            <div className="bg-purple-950/40 border border-purple-500/40 rounded-xl p-2.5 sm:p-3 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-300">नक्षत्र विभाजन (27 Nakshatras):</span>
                <span className="text-purple-300 font-bold text-xs sm:text-sm shrink-0">360° / 27 = 13°20'</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-300">लाहिड़ी अयनांश (Lahiri Ayanamsa):</span>
                <span id="ui-ayanamsa" className="text-white font-bold text-xs sm:text-sm shrink-0">{panchang.angles.ayanamsa.toFixed(2)}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
