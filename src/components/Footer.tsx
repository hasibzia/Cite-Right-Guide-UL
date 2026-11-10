import React from 'react';
import { ShieldAlert, BookOpen, ExternalLink, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 w-full">
      {/* Yellow bottom container with subtle blue and vibrant purple accents */}
      <div className="yellow-bottom-section w-full py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-5 text-center">
          {/* Guide Attributions */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-amber-950">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-blue-700 border border-blue-200 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>cite right guide</span>
            </span>
            <span className="text-amber-800 font-medium">and</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-purple-700 border border-purple-200 shadow-2xs">
              <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
              <span>mybibi.com</span>
            </span>
            <span className="text-amber-900 font-medium">
              was used as guides for this app.
            </span>
          </div>

          {/* Explicit User Disclaimer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-amber-300/80 text-xs text-amber-950 shadow-sm max-w-2xl mx-auto flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-left space-y-1">
              <div className="font-bold text-amber-900">
                Notice & Academic Integrity Disclaimer
              </div>
              <p className="font-normal text-amber-950 leading-relaxed">
                The creator has no obligations to any mistakes made by the user. 
                Please cross-reference your generated bibliography with the official University of Limerick Cite It Right manual or your course module guidelines prior to submission.
              </p>
            </div>
          </div>

          {/* Academic institution accreditation */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-amber-800">
            <GraduationCap className="w-3.5 h-3.5 text-amber-900" />
            <span>University of Limerick Harvard Referencing Standard (Cite It Right)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
