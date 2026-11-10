import React from 'react';
import { Lock, Instagram, Linkedin, Clock, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-[var(--font-google-sans)] selection:bg-[#facc15] selection:text-black">
      {/* Top Black Accent Bar */}
      <div className="h-2 w-full bg-black" />

      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-12 space-y-6">
        {/* Access Banned / Maintenance Card */}
        <div className="city-card rounded-2xl p-7 sm:p-10 relative text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#facc15] border-2 border-black text-black font-black text-xs uppercase tracking-wider mb-5 shadow-[2px_2px_0px_#000000]">
            <Lock className="w-3.5 h-3.5" />
            <span>Access Paused</span>
          </div>

          {/* Main Message */}
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-6">
            City will be back soon.
          </h2>

          {/* Connect With Creator Section */}
          <div className="p-6 rounded-2xl bg-[#fef08a] border-2 border-black max-w-lg mx-auto mb-6 shadow-[3px_3px_0px_#000000]">
            <div className="text-xs font-black uppercase tracking-wider text-black mb-3">
              Connect with my creator:
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/mirhasibullahzia/"
                target="_blank"
                rel="noopener noreferrer"
                className="city-btn-black inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-extrabold text-sm cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#facc15]" />
                <span>@mirhasibullahzia</span>
              </a>

              <a
                href="https://www.linkedin.com/in/mirhasibullahzia/"
                target="_blank"
                rel="noopener noreferrer"
                className="city-btn-white inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-black font-extrabold text-sm cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-black" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-600">
            <Clock className="w-3.5 h-3.5" />
            <span>Under active development — stay tuned for the next release</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
