'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Battery, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export const CorePillars: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: 'solar',
      icon: Sun,
      iconColor: 'text-solar',
      borderColor: 'hover:border-solar/60',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(250,204,21,0.25)]',
      title: t.pillars.pillar1Title,
      subtitle: t.pillars.pillar1Sub,
      quote: 'Capture more clean energy where we live, work, and connect.',
      points: t.pillars.pillar1Points,
      stat: '100%',
      statLabel: 'Dachflächen-Nutzung',
    },
    {
      id: 'storage',
      icon: Battery,
      iconColor: 'text-lime',
      borderColor: 'hover:border-lime/60',
      glowColor: 'group-hover:shadow-lime-glow',
      title: t.pillars.pillar2Title,
      subtitle: t.pillars.pillar2Sub,
      quote: 'Store surplus, balance demand, and power our community when it matters.',
      points: t.pillars.pillar2Points,
      stat: '6.000+',
      statLabel: 'Zyklen Lebensdauer',
    },
    {
      id: 'ev',
      icon: Zap,
      iconColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-400/60',
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]',
      title: t.pillars.pillar3Title,
      subtitle: t.pillars.pillar3Sub,
      quote: 'Turn vehicles into flexible energy assets — supporting homes and the grid.',
      points: t.pillars.pillar3Points,
      stat: 'V2H/V2G',
      statLabel: 'Bidirektionale Flexibilität',
    },
  ];

  return (
    <section id="pillars" className="py-24 bg-forest-950 relative overflow-hidden border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-forest-800 border border-lime/30 text-lime text-xs font-bold tracking-widest uppercase mb-4">
            {t.pillars.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-offwhite font-sans tracking-tight mb-5">
            {t.pillars.title}
          </h2>
          <p className="text-lg text-offwhite/80 font-normal leading-relaxed">
            {t.pillars.desc}
          </p>
        </div>

        {/* 3 Core Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`group rounded-2xl bg-forest-900/70 border border-forest-700/70 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${pillar.borderColor} ${pillar.glowColor}`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-forest-950/90 border border-forest-700 flex items-center justify-center">
                      <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-lg text-offwhite block">
                        {pillar.stat}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {pillar.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-offwhite font-sans tracking-tight mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-lime font-medium uppercase tracking-wide mb-4">
                    {pillar.subtitle}
                  </p>

                  {/* Original CD Quote */}
                  <blockquote className="p-3.5 rounded-xl bg-forest-950/60 border-l-2 border-lime text-xs text-gray-300 italic mb-6">
                    „{pillar.quote}“
                  </blockquote>

                  {/* Key Feature Bullet Points */}
                  <ul className="space-y-3 mb-6 text-xs sm:text-sm text-offwhite/80">
                    {pillar.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-forest-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400 uppercase">
                    Pfeiler #{pillar.id.toUpperCase()}
                  </span>
                  <a
                    href="#calculator"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-lime group-hover:text-lime-hover transition-colors"
                  >
                    <span>Simulation öffnen</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
