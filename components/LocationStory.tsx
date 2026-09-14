'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Building, Sun, BatteryCharging, ArrowUpRight } from 'lucide-react';

export const LocationStory: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="location" className="py-24 bg-forest-900 relative overflow-hidden border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text & Story (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-800 border border-lime/30 text-lime text-xs font-bold tracking-widest uppercase mb-4">
              <MapPin className="w-3.5 h-3.5 text-lime" />
              <span>{t.location.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-offwhite font-sans tracking-tight mb-2">
              {t.location.title}
            </h2>
            <p className="text-sm font-mono text-lime uppercase tracking-wider mb-6">
              {t.location.subtitle}
            </p>

            <div className="space-y-4 text-base text-offwhite/85 leading-relaxed mb-8">
              <p>{t.location.p1}</p>
              <p>{t.location.p2}</p>
            </div>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-forest-800">
              <div className="p-4 rounded-xl bg-forest-950/70 border border-forest-700">
                <span className="text-2xl sm:text-3xl font-extrabold text-offwhite font-sans block">
                  {t.location.statHomes}
                </span>
                <span className="text-xs text-lime font-medium">
                  {t.location.statHomesLabel}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-forest-950/70 border border-forest-700">
                <span className="text-2xl sm:text-3xl font-extrabold text-solar font-sans block">
                  {t.location.statCapacity}
                </span>
                <span className="text-xs text-gray-300 font-medium">
                  {t.location.statCapacityLabel}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-forest-950/70 border border-forest-700">
                <span className="text-2xl sm:text-3xl font-extrabold text-lime font-sans block">
                  {t.location.statBattery}
                </span>
                <span className="text-xs text-gray-300 font-medium">
                  {t.location.statBatteryLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right: High-Res Aerial Map Visual with Pulsing Dots (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-lime/30 shadow-2xl bg-forest-950 aspect-[4/5] group">
              <Image
                src="/images/neighborhood-network.png"
                alt="Quartier Hertha Firnberg Wienerbergcity"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />

              {/* Pulsing Hotspots on the map */}
              <div className="absolute top-1/3 left-1/3 flex items-center gap-2 group-hover:scale-110 transition-transform">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-lime shadow-lime-glow" />
                </span>
                <span className="text-[11px] font-mono font-bold text-forest-950 bg-lime/90 px-2 py-0.5 rounded shadow">
                  Solar-Cluster A
                </span>
              </div>

              <div className="absolute bottom-1/3 right-1/4 flex items-center gap-2 group-hover:scale-110 transition-transform">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-lime shadow-lime-glow" />
                </span>
                <span className="text-[11px] font-mono font-bold text-forest-950 bg-lime/90 px-2 py-0.5 rounded shadow">
                  Zentral-Speicher
                </span>
              </div>

              {/* Bottom tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl clean-glass-dark border border-lime/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  <span className="text-offwhite font-bold">Wienerbergcity Energiezelle</span>
                </div>
                <span className="text-lime font-mono">1100 Wien</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
