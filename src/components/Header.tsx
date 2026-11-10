import React from 'react';
import { BookOpen, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenContextSettings: () => void;
  activeRuleCount: number;
  collegeName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenContextSettings,
  activeRuleCount,
  collegeName,
}) => {
  return (
    <header className="relative w-full max-w-4xl mx-auto pt-8 pb-5 px-4">
      {/* Top control bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-2xs text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-500 font-medium">Standard:</span>
          <span className="text-blue-600 font-semibold">{collegeName}</span>
          <span className="text-slate-300">|</span>
          <span className="text-purple-600 font-medium">{activeRuleCount} active exemplars</span>
        </div>

        <button
          onClick={onOpenContextSettings}
          className="btn-apple-secondary group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer"
          title="Configure University of Limerick reference rules and exemplar context"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 transition-transform group-hover:rotate-45" />
          <span>UL Context & Rules</span>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
            Tuner
          </span>
        </button>
      </div>

      {/* Main Hero Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-[#0071e3] shadow-md shadow-blue-500/20 mb-3 text-white">
          <BookOpen className="w-7 h-7" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
          University of Limerick <span className="text-[#0071e3]">Harvard</span> Formatter
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          Paste any raw citation, paper DOI, or web link to generate the approved 
          University of Limerick (Cite It Right) Harvard reference and in-text citation.
        </p>

        {/* Apple-style subtle feature tags with yellow, blue, and purple accents */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-700 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            Cite It Right Standard
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-100 text-purple-700 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
            Times New Roman Serif
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-200 text-amber-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Source in Italics
          </span>
        </div>
      </div>
    </header>
  );
};
