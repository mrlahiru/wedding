import React from 'react';
import { Quote, Sparkles, Heart } from 'lucide-react';

export default function InvitationMessage({ config }) {
  const message =
    config?.invitationMessage ||
    'Together with our families, we warmly invite you to celebrate our wedding day and share in our joy on this special occasion.';

  return (
    <section id="invitation" className="py-20 px-4 bg-gradient-to-b from-[#FFF0F3] via-[#FFEBF0] to-[#FFF5F6] relative overflow-hidden">
      {/* Soft Ambient Light Red Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-red-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-rose-200/35 blur-3xl pointer-events-none" />

      {/* Floating Petal Accents */}
      <div className="absolute top-10 left-12 w-4 h-4 rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-rose-400 to-red-300 opacity-50 rose-petal-float pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-10 right-12 w-4 h-4 rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-red-400 to-rose-300 opacity-55 rose-petal-float pointer-events-none" style={{ animationDuration: '9s', animationDelay: '2s' }} />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Card Frame with Light Red Hover Glow */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 via-red-300 to-rose-400 rounded-[34px] opacity-30 group-hover:opacity-75 blur-md transition duration-500" />

          <div className="relative bg-white/95 backdrop-blur-md p-8 sm:p-12 rounded-[32px] text-center border border-rose-200/90 shadow-xl rose-shadow group-hover:shadow-2xl group-hover:border-rose-300 group-hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            
            {/* Subtle Corner Motifs */}
            <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-rose-100/50 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-red-100/40 pointer-events-none" />

            {/* Icon Header */}
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-rose-100 to-red-50 border border-rose-200 flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <Quote className="w-6 h-6" />
            </div>

            <span className="font-script text-3xl sm:text-4xl text-rose-600 block mb-2">
              Save Our Date
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal mb-6 tracking-wide">
              The Honor of Your Presence
            </h2>

            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />

            {/* Invitation Message Body */}
            <p className="font-serif text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-lg mx-auto italic">
              "{message}"
            </p>

            {/* Host Families Note */}
            <div className="mt-8 pt-6 border-t border-rose-100 flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-800/80 uppercase tracking-widest font-semibold">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400/40" />
              <span>With Love & Blessings</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400/40" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
