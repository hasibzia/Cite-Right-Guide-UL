import React from 'react';
import { AlertTriangle, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 w-full bg-black py-6 px-4 sm:px-8 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Social Profile Handles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
            <span>Connect with creator:</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/mirhasibullahzia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:text-[#facc15] hover:border-[#facc15] transition-all text-xs font-bold shadow-xs"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@mirhasibullahzia</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mirhasibullahzia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:text-[#facc15] hover:border-[#facc15] transition-all text-xs font-bold shadow-xs"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Disclaimer & City signature */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white text-xs sm:text-sm font-bold">
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
      </div>
    </footer>
  );
};
