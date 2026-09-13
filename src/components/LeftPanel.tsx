import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Minimize2, 
  Maximize2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { PanchangData, FestivalInfo } from '../types';
import { VEDIC_NAKSHATRAS } from '../data/nakshatras';

interface LeftPanelProps {
  panchang: PanchangData;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  offsetDays: number;
  onOffsetChange: (days: number) => void;
  onFestivalSelect: (fest: FestivalInfo) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  panchang,
  isMinimized,
  onToggleMinimize,
  offsetDays,
  onOffsetChange,
  onFestivalSelect: _onFestivalSelect,
}) => {
  const formattedDate = new Intl.DateTimeFormat('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(panchang.date);

  const englishDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(panchang.date);

  // If minimized, render ONLY a compact floating pill
  if (isMinimized) {
    return (
      <div className="pointer-events-auto">
        <button
          id="btn-expand-left-panel"
          onClick={onToggleMinimize}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/95 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group max-w-[calc(100vw-2rem)]"
          title="Click to expand Vedic Panchang details"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="tracking-wide shrink-0">वैदिक पंचांग</span>
          <span className="text-slate-400 font-normal shrink-0">|</span>
          <span className="text-blue-300 font-bold truncate">{panchang.tithi.name} ({panchang.paksha})</span>
          <Maximize2 className="w-3.5 h-3.5 text-amber-300/70 group-hover:text-amber-200 ml-0.5 shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <aside
      id="left-panel"
      className="pointer-events-auto w-full sm:w-96 md:w-[420px] landscape:w-[360px] md:landscape:w-[420px] max-w-[calc(100vw-2rem)] landscape:max-w-[48vw] md:landscape:max-w-[420px] flex flex-col rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 max-h-[calc(100dvh-2rem)] sm:max-h-[85vh] md:max-h-[90vh] overflow-hidden transition-all duration-300"
    >
      {/* Header with clear bold title */}
      <div className="p-3.5 sm:p-4 pb-3 border-b border-white/10 flex items-center justify-between gap-2 bg-gradient-to-r from-amber-950/20 to-slate-900/80 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight truncate">
              वैदिक पंचांग
            </h1>
            <p className="text-[11px] sm:text-xs text-amber-200/80 font-medium truncate">
              उत्तर भारतीय प्रणाली (पूर्णिमांत)
            </p>
          </div>
        </div>

        <button
          id="btn-minimize-left-panel"
          onClick={onToggleMinimize}
          className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          title="Minimize panel"
        >
          <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Scrollable Content - flex-1 min-h-0 prevents container cutoffs */}
      <div className="flex-1 min-h-0 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto overscroll-contain custom-scrollbar text-sm">
        {/* Active Festival Banner (if today matches a holy day) */}
        {panchang.activeFestival && (
          <div
            id="festival-banner"
            className={`rounded-xl p-3 sm:p-3.5 bg-gradient-to-r ${panchang.activeFestival.colors} text-white shadow-lg border border-white/30 relative overflow-hidden`}
          >
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-3xl sm:text-4xl drop-shadow-md select-none shrink-0">
                {panchang.activeFestival.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-white/90 uppercase tracking-widest">
                  शुभ पर्व • Major Holy Day
                </div>
                <div className="text-base sm:text-lg font-extrabold text-white drop-shadow break-words leading-tight">
                  {panchang.activeFestival.hindiName}
                </div>
                <div className="text-xs text-white/90 break-words mt-0.5">
                  {panchang.activeFestival.name}
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/15 rounded-full blur-xl pointer-events-none" />
          </div>
        )}

        {/* Date Display and Unified Day Stepper + Interactive Time Slider */}
        <div className="bg-slate-900/70 p-3 sm:p-3.5 rounded-xl border border-white/10 shadow-inner space-y-2.5 sm:space-y-3">
          {/* Top row: Gregorian Date & Step buttons */}
          <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-amber-300 font-semibold min-w-0 flex-1">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="break-words leading-tight">{englishDate}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onOffsetChange(parseFloat((offsetDays - 1).toFixed(1)))}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
                title="Previous day (-1 day)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOffsetChange(parseFloat((offsetDays + 1).toFixed(1)))}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
                title="Next day (+1 day)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {offsetDays !== 0 && (
                <button
                  id="btn-reset-date"
                  onClick={() => onOffsetChange(0)}
                  className="px-2 py-1 text-xs rounded-lg bg-amber-500/25 hover:bg-amber-500/35 text-amber-300 font-semibold flex items-center gap-1 border border-amber-500/30 transition-colors ml-1 whitespace-nowrap"
                  title="Reset to today"
                >
                  <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                  <span>आज (Today)</span>
                </button>
              )}
            </div>
          </div>

          {/* Hindi Localized Date & Subtitle */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-100 break-words leading-snug">{formattedDate}</p>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="break-words">स्थानीय समय व निर्देशांक (Geocentric)</span>
            </div>
          </div>

          {/* Integrated Time Slider */}
          <div className="pt-1 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">समय चक्र (Time Offset):</span>
              <span className="text-amber-300 font-mono font-bold bg-white/10 px-2 py-0.5 rounded text-xs whitespace-nowrap">
                {offsetDays > 0 ? `+${offsetDays.toFixed(1)} दिन` : `${offsetDays.toFixed(1)} दिन`}
              </span>
            </div>

            <input
              id="time-slider-left"
              type="range"
              min="-30"
              max="30"
              step="0.2"
              value={offsetDays}
              onChange={(e) => onOffsetChange(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span className="shrink-0">-30 दिन</span>
              <span className="text-slate-300 font-medium text-center truncate px-1">तिथियों व नक्षत्रों का चक्र</span>
              <span className="shrink-0">+30 दिन</span>
            </div>
          </div>
        </div>

        {/* Core Panchang Attributes Grid */}
        <div className="space-y-2 sm:space-y-2.5">
          {/* Tithi */}
          <div className="flex justify-between items-center bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10 gap-2">
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold">तिथि (Tithi)</span>
              <span className="text-slate-200 text-xs sm:text-sm font-medium">{panchang.paksha} पक्ष</span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-base sm:text-lg font-bold text-sky-300 block whitespace-nowrap">{panchang.tithi.name}</span>
              <span className="text-xs text-sky-400 font-medium font-mono whitespace-nowrap">तिथि {panchang.tithi.number} / 15</span>
            </div>
          </div>

          {/* Nakshatra with large ritual emoji symbol */}
          <div className="flex justify-between items-center bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10 gap-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="text-2xl sm:text-3xl select-none shrink-0" title="वैदिक नक्षत्र प्रतीक">
                {VEDIC_NAKSHATRAS[panchang.nakshatra.index]?.emoji || "⭐"}
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold">नक्षत्र (Nakshatra)</span>
                <span className="text-slate-300 text-xs break-words leading-tight mt-0.5">
                  {VEDIC_NAKSHATRAS[panchang.nakshatra.index]?.symbolName || `स्वामी: ${panchang.nakshatra.lord}`}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-base sm:text-lg font-bold text-purple-300 block whitespace-nowrap">{panchang.nakshatra.name}</span>
              <span className="text-xs text-purple-400 font-semibold font-mono whitespace-nowrap">चरण (Pada) {panchang.nakshatra.pada}</span>
            </div>
          </div>

          {/* Maas & Vaar */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold block">मास (Month)</span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block break-words leading-snug">{panchang.maas}</span>
            </div>
            <div className="bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold block">वार (Day)</span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block break-words leading-snug">{panchang.vaar.split(' ')[0]}</span>
            </div>
          </div>

          {/* Moon & Sun Sign (Rashi) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold block">चन्द्र राशि (Moon Sign)</span>
              <span className="text-xs sm:text-sm font-bold text-sky-300 mt-0.5 block break-words leading-snug">{panchang.moonRashi}</span>
            </div>
            <div className="bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold block">सूर्य राशि (Sun Sign)</span>
              <span className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5 block break-words leading-snug">{panchang.sunRashi}</span>
            </div>
          </div>

          {/* Yoga & Karana */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold block">योग (Yoga)</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-300 mt-0.5 block break-words leading-snug">{panchang.yoga}</span>
            </div>
            <div className="bg-white/[0.04] p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[11px] sm:text-xs uppercase font-semibold block">करण (Karana)</span>
              <span className="text-xs sm:text-sm font-bold text-teal-300 mt-0.5 block break-words leading-snug">{panchang.karana}</span>
            </div>
          </div>

          {/* Samvatsar & Manvantar */}
          <div className="flex justify-between items-center bg-white/[0.03] px-3 py-2 rounded-xl border border-white/10 text-xs gap-2">
            <span className="text-slate-400 font-medium">विक्रम संवत्सर (Samvat)</span>
            <span className="text-slate-100 font-bold break-words">{panchang.samvatsar}</span>
          </div>

          <div className="flex justify-between items-center bg-white/[0.03] px-3 py-2 rounded-xl border border-white/10 text-xs gap-2">
            <span className="text-slate-400 font-medium">मन्वन्तर (Manvantara)</span>
            <span className="text-slate-200 font-medium break-words">वैवस्वत मन्वन्तर (सातवाँ)</span>
          </div>
        </div>

        {/* Quick Festival Jump Shortcuts */}
        <div className="pt-1 sm:pt-2">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
            पर्व दर्शन (Festival Alignments)
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { name: "दीपावली", offset: 45, icon: "🪔" },
              { name: "होली", offset: 160, icon: "🎨" },
              { name: "महाशिवरात्रि", offset: 145, icon: "🕉️" },
              { name: "श्रीकृष्ण जन्माष्टमी", offset: -20, icon: "🦚" },
              { name: "श्रीराम नवमी", offset: 200, icon: "🏹" },
            ].map((fest) => (
              <button
                key={fest.name}
                onClick={() => onOffsetChange(fest.offset)}
                className="text-xs px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition-all flex items-center gap-1.5 font-medium shadow-sm active:scale-95"
              >
                <span className="text-sm">{fest.icon}</span>
                <span>{fest.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
