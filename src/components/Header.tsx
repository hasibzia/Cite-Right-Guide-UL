import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-3xl mx-auto pt-10 pb-6 px-4 text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-[#facc15] border-2 border-black text-black font-extrabold text-xs uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#000000]">
        Referencing Tool
      </div>

      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black">
        City
      </h1>

      <p className="mt-2 text-base sm:text-lg text-black font-semibold">
        create your reference
      </p>
    </header>
  );
};
