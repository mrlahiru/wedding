import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingButton({ config }) {
  const rawPhone = config?.whatsappPhone || '+818055691384';
  // Clean phone number (remove +, spaces, hyphens)
  const phone = rawPhone.replace(/[^\d]/g, '');

  const whatsappUrl = `https://wa.me/${phone}?text=Hello%20Yameera%20%26%20Kaveesha,%20I%20have%20a%20question%20regarding%20your%20wedding!`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact couple via WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-105 transition-all duration-300 animate-bounce"
      style={{ animationDuration: '3s' }}
    >
      <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
      <span className="text-xs font-bold tracking-wide hidden sm:inline-block pr-1">
        Contact Couple
      </span>
    </a>
  );
}
