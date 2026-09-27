import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ config }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Message', href: '#invitation' },
    { label: 'Details', href: '#details' },
    { label: 'Location', href: '#location' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isAdmin
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-gold-300/30 py-3'
          : 'bg-gradient-to-b from-black/40 via-black/10 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram / Title */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="font-serif italic text-2xl font-bold tracking-wider gold-gradient-text">
            {(config?.groomName?.[0] || 'Y')} & {(config?.brideName?.[0] || 'K')}
          </span>
          <Heart className={`w-4 h-4 text-gold-400 group-hover:scale-125 transition-transform duration-300 fill-gold-400/20`} />
        </a>

        {/* Desktop Links */}
        {!isAdmin ? (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-gold-500 ${
                  scrolled ? 'text-charcoal' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gold-400 text-white shadow-sm hover:bg-gold-500 transition-colors"
          >
            ← View Invitation
          </Link>
        )}

        {/* Mobile menu trigger */}
        {!isAdmin && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-charcoal' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {!isAdmin && mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gold-200 px-6 py-5 shadow-xl animate-fadeInUp">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-charcoal hover:text-gold-500 py-1 border-b border-gray-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
