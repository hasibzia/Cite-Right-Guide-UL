import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 w-full bg-black py-4 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white text-xs sm:text-sm font-bold">
        {/* Left-hand side notice with symbol of attention */}
        <div className="flex items-start gap-2.5 max-w-2xl text-left">
          <AlertTriangle className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span>Cite It Right and mybibi.com was used as training material. The creator has no obligations for any mistakes made by the user. Please verify citations against your specific course guidelines.</span>
          </div>
        </div>

        {/* City at the end */}
        <div className="shrink-0 uppercase tracking-widest text-[#facc15] font-black text-sm self-start sm:self-center">
          City
        </div>
      </div>
    </footer>
  );
};
