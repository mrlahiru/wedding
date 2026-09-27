import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ config }) {
  const groomName = config?.groomName || 'Yameera';
  const brideName = config?.brideName || 'Kaveesha';
  const weddingDate = config?.weddingDate || '30 December 2026';

  return (
    <footer className="py-14 px-4 bg-[#231A1C] text-white relative overflow-hidden text-center border-t border-rose-900/40">
      {/* Soft romantic ambient glow in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        
        {/* Couple Monogram */}
        <div className="font-serif italic text-4xl font-bold tracking-widest bg-gradient-to-r from-rose-200 via-rose-100 to-rose-300 bg-clip-text text-transparent">
          {groomName[0]} & {brideName[0]}
        </div>

        <p className="font-serif text-2xl text-rose-100/90 font-medium">
          {groomName} & {brideName}
        </p>

        <p className="text-xs tracking-widest uppercase text-rose-200/60 font-medium">
          {weddingDate} • Galigamuwa, Sri Lanka
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent mx-auto" />

        <div className="flex items-center justify-center gap-1.5 text-xs text-rose-200/50">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
          <span>for our beloved family & friends</span>
        </div>

      </div>
    </footer>
  );
}
