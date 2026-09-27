import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { 
  Download, 
  Share2, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Sparkles, 
  Heart, 
  Check, 
  Loader2, 
  Maximize2, 
  X,
  Award,
  GlassWater
} from 'lucide-react';

// Ornate Corner SVG Filigree
const CornerOrnament = ({ className = '' }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`w-12 h-12 sm:w-16 sm:h-16 text-[#D4AF37] ${className}`} 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M 0,0 L 45,0 C 45,6 40,12 34,14 C 28,16 22,22 20,28 C 18,34 12,40 6,45 L 0,45 Z" opacity="0.8" />
    <path d="M 0,0 L 0,85 C 4,75 8,68 15,62 C 22,56 26,48 26,38 C 26,26 36,16 48,16 C 58,16 66,12 72,5 C 78,-2 85,0 85,0 L 0,0 Z" opacity="0.35" />
    <circle cx="16" cy="16" r="3.5" fill="#B8860B" />
    <circle cx="28" cy="10" r="2" fill="#D4AF37" />
    <circle cx="10" cy="28" r="2" fill="#D4AF37" />
    <path d="M 6,6 L 6,65 M 6,6 L 65,6" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
  </svg>
);

// Traditional Lotus/Mandala Center Watermark
const MandalaWatermark = () => (
  <svg 
    viewBox="0 0 200 200" 
    className="w-80 h-80 sm:w-96 sm:h-96 text-rose-300 opacity-[0.07] pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 100 100)`}>
        <path d="M 100,25 C 92,50 92,75 100,95 C 108,75 108,50 100,25 Z" />
        <circle cx="100" cy="20" r="3" />
      </g>
    ))}
  </svg>
);

export default function InvitationCard({ guest, config, onReset }) {
  const exportRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3D Card Interactive Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const groomName = config?.groomName || 'Yameera';
  const brideName = config?.brideName || 'Kaveesha';
  const weddingDate = config?.weddingDate || '30 December 2026';
  const venueName = config?.venueName || 'Hotel Shans - Galigamuwa';
  const venueAddress = config?.venueAddress || 'Colombo - Kandy Rd, Galigamuwa, Sri Lanka';
  const guestName = guest?.name || 'Honored Guest';
  const guestPassCode = guest?._id ? `WED-${guest._id.toString().slice(-6).toUpperCase()}` : 'WED-2026';

  // Handle Interactive Mouse Tilt
  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Tilt limit
    const rotateX = -(mouseY / (card.height / 2)) * 6;
    const rotateY = (mouseX / (card.width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Download Invitation Card as High-Res PNG
  const handleDownload = async () => {
    if (!exportRef.current || isDownloading) return;

    try {
      setIsDownloading(true);
      setDownloadSuccess(false);

      // Brief pause to allow fonts/styles to stabilize
      await new Promise((r) => setTimeout(r, 200));

      const canvas = await html2canvas(exportRef.current, {
        scale: 2.5, // High resolution crisp export
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFDF9',
        logging: false,
        imageTimeout: 0,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const cleanGuest = guestName.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `Wedding_Invitation_${groomName}_&_${brideName}_${cleanGuest}.png`;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to export invitation card:', err);
      alert('Could not download card image. Please try taking a screenshot or clicking "View Full Card".');
    } finally {
      setIsDownloading(false);
    }
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `💐 *Wedding Invitation Pass*\n\n` +
      `Dearest ${guestName},\n` +
      `You are warmly invited to celebrate the wedding of *${groomName} & ${brideName}*! ❤️\n\n` +
      `📅 *Date:* ${weddingDate}\n` +
      `⏰ *Time:* 09:30 AM onwards\n` +
      `📍 *Venue:* ${venueName} (${venueAddress})\n` +
      `🎟️ *RSVP Pass:* #${guestPassCode}\n\n` +
      `Looking forward to sharing our special day together!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Google Calendar Link
  const handleGoogleCalendar = () => {
    // 30 December 2026, 09:30 AM to 03:30 PM (Sri Lanka UTC+5:30)
    // 20261230T040000Z to 20261230T100000Z
    const title = encodeURIComponent(`Wedding: ${groomName} & ${brideName}`);
    const details = encodeURIComponent(
      `Wedding Celebration of ${groomName} & ${brideName}.\nGuest: ${guestName}\nRSVP Pass: ${guestPassCode}\nVenue: ${venueName}`
    );
    const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261230T040000Z/20261230T100000Z&details=${details}&location=${location}`;
    window.open(calUrl, '_blank');
  };

  // Card Content Component (Shared by Responsive Display & Hidden Export Canvas)
  const CardContent = ({ isExport = false }) => (
    <div 
      className={`relative w-full h-full bg-[#FFFDF9] rounded-[28px] border-[2.5px] border-[#D4AF37] p-6 sm:p-9 flex flex-col justify-between overflow-hidden shadow-2xl select-none ${
        isExport ? 'w-[620px] min-h-[880px]' : ''
      }`}
      style={{
        boxShadow: '0 25px 60px -15px rgba(184, 134, 11, 0.25), 0 0 30px 2px rgba(225, 29, 72, 0.08)',
      }}
    >
      {/* Background Watermark & Vignette */}
      <MandalaWatermark />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/90 via-[#FFF9F6]/85 to-[#FFF5F6]/95 pointer-events-none" />

      {/* Decorative Ornate Corners */}
      <div className="absolute top-2 left-2 pointer-events-none">
        <CornerOrnament />
      </div>
      <div className="absolute top-2 right-2 pointer-events-none rotate-90">
        <CornerOrnament />
      </div>
      <div className="absolute bottom-2 left-2 pointer-events-none -rotate-90">
        <CornerOrnament />
      </div>
      <div className="absolute bottom-2 right-2 pointer-events-none rotate-180">
        <CornerOrnament />
      </div>

      {/* Inner Elegant Gold Inset Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[22px] border border-[#DFC696]/70 pointer-events-none border-dashed" />

      {/* CARD CONTENT BODY */}
      <div className="relative z-10 text-center space-y-4 sm:space-y-5 my-auto">
        
        {/* Top Auspicious Emblem */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-100 to-rose-100 border border-[#D4AF37] flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
          </div>
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Script Top Header */}
        <div>
          <span className="font-script text-3xl sm:text-4xl text-rose-600 block leading-tight">
            Wedding Invitation
          </span>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8B6E32] font-medium mt-1">
            Together with our families
          </p>
        </div>

        {/* Couple Names Section */}
        <div className="py-1">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-wide flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[#9E2A2B]">{groomName}</span>
            <span className="font-script text-3xl sm:text-4xl text-[#D4AF37] font-normal px-1">&</span>
            <span className="text-[#9E2A2B]">{brideName}</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[11px] text-gray-500 uppercase tracking-widest font-sans">
              Request the pleasure of your company
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </div>
        </div>

        {/* Guest Honorific Personalized Cartouche */}
        <div className="relative py-2 max-w-md mx-auto">
          <div className="bg-gradient-to-r from-[#FAF3E0] via-[#FFF1F2] to-[#FAF3E0] border border-[#DFC696] rounded-2xl p-3.5 shadow-sm">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-rose-700 font-semibold mb-0.5">
              Cordially Invited
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-charcoal text-balance">
              {guestName}
            </div>
            <div className="text-[11px] text-gray-600 italic mt-0.5">
              To celebrate our holy union & blessings
            </div>
          </div>
        </div>

        {/* Program & Schedule Badges */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 max-w-lg mx-auto text-left">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1.5 sm:p-2.5 border border-rose-200/60 shadow-xs text-center">
            <Clock className="w-3.5 h-3.5 mx-auto text-rose-500 mb-0.5 sm:mb-1" />
            <div className="text-[9px] sm:text-[10px] text-gray-500 font-medium leading-tight">Arrival</div>
            <div className="text-[11px] sm:text-xs font-bold text-charcoal">09:30 AM</div>
          </div>

          <div className="bg-gradient-to-b from-rose-50 to-white rounded-xl p-1.5 sm:p-2.5 border border-rose-300 shadow-xs text-center">
            <Heart className="w-3.5 h-3.5 mx-auto text-rose-600 fill-rose-500/20 mb-0.5 sm:mb-1" />
            <div className="text-[9px] sm:text-[10px] text-rose-700 font-semibold leading-tight">Entrance</div>
            <div className="text-[11px] sm:text-xs font-bold text-rose-700">11:00 AM</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1.5 sm:p-2.5 border border-rose-200/60 shadow-xs text-center">
            <GlassWater className="w-3.5 h-3.5 mx-auto text-amber-600 mb-0.5 sm:mb-1" />
            <div className="text-[9px] sm:text-[10px] text-gray-500 font-medium leading-tight">Reception</div>
            <div className="text-[11px] sm:text-xs font-bold text-charcoal">11:30 AM</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1.5 sm:p-2.5 border border-rose-200/60 shadow-xs text-center">
            <Sparkles className="w-3.5 h-3.5 mx-auto text-rose-500 mb-0.5 sm:mb-1" />
            <div className="text-[9px] sm:text-[10px] text-gray-500 font-medium leading-tight">Exit</div>
            <div className="text-[11px] sm:text-xs font-bold text-charcoal">04:00 PM</div>
          </div>
        </div>

        {/* Date & Venue Section */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E0] border border-[#DFC696] text-[#8B6E32] text-xs font-semibold shadow-xs">
            <CalendarIcon className="w-3.5 h-3.5 text-[#B8860B]" />
            <span className="font-serif tracking-wider text-sm">{weddingDate}</span>
          </div>

          <div className="text-xs sm:text-sm text-gray-700 font-serif">
            <strong className="text-charcoal block text-sm sm:text-base font-bold">{venueName}</strong>
            <span className="text-gray-600 text-xs block">{venueAddress}</span>
          </div>
        </div>

        {/* Bottom Verification & Pass Badge */}
        <div className="pt-2 border-t border-[#DFC696]/40 flex items-center justify-between text-left px-2">
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-[#8B6E32] tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-[#B8860B]" />
              <span>Official Guest Pass</span>
            </div>
            <div className="text-[11px] font-mono text-gray-500">
              Pass ID: <strong className="text-charcoal font-semibold">{guestPassCode}</strong>
            </div>
          </div>

          <div className="text-right">
            <span className="font-script text-xl sm:text-2xl text-rose-600 block">
              With Love & Gratitude
            </span>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="space-y-6 pt-2">
      
      {/* Title & Celebration Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold">
          <Check className="w-3.5 h-3.5" />
          <span>RSVP Confirmed • You're on the Guest List!</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
          Your Official Invitation Card
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          Please download or save this card on your phone to present upon arrival.
        </p>
      </div>

      {/* Interactive 3D Card Display Container */}
      <div 
        className="relative max-w-md mx-auto cursor-pointer select-none"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpen(true)}
        title="Click to view card in full screen"
      >
        {/* Soft luxury ambient glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-300 via-amber-200 to-rose-400 rounded-[34px] opacity-40 blur-xl transition-opacity duration-500 pointer-events-none" />

        {/* 3D Tilted Card */}
        <div 
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: isHovered 
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` 
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Shimmer Light Reflection effect */}
          {isHovered && (
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-[28px] pointer-events-none z-20"
              style={{
                transform: `translateX(${tilt.y * 8}px) translateY(${tilt.x * 8}px)`,
              }}
            />
          )}

          {/* Interactive Card Content */}
          <CardContent isExport={false} />

          {/* Floating 'Click to Expand' Pill */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-gray-700 border border-rose-200/80 shadow-xs flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3 h-3 text-rose-500" />
            <span>Click to Expand</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Download, Share, Add to Calendar */}
      <div className="space-y-3 max-w-md mx-auto pt-2">
        
        {/* Primary Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B8860B] hover:from-[#C5A059] hover:to-[#A37E3A] text-white font-bold text-sm shadow-lg gold-shadow hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating High-Resolution Card...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check className="w-5 h-5 text-emerald-200" />
              <span>Invitation Card Downloaded! 🎉</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Download Invitation Card (PNG)</span>
            </>
          )}
        </button>

        {/* Secondary Actions: WhatsApp Share & Add to Calendar */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleGoogleCalendar}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-semibold text-xs transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-rose-600" />
            <span>Add to Calendar</span>
          </button>
        </div>

        {/* Submit another response link */}
        {onReset && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-gray-500 hover:text-rose-600 underline font-medium transition-colors"
            >
              Submit another RSVP response
            </button>
          </div>
        )}
      </div>

      {/* FULL SCREEN MODAL VIEW */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeInUp"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-white rounded-3xl p-3 sm:p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-2">
              <span className="font-serif text-lg font-bold text-charcoal">
                Invitation Card Preview
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Card Display */}
            <div className="max-h-[75vh] overflow-y-auto rounded-2xl">
              <CardContent isExport={false} />
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-white font-bold text-xs shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Downloading...' : 'Download Card'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HIDDEN OFFSCREEN HIGH-RESOLUTION EXPORT CONTAINER FOR HTML2CANVAS */}
      {/* This ensures mobile and desktop users both get a pristine, fixed 620px × 880px high-resolution card */}
      <div 
        style={{ 
          position: 'fixed', 
          top: '-9999px', 
          left: '-9999px', 
          width: '620px', 
          minHeight: '880px',
          zIndex: -9999,
          pointerEvents: 'none'
        }}
      >
        <div ref={exportRef}>
          <CardContent isExport={true} />
        </div>
      </div>

    </div>
  );
}
