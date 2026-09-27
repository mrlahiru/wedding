import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Sun, GlassWater, Heart } from 'lucide-react';

export default function WeddingDetails({ config }) {
  const weddingDate = config?.weddingDate || '30 December 2026';
  const weddingTime = config?.weddingTime || '10:00 AM';
  const venueName = config?.venueName || 'Hotel Shans - Galigamuwa';

  const scheduleItems = [
    {
      time: '09:30 AM',
      title: 'Guest Arrival',
      desc: 'Welcome drinks & musical accompaniment',
      icon: Sun,
    },
    // {
    //   time: '10:00 AM',
    //   title: 'Traditional Poruwa Ceremony',
    //   desc: 'Auspicious rites & blessing exchange',
    //   icon: Sparkles,
    // },
    {
      time: '11:00 AM',
      title: 'Couple Entrance',
      desc: 'Welcoming the newlyweds with cheers & celebration',
      icon: Heart,
    },
    {
      time: '11:30 AM',
      title: 'Grand Wedding Reception',
      desc: 'Gourmet banquet lunch & toast',
      icon: GlassWater,
    },
    {
      time: '04:00 PM',
      title: "Couple's Exit",
      desc: 'Warm send-off & heartfelt farewell to the newlyweds',
      icon: Sparkles,
    },
  ];

  return (
    <section id="details" className="py-20 px-4 bg-gradient-to-b from-[#FFF5F6] via-[#FFEBF0] to-[#FFF5F7] relative overflow-hidden">
      {/* Light Red Background Glows */}
      <div className="absolute top-12 -right-16 w-80 h-80 rounded-full bg-rose-200/35 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-12 -left-16 w-80 h-80 rounded-full bg-red-200/30 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Floating Petal Accents */}
      <div className="absolute top-16 left-8 w-4 h-4 rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-rose-400 to-red-300 opacity-60 rose-petal-float pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-20 right-10 w-5 h-5 rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-red-400 to-rose-300 opacity-55 rose-petal-float pointer-events-none" style={{ animationDuration: '9s', animationDelay: '2s' }} />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-rose-600 block">
            Event Schedule
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            Wedding Details
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-red-400 to-rose-300 mx-auto rounded-full mt-3" />
        </div>

        {/* 3 Main Highlight Cards with Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Date */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-rose-200/90 shadow-md hover:shadow-xl hover:border-rose-300 hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-100 to-red-50 text-rose-600 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-rose-500 group-hover:to-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Date</h3>
            <p className="text-gray-700 font-semibold">{weddingDate}</p>
            <p className="text-xs text-rose-600 uppercase tracking-widest font-semibold">Wednesday</p>
          </div>

          {/* Card 2: Time */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-rose-200/90 shadow-md hover:shadow-xl hover:border-rose-300 hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-100 to-red-50 text-rose-600 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-rose-500 group-hover:to-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Time</h3>
            <p className="text-gray-700 font-semibold">{weddingTime}</p>
            <p className="text-xs text-rose-600 uppercase tracking-widest font-semibold">Morning Auspicious Time</p>
          </div>

          {/* Card 3: Venue */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-rose-200/90 shadow-md hover:shadow-xl hover:border-rose-300 hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-100 to-red-50 text-rose-600 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-rose-500 group-hover:to-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Venue</h3>
            <p className="text-gray-700 font-semibold">{venueName}</p>
            <p className="text-xs text-rose-600 uppercase tracking-widest font-semibold">Galigamuwa, Sri Lanka</p>
          </div>

        </div>

        {/* Schedule Timeline */}
        <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-rose-200/90 shadow-lg rose-shadow space-y-6">
          <h3 className="font-serif text-2xl font-semibold text-charcoal text-center border-b border-rose-100 pb-4">
            Day Program
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {scheduleItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60 space-y-2 hover:border-rose-400 hover:bg-rose-50/80 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 group/prog"
                >
                  <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                    <IconComp className="w-4 h-4 group-hover/prog:scale-110 transition-transform" />
                    <span>{item.time}</span>
                  </div>
                  <h4 className="font-serif font-bold text-charcoal text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
