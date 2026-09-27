import React, { useState, useEffect } from 'react';
import { Calendar, Heart, MapPin, Sparkles } from 'lucide-react';
import coupleHeroImg from '../assets/couple_hero.jpg';

export default function HeroSection({ config }) {
  const weddingDateStr = config?.weddingDate || '30 December 2026';
  const groomName = config?.groomName || 'Yameera';
  const brideName = config?.brideName || 'Kaveesha';

  // Countdown calculations
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-12-30T10:00:00+05:30');
    const difference = +targetDate - +new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden bg-gradient-to-b from-[#FFF0F2] via-[#FFF5F6] to-[#FFF0F3]">
      {/* Background Subtle Gradient & Light Red Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/70 via-rose-50/50 to-transparent -z-10" />
      
      {/* Soft Ambient Light Red Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-red-200/35 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />

      {/* Decorative Floating Petals */}
      <div className="absolute top-12 left-10 w-4 h-4 rose-petal-float opacity-75 shadow-sm rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-rose-400 to-red-300" style={{ animationDelay: '0s' }} />
      <div className="absolute top-28 right-12 w-3.5 h-3.5 rose-petal-float opacity-70 shadow-sm rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-red-300 to-rose-200" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-1/2 left-8 w-5 h-5 rose-petal-float opacity-80 shadow-sm rounded-tl-2xl rounded-br-2xl bg-gradient-to-tr from-rose-400 to-pink-300" style={{ animationDelay: '5s' }} />
      <div className="absolute bottom-24 right-10 w-4 h-4 rose-petal-float opacity-70 shadow-sm rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-red-400 to-rose-300" style={{ animationDelay: '7.5s' }} />

      {/* Hero Card Container */}
      <div className="w-full max-w-xl text-center z-10 space-y-6 animate-fadeInUp">
        
        {/* Header Tag line with Rose / Gold glow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>We're Getting Married</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* Romantic Subtitle */}
        <p className="font-script text-3xl sm:text-4xl text-rose-600 tracking-wide">
          Together Forever
        </p>

        {/* Main Photo with Rose & Gold Ornament Frame */}
        <div className="relative mx-auto my-4 w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2.5 bg-gradient-to-tr from-rose-400 via-gold-300 to-red-400 shadow-2xl rose-shadow group transition-all duration-500 hover:scale-[1.02]">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative">
            <img
              src={coupleHeroImg}
              alt={`${groomName} & ${brideName}`}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50" />
          </div>
        </div>

        {/* Couple Names */}
        <div className="space-y-1">
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-charcoal">
            {groomName}
          </h1>
          <div className="font-script text-3xl sm:text-4xl text-rose-500 my-1 flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-rose-300"></span>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-400/40 inline-block animate-pulse" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-rose-300"></span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-charcoal">
            {brideName}
          </h1>
        </div>

        {/* Wedding Date Display */}
        <div className="pt-2 flex items-center justify-center gap-2 text-rose-700 font-serif text-xl sm:text-2xl font-semibold tracking-wider">
          <Calendar className="w-5 h-5 text-rose-500" />
          <span>{weddingDateStr}</span>
        </div>

        {/* Live Countdown Timer */}
        <div className="pt-4 max-w-sm mx-auto">
          <p className="text-xs uppercase tracking-widest text-rose-800/80 mb-3 font-semibold">Countdown to Our Special Day</p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 px-2">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div 
                key={idx} 
                className="bg-white/90 backdrop-blur-sm border border-rose-200/80 rounded-2xl p-2.5 sm:p-3 shadow-sm hover:border-rose-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="block font-serif font-bold text-2xl sm:text-3xl text-rose-600">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="pt-6">
          <a
            href="#invitation"
            className="inline-flex flex-col items-center gap-1.5 text-rose-500 hover:text-rose-600 transition-colors text-xs font-semibold tracking-wider"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="w-5 h-8 border-2 border-rose-400/60 rounded-full flex items-start justify-center p-1">
              <div className="w-1.5 h-2 bg-rose-500 rounded-full animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
