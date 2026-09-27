import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, User, Phone, MessageSquare, RotateCcw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitRSVP } from '../services/api';
import InvitationCard from './InvitationCard';

export default function RSVPSection({ config }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: true,
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleAttendingChange = (val) => {
    setFormData((prev) => ({ ...prev, attending: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Front-end Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitRSVP({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        attending: formData.attending,
        note: formData.note.trim(),
      });

      setSubmitted(true);
      setSubmittedData(response.data);

      // Trigger celebration confetti with rose & gold colors
      if (formData.attending) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E11D48', '#FDA4AF', '#F43F5E', '#D4AF37', '#BE123C'],
        });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FFF0F3] relative overflow-hidden">
      
      {/* Soft romantic light-red ambient glows */}
      <div className="absolute top-10 -left-16 w-80 h-80 rounded-full bg-red-200/40 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-10 -right-16 w-80 h-80 rounded-full bg-rose-200/50 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Light Red Rose Petals */}
      <div 
        className="absolute top-14 left-8 sm:left-24 w-5 h-5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-tr from-rose-400 to-red-400 opacity-70 pointer-events-none rose-petal-float shadow-sm"
        style={{ animationDuration: '7s' }}
      />
      <div 
        className="absolute top-36 right-8 sm:right-28 w-4 h-4 rounded-tl-2xl rounded-br-2xl bg-gradient-to-tr from-red-400 to-rose-300 opacity-65 pointer-events-none rose-petal-float shadow-sm"
        style={{ animationDuration: '9s', animationDelay: '1.5s' }}
      />
      <div 
        className="absolute bottom-32 left-10 sm:left-32 w-4 h-4 rounded-tl-2xl rounded-br-2xl bg-gradient-to-tr from-rose-400 to-pink-300 opacity-60 pointer-events-none rose-petal-float shadow-sm"
        style={{ animationDuration: '8s', animationDelay: '3s' }}
      />
      <div 
        className="absolute bottom-14 right-10 sm:right-24 w-6 h-6 rounded-tl-2xl rounded-br-2xl bg-gradient-to-tr from-red-500 to-rose-400 opacity-70 pointer-events-none rose-petal-float shadow-sm"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />

      <div className={`${submitted && submittedData?.attending ? 'max-w-2xl' : 'max-w-xl'} mx-auto space-y-8 relative z-10 transition-all duration-500`}>
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-rose-300/80 text-rose-700 text-xs font-semibold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '7s' }} />
            <span>Response Requested</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
          </div>

          <span className="font-script text-3xl sm:text-4xl text-rose-600 block">
            {submitted && submittedData?.attending ? 'Invitation Confirmed' : 'Join Our Celebration'}
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal tracking-tight">
            {submitted && submittedData?.attending ? 'Your Invitation Pass' : 'RSVP'}
          </h2>

          <p className="text-sm text-gray-700 max-w-sm mx-auto leading-relaxed">
            {submitted && submittedData?.attending 
              ? 'Thank you for accepting! We look forward to celebrating with you.'
              : <>Please kindly respond by <strong className="text-rose-700 font-bold">December 15, 2026</strong> to help us prepare our celebration.</>}
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 via-red-500 to-rose-400 mx-auto rounded-full mt-2" />
        </div>

        {/* Card Form with Light Red Hover Glow & Elevation */}
        <div className="relative group/card">
          {/* Animated romantic outer glow border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-400 via-red-400 to-rose-500 rounded-[34px] opacity-40 group-hover/card:opacity-85 blur-lg transition duration-500" />

          <div className="relative bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-[32px] border-2 border-rose-200 shadow-xl rose-shadow group-hover/card:shadow-2xl group-hover/card:border-rose-400 hover:-translate-y-1 transition-all duration-500">
            
            {submitted ? (
              submittedData?.attending ? (
                /* Interactive Invitation Card for Attending Guests */
                <InvitationCard
                  guest={submittedData}
                  config={config}
                  onReset={() => {
                    setFormData({
                      name: '',
                      phone: '',
                      attending: true,
                      note: '',
                    });
                    setSubmitted(false);
                    setSubmittedData(null);
                  }}
                />
              ) : (
                /* Acknowledgment for Non-Attending Guests */
                <div className="text-center space-y-6 py-6 animate-fadeInUp">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 bg-rose-200/60 rounded-full animate-ping opacity-50" />
                    <div className="relative w-20 h-20 bg-gradient-to-tr from-rose-100 to-red-100 text-rose-600 rounded-full flex items-center justify-center border-2 border-rose-300 shadow-md">
                      <Heart className="w-10 h-10 text-rose-600 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-bold text-charcoal">
                      Thank you for your blessings ❤️
                    </h3>
                    <p className="text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
                      We will miss your presence on our wedding day, but we deeply appreciate your warm wishes and thoughts!
                    </p>
                  </div>

                  <div className="p-5 bg-rose-50/80 rounded-2xl border border-rose-200 text-left text-xs sm:text-sm space-y-2.5 text-gray-700 shadow-sm max-w-md mx-auto">
                    <div className="flex justify-between items-center py-1 border-b border-rose-200/50">
                      <span className="text-gray-500 font-medium">Guest Name:</span>
                      <strong className="text-charcoal font-semibold">{submittedData?.name}</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-rose-200/50">
                      <span className="text-gray-500 font-medium">Contact Phone:</span>
                      <strong className="text-charcoal font-semibold">{submittedData?.phone}</strong>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500 font-medium">Attendance:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                        Unable to Attend
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: '',
                          phone: '',
                          attending: true,
                          note: '',
                        });
                        setSubmitted(false);
                        setSubmittedData(null);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#8B6E32] bg-[#FAF3E0] border border-[#DFC696] hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 active:scale-95 group cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
                      <span>Change response</span>
                    </button>
                  </div>
                </div>
              )
            ) : (
              /* RSVP Form */
              <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
                
                {/* Error Message Alert */}
                {errorMsg && (
                  <div className="p-4 rounded-2xl bg-red-50/90 border border-red-200 flex items-center gap-3 text-red-700 text-sm shadow-sm animate-fadeInUp">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-2 group/field">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span className="flex items-center gap-1.5 transition-colors group-hover/field:text-rose-600">
                      <User className="w-3.5 h-3.5 text-rose-500 group-hover/field:scale-110 transition-transform" />
                      Full Name
                      <span className="text-red-500">*</span>
                    </span>
                    <span className="text-[11px] font-normal text-gray-400">Required</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Kasun Perera"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3.5 rounded-xl border border-rose-200 bg-rose-50/30 text-charcoal text-sm transition-all duration-300 placeholder:text-gray-400 hover:border-rose-400 hover:bg-rose-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 shadow-sm"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2 group/field">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span className="flex items-center gap-1.5 transition-colors group-hover/field:text-rose-600">
                      <Phone className="w-3.5 h-3.5 text-rose-500 group-hover/field:scale-110 transition-transform" />
                      Phone Number
                      <span className="text-red-500">*</span>
                    </span>
                    <span className="text-[11px] font-normal text-gray-400">WhatsApp or Mobile</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0771234567"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3.5 rounded-xl border border-rose-200 bg-rose-50/30 text-charcoal text-sm transition-all duration-300 placeholder:text-gray-400 hover:border-rose-400 hover:bg-rose-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 shadow-sm"
                    />
                  </div>
                </div>

                {/* Attendance Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                    <PartyPopper className="w-3.5 h-3.5 text-rose-500" />
                    Will You Attend? <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* Joyfully Accept Button */}
                    <button
                      type="button"
                      onClick={() => handleAttendingChange(true)}
                      disabled={isSubmitting}
                      className={`relative py-3.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none active:scale-[0.98] ${
                        formData.attending === true
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-white border-[#D4AF37] shadow-lg shadow-gold-500/25 scale-[1.02]'
                          : 'bg-white text-gray-700 border-rose-200 hover:border-[#D4AF37] hover:bg-gold-50/50 hover:text-gold-800 hover:shadow-sm'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 transition-transform duration-300 ${formData.attending === true ? 'scale-110 text-white' : ''}`} />
                      <span>Joyfully Accept</span>
                    </button>

                    {/* Regretfully Decline Button */}
                    <button
                      type="button"
                      onClick={() => handleAttendingChange(false)}
                      disabled={isSubmitting}
                      className={`relative py-3.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none active:scale-[0.98] ${
                        formData.attending === false
                          ? 'bg-charcoal text-white border-charcoal shadow-lg shadow-charcoal/20 scale-[1.02]'
                          : 'bg-white text-gray-700 border-rose-200 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                      }`}
                    >
                      <span>Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                {/* Optional Warm Wishes Note */}
                <div className="space-y-2 group/field">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span className="flex items-center gap-1.5 transition-colors group-hover/field:text-rose-600">
                      <MessageSquare className="w-3.5 h-3.5 text-rose-500 group-hover/field:scale-110 transition-transform" />
                      Wishes or Dietary Notes
                    </span>
                    <span className="text-[11px] font-normal text-gray-400">Optional</span>
                  </label>
                  <textarea
                    name="note"
                    rows={3}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Share a warm blessing, wish, or dietary note..."
                    disabled={isSubmitting}
                    className="w-full px-4 py-3.5 rounded-xl border border-rose-200 bg-rose-50/30 text-charcoal text-sm transition-all duration-300 placeholder:text-gray-400 hover:border-rose-400 hover:bg-rose-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 shadow-sm resize-none"
                  />
                </div>

                {/* Submit Button with Matching Luxury Champagne Gold Gradient & Hover Glow */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#DFBF6E] to-[#C5A059] text-white font-bold text-base shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/35 hover:from-[#C5A059] hover:to-[#B8860B] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:ring-4 focus:ring-gold-300/60 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting RSVP...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-white/20 group-hover:scale-125 group-hover:fill-white/60 transition-all duration-300" />
                      <span className="tracking-wide">Confirm RSVP</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
