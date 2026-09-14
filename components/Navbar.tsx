'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#system', label: t.nav.system },
    { href: '#pillars', label: t.nav.pillars },
    { href: '#calculator', label: t.nav.calculator },
    { href: '#benefits', label: t.nav.benefits },
    { href: '#location', label: t.nav.location },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-forest-950/90 backdrop-blur-md border-b border-lime/20 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Logo size="md" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-200 hover:text-lime transition-colors duration-200 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls: Language, CTA */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-forest-900/80 border border-forest-700/60 rounded-full p-0.5 text-xs">
            <button
              onClick={() => setLang('de')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                lang === 'de'
                  ? 'bg-lime text-forest-950 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                lang === 'en'
                  ? 'bg-lime text-forest-950 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button (#C8F169 with black/forest text as per CD) */}
          <a
            href="#join"
            className="inline-flex items-center gap-2 bg-lime hover:bg-lime-hover active:bg-lime-active text-forest-950 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-lime-glow hover:shadow-lime-glow-lg transform hover:-translate-y-0.5"
          >
            <span>{t.nav.join}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Language Switcher */}
          <button
            onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
            className="p-1.5 rounded-md text-xs font-bold text-lime bg-forest-900 border border-lime/30 uppercase"
          >
            {lang}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white bg-forest-900/80 border border-forest-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-forest-950/95 backdrop-blur-xl border-b border-lime/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-200 hover:text-lime py-2 border-b border-forest-800"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-3">
            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-lime text-forest-950 font-bold py-3 rounded-full text-center"
            >
              <span>{t.nav.join}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
