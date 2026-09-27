import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import venueImg from '../assets/venue_banner.jpg';

export default function LocationSection({ config }) {
  const venueName = config?.venueName || 'Hotel Shans - Galigamuwa';
  const venueAddress = config?.venueAddress || 'Colombo - Kandy Rd, Galigamuwa, Sri Lanka';
  const mapsUrl = config?.googleMapsUrl || 'https://www.google.com/maps/dir//hotel+shan+galigamuwa/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3ae310dad6555583:0x6cda49f44d354751?sa=X&ved=1t:155782&ictx=111';

  return (
    <section id="location" className="py-20 px-4 bg-gradient-to-b from-[#FFF5F7] via-[#FFEBF0] to-[#FFF5F6] relative overflow-hidden">
      {/* Soft Ambient Light Red Glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-rose-200/35 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-red-200/30 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />

      {/* Floating Petal Accents */}
      <div className="absolute top-12 right-12 w-4 h-4 rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-rose-400 to-red-300 opacity-60 rose-petal-float pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-16 left-12 w-5 h-5 rounded-tl-xl rounded-br-xl bg-gradient-to-tr from-red-400 to-rose-200 opacity-55 rose-petal-float pointer-events-none" style={{ animationDuration: '10s', animationDelay: '2s' }} />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-rose-600 block">
            Getting There
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            Wedding Venue
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-red-400 to-rose-300 mx-auto rounded-full mt-3" />
        </div>

        {/* Venue Showcase Card with Hover Elevation & Border Glow */}
        <div className="overflow-hidden rounded-[32px] border border-rose-200/90 shadow-xl rose-shadow bg-white/95 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 hover:shadow-2xl hover:border-rose-300 hover:-translate-y-1 transition-all duration-500 group">
          
          {/* Venue Image */}
          <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
            <img
              src={venueImg}
              alt={venueName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="inline-block px-3 py-1 bg-rose-600/85 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wider uppercase mb-1 shadow-sm">
                Reception & Banquet Hall
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">{venueName}</h3>
            </div>
          </div>

          {/* Details & Map Action */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3.5 bg-gradient-to-tr from-rose-100 to-red-50 rounded-2xl text-rose-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-charcoal">
                    {venueName}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {venueAddress}
                  </p>
                </div>
              </div>

              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200/70 text-xs text-rose-950 space-y-1">
                <p className="font-semibold text-rose-800">🚘 Parking & Access:</p>
                <p className="text-gray-600">Valet parking is available at the main hotel entrance for all wedding guests.</p>
              </div>
            </div>

            {/* Configurable View Location Button */}
            <div className="pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#DFBF6E] to-[#C5A059] text-white font-bold shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/35 hover:from-[#C5A059] hover:to-[#B8860B] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group/btn"
              >
                <Navigation className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:-rotate-12 transition-transform" />
                <span>View Location on Google Maps</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
