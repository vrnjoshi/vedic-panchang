import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage, LanguageToggle } from '../context/LanguageContext';

interface TopRightControlsProps {
  onOpenMathGuide: () => void;
}

export const TopRightControls: React.FC<TopRightControlsProps> = ({ onOpenMathGuide }) => {
  const { language } = useLanguage();

  return (
    <div
      id="top-right-controls"
      className="pointer-events-auto flex items-center gap-2 bg-slate-950/85 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl shadow-black/70"
    >
      {/* Learn Math Button */}
      <button
        id="btn-open-math-guide"
        onClick={onOpenMathGuide}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        title={language === 'hi' ? 'सूत्र व्याख्या (खगोलीय रहस्य सीखें)' : 'Learn Astronomical Formulas & Architecture'}
      >
        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
        <span className="whitespace-nowrap">
          {language === 'hi' ? 'सूत्र सीखें' : 'Learn Math'}
        </span>
      </button>

      {/* The Single Language Toggle for the entire app */}
      <LanguageToggle size="sm" />
    </div>
  );
};
