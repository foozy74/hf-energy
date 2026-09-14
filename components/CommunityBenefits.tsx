'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building, Users, Network, CheckCircle2, Shield, Euro, BarChart3, HeartHandshake } from 'lucide-react';

export const CommunityBenefits: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Building,
      badge: 'ESG & Rentabilität',
      badgeColor: 'text-lime bg-forest-900 border-lime/30',
      title: t.benefits.ownersTitle,
      desc: 'Zukunftssichere Immobilienentwicklung mit messbarem Wertzuwachs und automatisierter Verwaltung.',
      points: t.benefits.ownersPoints,
    },
    {
      icon: Users,
      badge: 'Lebensqualität & Ersparnis',
      badgeColor: 'text-solar bg-forest-900 border-solar/30',
      title: t.benefits.residentsTitle,
      desc: 'Direkter Bezug von günstigem Sonnenstrom vom eigenen Dach ohne bürokratischen Mehraufwand.',
      points: t.benefits.residentsPoints,
    },
    {
      icon: Network,
      badge: 'Klimaschutz & Netzentlastung',
      badgeColor: 'text-cyan-400 bg-forest-900 border-cyan-400/30',
      title: t.benefits.gridTitle,
      desc: 'Entlastung der Wiener Netze durch lokale Erzeugung und dynamische Speicheroptimierung.',
      points: t.benefits.gridPoints,
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-forest-950 relative overflow-hidden border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-3.5 py-1 rounded-full bg-forest-800 border border-lime/30 text-lime text-xs font-bold tracking-widest uppercase mb-4">
            {t.benefits.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-offwhite font-sans tracking-tight mb-5">
            {t.benefits.title}
          </h2>
          <p className="text-lg text-offwhite/80 font-normal leading-relaxed">
            Eine echte Win-Win-Situation für das gesamte Quartier: ökonomisch vorteilhaft, ökologisch unschlagbar und technisch resilient.
          </p>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="rounded-2xl bg-forest-900/80 border border-forest-700/80 hover:border-lime/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-forest-950 border border-forest-700 flex items-center justify-center text-lime group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-offwhite font-sans mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
                    {card.desc}
                  </p>

                  <ul className="space-y-3 pt-4 border-t border-forest-800">
                    {card.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-offwhite/85">
                        <CheckCircle2 className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
