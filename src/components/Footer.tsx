import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 w-full yellow-footer-banner py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        {/* Guide Attributions */}
        <div className="inline-block px-4 py-2 rounded-xl bg-white border-2 border-black text-black font-bold text-xs sm:text-sm shadow-[3px_3px_0px_#000000]">
          cite right guide and mybibi.com was used as guides for this app.
        </div>

        {/* User Disclaimer */}
        <div className="p-4 rounded-xl bg-white border-2 border-black text-black text-xs sm:text-sm font-semibold max-w-2xl mx-auto flex items-start gap-3 shadow-[3px_3px_0px_#000000]">
          <ShieldAlert className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <p className="text-left leading-relaxed">
            the creator has no olgations to nay mistakes made by the uuser. Please verify citations against your specific course guidelines.
          </p>
        </div>

        <div className="text-xs font-bold text-black uppercase tracking-wider">
          City • University of Limerick Harvard Referencing
        </div>
      </div>
    </footer>
  );
};
