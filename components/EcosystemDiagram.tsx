'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Battery, Building2, Car, ArrowRight, Zap, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

type SystemMode = 'sunny' | 'peak' | 'island';
type ActiveNode = 'solar' | 'storage' | 'buildings' | 'ev';

export const EcosystemDiagram: React.FC = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<SystemMode>('sunny');
  const [selectedNode, setSelectedNode] = useState<ActiveNode>('solar');

  // Dynamic values depending on simulation mode
  const modeData = {
    sunny: {
      solarPower: '920 kW',
      batteryAction: '+280 kW (Laden)',
      buildingConsumption: '340 kW',
      evAction: '+300 kW (Laden via V2H)',
      gridFeed: '0 kW (100% lokal verwertet)',
      headline: 'Vollständige solare Eigenversorgung & maximale Ladung',
      statusColor: 'text-lime',
    },
    peak: {
      solarPower: '12 kW (Dämmerung)',
      batteryAction: '-210 kW (Entladen)',
      buildingConsumption: '480 kW (Abendspitze)',
      evAction: '-258 kW (V2H Einspeisung)',
      gridFeed: '0 kW Netzbezug nötig',
      headline: 'Autarke Versorgung der Wohnungen aus Speichern & E-Autos',
      statusColor: 'text-emerald-400',
    },
    island: {
      solarPower: '450 kW',
      batteryAction: 'Netzbildender Wechselrichter aktiv',
      buildingConsumption: '390 kW (priorisierte Kreise)',
      evAction: 'Reservespeicher bereitgestellt',
      gridFeed: 'Öffentliches Netz getrennt (Blackout)',
      headline: '100% autarke Notstromversorgung im Inselbetrieb',
      statusColor: 'text-solar',
    },
  };

  const nodeDetails = {
    solar: {
      title: t.system.solarTitle,
      category: 'Lokale Erzeugung',
      desc: t.system.solarDesc,
      metric1: '1.240 kWp Gesamtleistung',
      metric2: '1.280.000 kWh / Jahr',
      metric3: 'Ost-West & Südausrichtung',
      badge: 'Erzeugung',
    },
    storage: {
      title: t.system.storageTitle,
      category: 'Stationäre Speicherung',
      desc: t.system.storageDesc,
      metric1: '850 kWh Nettokapazität',
      metric2: '6.000+ Ladezyklen (LiFePO4)',
      metric3: 'Schwarzstart- und inselnetzfähig',
      badge: 'Puffer & Stabilität',
    },
    buildings: {
      title: t.system.buildingsTitle,
      category: 'Verbraucher & Wärme',
      desc: t.system.buildingsDesc,
      metric1: '420 Wohneinheiten angebunden',
      metric2: '4 Groß-Wärmepumpen (Heizung & WW)',
      metric3: 'Smart Meter 15-Min. Auslesung',
      badge: 'Verbraucher',
    },
    ev: {
      title: t.system.evTitle,
      category: 'Mobile Speicher (V2H/V2G)',
      desc: t.system.evDesc,
      metric1: 'Bis zu 1.800 kWh mobile Kapazität',
      metric2: 'Wallboxen mit ISO 15118-20 Standard',
      metric3: 'Vergütung für teilnehmende Fahrer',
      badge: 'Flexibilität',
    },
  };

  const activeNodeInfo = nodeDetails[selectedNode];

  return (
    <section id="system" className="py-24 bg-forest-900 relative overflow-hidden border-t border-forest-800">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-lime/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-forest-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-forest-800 border border-lime/30 text-lime text-xs font-bold tracking-widest uppercase mb-4">
            {t.system.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-offwhite font-sans tracking-tight mb-5">
            {t.system.title}
          </h2>
          <p className="text-lg text-offwhite/80 font-normal leading-relaxed">
            {t.system.desc}
          </p>

          {/* Interactive Simulation Scenario Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-forest-950/80 border border-forest-700/80 max-w-full overflow-x-auto shadow-xl">
            <button
              onClick={() => setMode('sunny')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === 'sunny'
                  ? 'bg-lime text-forest-950 shadow-lime-glow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{t.system.modeSunny}</span>
            </button>

            <button
              onClick={() => setMode('peak')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === 'peak'
                  ? 'bg-lime text-forest-950 shadow-lime-glow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{t.system.modePeak}</span>
            </button>

            <button
              onClick={() => setMode('island')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === 'island'
                  ? 'bg-solar text-forest-950 shadow-[0_0_15px_rgba(250,204,21,0.5)]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.system.modeIsland}</span>
            </button>
          </div>
        </div>

        {/* Dynamic State Bar */}
        <div className="mb-10 p-4 rounded-xl clean-glass-dark border border-lime/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-lime animate-ping" />
            <span className="font-bold text-offwhite font-sans">
              Status: <span className={modeData[mode].statusColor}>{modeData[mode].headline}</span>
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div>
              <span className="text-gray-400">PV:</span>{' '}
              <span className="text-solar font-bold">{modeData[mode].solarPower}</span>
            </div>
            <div>
              <span className="text-gray-400">Speicher:</span>{' '}
              <span className="text-lime font-bold">{modeData[mode].batteryAction}</span>
            </div>
            <div>
              <span className="text-gray-400">Wohnungen:</span>{' '}
              <span className="text-offwhite font-bold">{modeData[mode].buildingConsumption}</span>
            </div>
          </div>
        </div>

        {/* The 4 Connected Ecosystem Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Node 1: Solardächer */}
          <div
            onClick={() => setSelectedNode('solar')}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
              selectedNode === 'solar'
                ? 'bg-forest-800/95 border-lime shadow-lime-glow -translate-y-1'
                : 'bg-forest-950/70 border-forest-700/60 hover:border-lime/50 hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-solar/15 border border-solar/30 flex items-center justify-center text-solar">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-forest-900 text-lime border border-forest-700">
                Erzeugung
              </span>
            </div>
            <h3 className="text-lg font-bold text-offwhite font-sans mb-1">
              {t.system.solarTitle}
            </h3>
            <p className="text-xs text-gray-300 line-clamp-3 mb-4">
              {t.system.solarDesc}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-forest-700/60 text-xs">
              <span className="text-gray-400">Aktuell:</span>
              <span className="font-mono font-bold text-solar">{modeData[mode].solarPower}</span>
            </div>
          </div>

          {/* Node 2: Batteriespeicher */}
          <div
            onClick={() => setSelectedNode('storage')}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
              selectedNode === 'storage'
                ? 'bg-forest-800/95 border-lime shadow-lime-glow -translate-y-1'
                : 'bg-forest-950/70 border-forest-700/60 hover:border-lime/50 hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-lime/15 border border-lime/30 flex items-center justify-center text-lime">
                <Battery className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-forest-900 text-lime border border-forest-700">
                Puffer
              </span>
            </div>
            <h3 className="text-lg font-bold text-offwhite font-sans mb-1">
              {t.system.storageTitle}
            </h3>
            <p className="text-xs text-gray-300 line-clamp-3 mb-4">
              {t.system.storageDesc}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-forest-700/60 text-xs">
              <span className="text-gray-400">Aktivität:</span>
              <span className="font-mono font-bold text-lime">{modeData[mode].batteryAction}</span>
            </div>
          </div>

          {/* Node 3: Gebäude & Verbraucher */}
          <div
            onClick={() => setSelectedNode('buildings')}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
              selectedNode === 'buildings'
                ? 'bg-forest-800/95 border-lime shadow-lime-glow -translate-y-1'
                : 'bg-forest-950/70 border-forest-700/60 hover:border-lime/50 hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-forest-900 text-offwhite border border-forest-700">
                Verbraucher
              </span>
            </div>
            <h3 className="text-lg font-bold text-offwhite font-sans mb-1">
              {t.system.buildingsTitle}
            </h3>
            <p className="text-xs text-gray-300 line-clamp-3 mb-4">
              {t.system.buildingsDesc}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-forest-700/60 text-xs">
              <span className="text-gray-400">Bedarf:</span>
              <span className="font-mono font-bold text-offwhite">{modeData[mode].buildingConsumption}</span>
            </div>
          </div>

          {/* Node 4: Bidirektionale EVs */}
          <div
            onClick={() => setSelectedNode('ev')}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
              selectedNode === 'ev'
                ? 'bg-forest-800/95 border-lime shadow-lime-glow -translate-y-1'
                : 'bg-forest-950/70 border-forest-700/60 hover:border-lime/50 hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-forest-900 text-cyan-300 border border-forest-700">
                V2H / V2G
              </span>
            </div>
            <h3 className="text-lg font-bold text-offwhite font-sans mb-1">
              {t.system.evTitle}
            </h3>
            <p className="text-xs text-gray-300 line-clamp-3 mb-4">
              {t.system.evDesc}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-forest-700/60 text-xs">
              <span className="text-gray-400">Status:</span>
              <span className="font-mono font-bold text-cyan-300">{modeData[mode].evAction}</span>
            </div>
          </div>
        </div>

        {/* Selected Node Deep Dive Display */}
        <div className="rounded-2xl clean-glass-dark p-6 sm:p-8 border border-lime/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase text-lime font-semibold">
                {activeNodeInfo.category}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-xs text-gray-300">Detailansicht der Komponente</span>
            </div>
            <h3 className="text-2xl font-extrabold text-offwhite font-sans mb-3">
              {activeNodeInfo.title}
            </h3>
            <p className="text-sm sm:text-base text-offwhite/85 leading-relaxed mb-6 font-normal">
              {activeNodeInfo.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-forest-950/70 border border-forest-700/60 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime flex-shrink-0" />
                <span className="text-gray-200">{activeNodeInfo.metric1}</span>
              </div>
              <div className="p-3 rounded-lg bg-forest-950/70 border border-forest-700/60 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime flex-shrink-0" />
                <span className="text-gray-200">{activeNodeInfo.metric2}</span>
              </div>
              <div className="p-3 rounded-lg bg-forest-950/70 border border-forest-700/60 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime flex-shrink-0" />
                <span className="text-gray-200">{activeNodeInfo.metric3}</span>
              </div>
            </div>
          </div>

          {/* Original Isometric Graphic from CD PDF */}
          <div className="relative w-full lg:w-96 h-60 rounded-xl overflow-hidden border border-forest-700/80 bg-forest-950 flex items-center justify-center p-2 group">
            <Image
              src="/images/system-diagram.png"
              alt="Energiezellen-System Isometrie"
              width={480}
              height={300}
              className="object-contain max-h-full w-auto transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-lime bg-forest-950/80 px-2 py-0.5 rounded border border-lime/30">
              Energiezellen-Architektur
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
