'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-forest-950">
      {/* Background Aerial Network Image from Corporate Design */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/neighborhood-network.png"
            alt="Hertha Firnberg Vernetztes Quartier"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105 animate-pulse-subtle"
          />
          {/* Gradients blending into Waldgrün (#0E3B2E) and Graphit (#1E2522) */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-900/80 to-forest-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime/15 via-forest-950/60 to-forest-950" />
        </div>
      </div>

      {/* Pulsing visual energy grid lines overlaid on top */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8F169" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#C8F169" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C8F169" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M 100,200 Q 400,300 700,150 T 1300,350"
            fill="none"
            stroke="url(#heroLineGrad)"
            strokeWidth="2"
            className="animate-energy-flow"
          />
          <path
            d="M 200,600 Q 600,450 1000,550 T 1600,400"
            fill="none"
            stroke="url(#heroLineGrad)"
            strokeWidth="1.5"
            className="animate-energy-flow-fast"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Typography & CTAs */}
        <div className="max-w-3xl">
          {/* CD Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-lime/30 text-xs font-semibold text-lime mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
            <span>{t.hero.badge}</span>
          </div>

          {/* H1 Headline strictly from CD:
              H1 HEADLINE: Geometrisch • Bold • Großzügig • Klar */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-sans text-offwhite leading-[1.08] mb-6">
            <span>{t.hero.h1Line1}</span>
            <br />
            <span>{t.hero.h1Line2}</span>
            <br />
            <span className="text-lime drop-shadow-[0_0_20px_rgba(200,241,105,0.4)]">
              {t.hero.h1Line3}
            </span>
          </h1>

          {/* Subheadline: Geometrisch • Medium • Strukturiert */}
          <p className="text-lg sm:text-xl text-offwhite/85 font-normal leading-relaxed max-w-2xl mb-8 font-sans">
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a
              href="#system"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-lime hover:bg-lime-hover active:bg-lime-active text-forest-950 font-extrabold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lime-glow hover:shadow-lime-glow-lg transform hover:-translate-y-0.5"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-900/80 hover:bg-forest-800 border border-forest-600 hover:border-lime text-offwhite font-bold text-base px-7 py-4 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Real-Time Live Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-forest-800/80 max-w-xl">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-offwhite font-sans">
                {t.hero.statSolar}
              </span>
              <span className="text-xs sm:text-sm text-lime/80 font-medium">
                {t.hero.statSolarLabel}
              </span>
            </div>

            <div className="flex flex-col border-l border-forest-800 pl-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-lime font-sans">
                {t.hero.statAutarky}
              </span>
              <span className="text-xs sm:text-sm text-offwhite/70 font-medium">
                {t.hero.statAutarkyLabel}
              </span>
            </div>

            <div className="flex flex-col border-l border-forest-800 pl-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-offwhite font-sans">
                {t.hero.statCO2}
              </span>
              <span className="text-xs sm:text-sm text-lime/80 font-medium">
                {t.hero.statCO2Label}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual from extracted_assets/hero1.png (Wienerbergcity) */}
        <div className="w-full max-w-md lg:max-w-xl">
          <div className="relative rounded-3xl overflow-hidden border border-lime/30 bg-forest-950 shadow-2xl shadow-forest-950/80 group">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/hero1.png"
                alt="Wienerbergcity vernetzte Energiezelle"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
            </div>

            {/* Bottom Caption Overlay */}
            <div className="p-5 bg-forest-950/95 border-t border-forest-800/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
                  <span className="text-xs font-mono font-bold text-lime uppercase tracking-wider">
                    Wienerbergcity
                  </span>
                </div>
                <div className="text-sm font-bold text-offwhite font-sans">
                  Energiezelle Hertha-Firnberg-Straße
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-gray-400 block">1100 Wien</span>
                <span className="text-[11px] font-mono text-lime font-semibold">EEG § 16a ElWOG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
