import React, { useState } from 'react';
import { 
  Minimize2, 
  Maximize2, 
  Calculator, 
  Compass, 
  X, 
  BookOpen 
} from 'lucide-react';
import { PanchangData } from '../types';
import { VEDIC_NAKSHATRAS } from '../data/nakshatras';

interface RightPanelProps {
  panchang: PanchangData;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  panchang,
  isMinimized,
  onToggleMinimize,
}) => {
  const [showFormulaGuide, setShowFormulaGuide] = useState<boolean>(false);
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
              खगोलीय गणित व नक्षत्र (Math & Nakshatras)
            </h2>
            <p className="text-[11px] sm:text-xs text-indigo-200/80 font-medium truncate">
              Astronomical Math & Coordinates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            id="btn-open-math-guide"
            onClick={() => setShowFormulaGuide(true)}
            className="p-1.5 sm:p-2 rounded-xl text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex items-center gap-1 text-xs font-semibold"
            title="सूत्र व्याख्या (Learn Astronomical Formulas)"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">सूत्र सीखें (Learn)</span>
          </button>

          <button
            id="btn-minimize-right-panel"
            onClick={onToggleMinimize}
            className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            title="Minimize panel"
          >
            <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
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
                चरण (Pada) {panchang.nakshatra.pada}
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
              <div className="flex justify-between items-center gap-2 pt-1 border-t border-purple-500/20">
                <span className="text-slate-400 text-[11px]">चन्द्र कक्षा झुकाव (Orbital Tilt):</span>
                <span className="text-teal-300 font-bold text-xs shrink-0">~5.14° (विक्षेप {panchang.angles.moonLatitude ?? 5.14}°)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal: Deep Mathematical & Astronomical Explanation */}
      {showFormulaGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">पंचांग खगोलीय गणित व सूत्र रहस्य</h3>
                  <p className="text-[11px] sm:text-xs text-amber-200/80">Mathematical Foundations of Vedic Astronomy</p>
                </div>
              </div>
              <button
                onClick={() => setShowFormulaGuide(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed custom-scrollbar">
              
              {/* 1. Nirayana Longitudes & The 5.14° Lunar Orbital Tilt */}
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10 space-y-2">
                <div className="text-amber-300 font-bold flex items-center gap-1.5 text-sm">
                  <span>1. सूर्य निरयण, चन्द्र निरयण तथा 5.14° (7°) कक्षीय झुकाव • Nirayana Longitudes & 5.14° Lunar Orbital Tilt</span>
                </div>
                <p>
                  <strong>सायन (Sayana / Tropical):</strong> स्थिति पृथ्वी के विषुव (Equinoxes) पर आधारित होती है। 
                  क्योंकि पृथ्वी की घूर्णन धुरी में 25,772 वर्षों का अयन-चक्र (Axial Precession) है, इसलिए विषुव प्रति वर्ष ~50.3 विकला (arcseconds) पीछे खिसकता है।
                  <br />
                  <span className="text-slate-300 text-xs"><em>(Sayana measures celestial positions relative to the moving Earth vernal equinox, which drifts backward due to precession).</em></span>
                </p>
                <p>
                  <strong>निरयण (Nirayana / Sidereal):</strong> स्थिर तारों (जैसे चित्रा नक्षत्र तारा - Spica) के सापेक्ष वास्तविक स्थिति।
                  <br />
                  <span className="text-slate-300 text-xs"><em>(Nirayana measures true positions against fixed stars, subtracting the Lahiri Ayanamsa angle ~24.2°).</em></span>
                  <br />
                  <code className="text-sky-300 bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs block my-1">सूर्य निरयण (Sun Sidereal) = Tropical Sun - Ayanamsa (24.23°)</code>
                  <code className="text-sky-300 bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs block my-1">चन्द्र निरयण (Moon Sidereal) = Tropical Moon - Ayanamsa (24.23°)</code>
                </p>
                <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg text-amber-100">
                  <strong>कक्षीय झुकाव (Lunar Orbital Inclination & 7° Angle):</strong> चन्द्रमा की कक्षा पृथ्वी-सूर्य की क्रान्तिवृत्त तल (Ecliptic plane) पर सपाट नहीं है, बल्कि औसतन <strong>5.145° (लगभग 5° 9' से 5° 18' तक, कभी-कभी 5° से 7° के बीच प्रेक्षित)</strong> के कोण पर झुकी हुई है। 
                  ज्योतिष व पंचांग में तिथि तथा नक्षत्र केवल <em>दीर्घवृत्तीय रेखांश (Ecliptic Longitude λ)</em> के कोणीय अंतर पर निर्धारित होते हैं, जबकि 5.14° का यह झुकाव (Ecliptic Latitude β) चन्द्रमा के राहु-केतु (पात / Lunar Nodes) पर कटने से सूर्य/चन्द्र ग्रहण (Solar/Lunar Eclipses) का समय निर्धारित करता है।
                  <br />
                  <span className="text-amber-200/80 text-xs block mt-1.5">
                    <em>The Moon revolves inclined at ~5.14° (often approximated to 5°-7° in classical observation) relative to the Earth-Sun ecliptic plane. Tithi and Nakshatras depend purely on longitudinal difference (Δθ along ecliptic), whereas this orbital inclination angle determines lunar latitude and eclipses (when the Moon crosses Rahu/Ketu nodes).</em>
                  </span>
                </div>
              </div>

              {/* 2. Why Divide by 27 and Why "+ 1" */}
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10 space-y-2">
                <div className="text-purple-300 font-bold flex items-center gap-1.5 text-sm">
                  <span>2. 27 का भाग और "+ 1" क्यों होता है? • Why Divide by 27 and Why "+ 1"?</span>
                </div>
                <ul className="list-disc list-inside space-y-2 pl-1">
                  <li>
                    <strong>27 नक्षत्रों में विभाजन (Division by 27 Nakshatras):</strong> संपूर्ण भचक्र 360° का होता है। चन्द्रमा पृथ्वी का चक्कर लगभग 27.3 दिनों में लगाता है। 
                    ऋषियों ने 360° के आकाश को 27 समान भागों में बाँटा: 
                    <br />
                    <code className="text-purple-300 bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs">360° ÷ 27 = 13° 20' (13.3333°) प्रति नक्षत्र (per Nakshatra)</code>।
                    <br />
                    प्रत्येक नक्षत्र के 4 चरण (Padas) होते हैं: <code className="text-purple-300 bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs">13°20' ÷ 4 = 3° 20'</code>।
                    <br />
                    <span className="text-slate-300 text-xs"><em>(The 360° celestial zodiac is divided into 27 equal stellar sectors corresponding to the Moon's sidereal period of ~27.3 days).</em></span>
                  </li>
                  <li>
                    <strong>फॉर्मूले में "+ 1" क्यों है? (Why "+ 1" in the Formula?):</strong>
                    <br />
                    गणित में जब हम <code className="text-yellow-300 font-mono">Floor(कोणीय अंतर / 12°)</code> निकालते हैं:
                    <br />
                    जब चन्द्रमा और सूर्य एक ही अंश पर होते हैं (0° से 11.99° के बीच), तब <code className="text-yellow-300 font-mono">Floor(0° / 12°) = 0</code> आता है।
                    <br />
                    परन्तु पंचांग में <strong>शून्यवीं (0th) तिथि नहीं होती!</strong> पहली तिथि का नाम <em>प्रतिपदा (1st Tithi)</em> होता है। 
                    अतः 0-आधारित गणितीय भागफल को प्रथम तिथि बनाने के लिए सूत्र में <strong>+ 1</strong> जोड़ा जाता है:
                    <br />
                    <code className="text-emerald-300 font-mono bg-black/40 px-2 py-1 rounded block my-1 text-xs">
                      Tithi = Floor( (चन्द्र रेखांश - सूर्य रेखांश) / 12° ) + 1
                    </code>
                    यही नियम नक्षत्र गणना पर भी लागू होता है: <code className="text-purple-300 font-mono text-xs">Nakshatra = Floor(चन्द्र निरयण / 13.333°) + 1</code> (0वां नक्षत्र नहीं, 1ला अश्विनी है)।
                    <br />
                    <span className="text-slate-300 text-xs"><em>(Standard division yields 0 for the first 12° interval [0°, 12°). Since Vedic calendar counting starts from Tithi 1 (Pratipada) rather than index 0, adding +1 converts zero-indexed math into 1-indexed calendar tithis).</em></span>
                  </li>
                </ul>
              </div>

              {/* 3. Live Values Applied Right Now */}
              <div className="bg-blue-950/30 p-3.5 rounded-xl border border-blue-500/30 space-y-1.5 font-mono text-xs">
                <div className="text-blue-300 font-bold text-xs uppercase tracking-wider font-sans">
                  वर्तमान सिमुलेशन में सजीव गणना (Current Live Calculation):
                </div>
                <div className="text-slate-300">
                  चन्द्र निरयण = {panchang.angles.moonSidereal.toFixed(2)}°
                </div>
                <div className="text-slate-300">
                  सूर्य निरयण = {panchang.angles.sunSidereal.toFixed(2)}°
                </div>
                <div className="text-sky-300 font-bold">
                  कोणीय अंतर (Δθ) = {panchang.angles.relative.toFixed(2)}°
                </div>
                <div className="text-emerald-300 font-bold pt-1 border-t border-white/10">
                  Floor({panchang.angles.relative.toFixed(2)}° / 12°) + 1 = {panchang.tithi.number} ({panchang.tithi.name}, {panchang.paksha})
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-white/10 bg-slate-900/80 flex justify-end">
              <button
                onClick={() => setShowFormulaGuide(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition-colors"
>
                समझ गया (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
