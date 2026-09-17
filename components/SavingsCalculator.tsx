'use client';

import React, { useState, useId } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, Zap, TrendingUp, Leaf, Shield, ArrowRight, Check, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
  const { t } = useLanguage();

  const unitsInputId = useId();
  const pvInputId = useId();
  const batteryInputId = useId();
  const evInputId = useId();

  // State
  const [apartments, setApartments] = useState<number>(64);
  const [pvKwp, setPvKwp] = useState<number>(180);
  const [batteryKwh, setBatteryKwh] = useState<number>(120);
  const [evCount, setEvCount] = useState<number>(12);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Quick Presets
  const applyPreset = (units: number, pv: number, batt: number, evs: number) => {
    setApartments(units);
    setPvKwp(pv);
    setBatteryKwh(batt);
    setEvCount(evs);
  };

  // Calculations based on Austrian energy benchmark data:
  // Avg apartment consumption: ~2,500 kWh/yr + general areas & heat pump: ~1,000 kWh/yr = 3,500 kWh/unit/yr
  const totalDemandKwh = apartments * 3500;
  const solarGenKwh = pvKwp * 1050; // 1050 kWh per kWp in Vienna

  // PV area calculation: 450 Wp module is ~2.0 m² (2 m² / 0.45 kWp = 4.444 m² / kWp)
  const pvAreaM2 = pvKwp <= 0.45 ? 2 : Math.round(pvKwp * (2 / 0.45));
  const pvDisplayString =
    pvKwp < 1
      ? `${Math.round(pvKwp * 1000)} Wp (~${pvAreaM2} m²)`
      : `${pvKwp} kWp (~${pvAreaM2.toLocaleString('de-AT')} m²)`;

  // Total storage capacity including 25 kWh per participating V2H EV
  const totalStorageCapacity = batteryKwh + evCount * 25;

  // Direct solar consumption ratio without storage is ~35%, storage adds up to another 45-55%
  const storageCoverageRatio = Math.min(0.55, (totalStorageCapacity / (totalDemandKwh / 365)) * 0.45);
  const directCoverageRatio = Math.min(0.35, (solarGenKwh / totalDemandKwh) * 0.45);
  const totalAutarky = Math.min(94, Math.round((directCoverageRatio + storageCoverageRatio) * 100));

  // Local power price: ~0.14 €/kWh vs grid price: ~0.30 €/kWh => Savings of ~0.16 €/kWh
  const selfConsumedKwh = (totalDemandKwh * totalAutarky) / 100;
  const annualSavingsEuro = Math.round(selfConsumedKwh * 0.16);

  // Austrian grid mix CO2: ~160g / kWh replaced by solar ~25g/kWh => ~135g/kWh saved
  const annualCO2Tons = (selfConsumedKwh * 0.000135).toFixed(1);

  // Blackout island autonomy in hours/days (based on prioritized critical load ~40% of normal demand)
  const criticalDailyDemand = (totalDemandKwh * 0.4) / 365;
  const autonomyDays = (totalStorageCapacity / criticalDailyDemand).toFixed(1);

  return (
    <section id="calculator" className="py-24 bg-forest-900 relative overflow-hidden border-t border-forest-800">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-forest-800 border border-lime/30 text-lime text-xs font-bold tracking-widest uppercase mb-4">
            {t.calculator.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-offwhite font-sans tracking-tight mb-5">
            {t.calculator.title}
          </h2>
          <p className="text-lg text-offwhite/80 font-normal leading-relaxed">
            {t.calculator.desc}
          </p>

          {/* Preset Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => applyPreset(2, 0.45, 0, 0)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-forest-950/80 border border-forest-700 hover:border-lime text-gray-300 hover:text-white transition-all"
            >
              Kleinstanlage (2 WE · 450 Wp)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(24, 75, 50, 4)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-forest-950/80 border border-forest-700 hover:border-lime text-gray-300 hover:text-white transition-all"
            >
              Kompakte Wohnanlage (24 WE)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(80, 240, 160, 16)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-forest-950/80 border border-forest-700 hover:border-lime text-gray-300 hover:text-white transition-all"
            >
              Mittelgroßer Wohnblock (80 WE)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(420, 1240, 850, 60)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-lime/20 border border-lime text-lime hover:bg-lime hover:text-forest-950 transition-all"
            >
              Gesamtes Quartier Hertha Firnberg (420 WE)
            </button>
          </div>

          {/* Info Toggle Button */}
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowInfo(!showInfo)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-forest-950/90 border border-lime/40 hover:border-lime text-lime hover:bg-lime/10 transition-all shadow-sm cursor-pointer"
            >
              <Info className="w-4 h-4 text-lime" />
              <span>{showInfo ? t.calculator.infoToggleHide : t.calculator.infoToggleShow}</span>
              {showInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Info Field: Calculation Basis & Formulas */}
        {showInfo && (
          <div className="mb-10 bg-forest-950/95 border border-lime/40 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm transition-all animate-in fade-in duration-300">
            <div className="flex items-start justify-between pb-4 mb-6 border-b border-forest-800">
              <div>
                <div className="flex items-center gap-2 text-lime font-bold text-base sm:text-lg">
                  <Info className="w-5 h-5 flex-shrink-0" />
                  <span>Berechnungsgrundlagen &amp; Formeln des Simulators</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Rechts- und benchmarkkonforme Modellierung nach dem österreichischen EAG &amp; § 16a ElWOG (Erneuerbare-Energie-Gemeinschaften).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-forest-900 border border-forest-800 hover:border-forest-600 text-xs font-mono transition-all"
                title="Schließen"
              >
                ✕ Schließen
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* Box 1: Referenzwerte & Benchmarks */}
              <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-4 sm:p-5 space-y-3">
                <h4 className="font-bold text-lime text-sm flex items-center gap-2 pb-2 border-b border-forest-800/80">
                  <span>1. Referenzwerte &amp; Benchmarks (Wien / Österreich)</span>
                </h4>
                <ul className="space-y-2.5 text-gray-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold">•</span>
                    <span>
                      <strong className="text-offwhite">Strombedarf pro WE:</strong> Ø 3.500 kWh/Jahr (~2.500 kWh Haushaltsstrom + ~1.000 kWh Allgemeinstrom &amp; Wärmepumpenanteil).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold">•</span>
                    <span>
                      <strong className="text-offwhite">Spezifischer Solarertrag:</strong> 1.050 kWh pro kWp/Jahr (Wiener Einstrahlungs-Benchmark laut PVGIS).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold">•</span>
                    <span>
                      <strong className="text-offwhite">Kleinste PV-Einheit:</strong> 450 Wp (0,45 kWp) auf ca. 2,0 m² Modulfläche (~225 Wp/m² moderner Modulstandard).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold">•</span>
                    <span>
                      <strong className="text-offwhite">V2H / V2G E-Fahrzeuge:</strong> 25 kWh nutzbarer mobiler Speicherpuffer pro teilnehmendem E-Auto.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold">•</span>
                    <span>
                      <strong className="text-offwhite">Ersparnis pro kWh:</strong> Ø 0,16 €/kWh (Differenz: Netzstrombezug ca. 0,30 €/kWh abzüglich EEG-Gemeinschaftsstrom ca. 0,14 €/kWh).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold">•</span>
                    <span>
                      <strong className="text-offwhite">CO₂-Reduktion:</strong> 135 g CO₂/kWh vermieden (österr. Netzmix ca. 160 g/kWh vs. lokaler Solarstrom ca. 25 g/kWh).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime font-bold">•</span>
                    <span>
                      <strong className="text-offwhite">Notstrombetrieb:</strong> 40 % der durchschnittlichen Tageslast als priorisierte kritische Infrastruktur (Inselbetrieb).
                    </span>
                  </li>
                </ul>
              </div>

              {/* Box 2: Mathematische Formeln & Algorithmus */}
              <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-4 sm:p-5 space-y-3 font-mono text-xs">
                <h4 className="font-bold text-lime text-sm flex items-center gap-2 pb-2 border-b border-forest-800/80 font-sans">
                  <span>2. Mathematische Formeln &amp; Algorithmus</span>
                </h4>
                <div className="space-y-2.5 text-gray-300">
                  <div className="bg-forest-950/80 p-2.5 rounded-lg border border-forest-800">
                    <div className="text-lime font-semibold mb-0.5">Jahresstrombedarf:</div>
                    <div className="text-offwhite">Bedarf = WE × 3.500 kWh</div>
                  </div>
                  <div className="bg-forest-950/80 p-2.5 rounded-lg border border-forest-800">
                    <div className="text-solar font-semibold mb-0.5">Solare Jahreserzeugung:</div>
                    <div className="text-offwhite">Erzeugung = kWp × 1.050 kWh</div>
                  </div>
                  <div className="bg-forest-950/80 p-2.5 rounded-lg border border-forest-800">
                    <div className="text-cyan-300 font-semibold mb-0.5">Gesamtspeicherkapazität:</div>
                    <div className="text-offwhite">Speicher = Batterie (kWh) + (E-Autos × 25 kWh)</div>
                  </div>
                  <div className="bg-forest-950/80 p-2.5 rounded-lg border border-forest-800">
                    <div className="text-lime font-semibold mb-0.5">Autarkiegrad (%):</div>
                    <div className="text-offwhite leading-relaxed">
                      min(94%, Direktanteil (max. 35%) + Speicheranteil (max. 55%))
                    </div>
                  </div>
                  <div className="bg-forest-950/80 p-2.5 rounded-lg border border-forest-800">
                    <div className="text-emerald-400 font-semibold mb-0.5">Kostenersparnis &amp; Ökologie:</div>
                    <div className="text-offwhite">Ersparnis (€/a) = (Bedarf × Autarkie / 100) × 0,16 €</div>
                    <div className="text-offwhite mt-1">CO₂-Einsparung (t/a) = Eigenverbrauch × 0,000135 t</div>
                    <div className="text-offwhite mt-1">Notstrom-Tage = Speicher / (Tagesbedarf × 40%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders (7 cols) */}
          <div className="lg:col-span-7 bg-forest-950/90 border border-forest-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-forest-800">
              <h3 className="text-lg font-bold text-offwhite flex items-center gap-2">
                <Calculator className="w-5 h-5 text-lime" />
                <span>Eigenschaften Ihrer Liegenschaft</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowInfo(!showInfo)}
                  title="Berechnungsgrundlagen anzeigen"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-lime bg-forest-900 hover:bg-lime/10 px-2.5 py-1 rounded-md border border-lime/30 transition-all cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Info</span>
                </button>
                <span className="text-xs font-mono text-lime bg-forest-900 px-2.5 py-1 rounded-md border border-lime/30">
                  EAG konform
                </span>
              </div>
            </div>

            <div className="space-y-7">
              {/* Slider 1: Wohneinheiten */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={unitsInputId} className="text-sm font-semibold text-offwhite">
                    {t.calculator.unitsLabel}
                  </label>
                  <span className="text-sm font-mono font-bold text-lime bg-forest-900 px-3 py-1 rounded-lg border border-forest-700">
                    {apartments} {apartments === 1 ? 'Wohnung' : 'Wohnungen'}
                  </span>
                </div>
                <input
                  id={unitsInputId}
                  type="range"
                  min="2"
                  max="500"
                  step="1"
                  value={apartments}
                  onChange={(e) => setApartments(Number(e.target.value))}
                  className="w-full h-2 bg-forest-800 rounded-lg appearance-none cursor-pointer accent-lime"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                  <span>2 WE</span>
                  <span>100 WE</span>
                  <span>250 WE</span>
                  <span>500 WE</span>
                </div>
              </div>

              {/* Slider 2: PV Leistung */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={pvInputId} className="text-sm font-semibold text-offwhite">
                    {t.calculator.pvLabel}
                  </label>
                  <span className="text-sm font-mono font-bold text-solar bg-forest-900 px-3 py-1 rounded-lg border border-forest-700">
                    {pvDisplayString}
                  </span>
                </div>
                <input
                  id={pvInputId}
                  type="range"
                  min="0.45"
                  max="1500"
                  step="any"
                  value={pvKwp}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (val <= 0.6) setPvKwp(0.45);
                    else if (val < 2) setPvKwp(Math.round(val * 2) / 2);
                    else if (val < 20) setPvKwp(Math.round(val));
                    else if (val < 100) setPvKwp(Math.round(val / 5) * 5);
                    else setPvKwp(Math.round(val / 10) * 10);
                  }}
                  className="w-full h-2 bg-forest-800 rounded-lg appearance-none cursor-pointer accent-solar"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                  <span>450 Wp (2 m²)</span>
                  <span>100 kWp</span>
                  <span>500 kWp</span>
                  <span>1.500 kWp</span>
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-gray-400">Schnellauswahl:</span>
                  <button
                    type="button"
                    onClick={() => setPvKwp(0.45)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer ${
                      pvKwp === 0.45
                        ? 'bg-solar/20 border-solar text-solar font-bold'
                        : 'bg-forest-900 border-forest-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    450 Wp (2 m²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPvKwp(10)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer ${
                      pvKwp === 10
                        ? 'bg-solar/20 border-solar text-solar font-bold'
                        : 'bg-forest-900 border-forest-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    10 kWp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPvKwp(50)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer ${
                      pvKwp === 50
                        ? 'bg-solar/20 border-solar text-solar font-bold'
                        : 'bg-forest-900 border-forest-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    50 kWp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPvKwp(180)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer ${
                      pvKwp === 180
                        ? 'bg-solar/20 border-solar text-solar font-bold'
                        : 'bg-forest-900 border-forest-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    180 kWp
                  </button>
                </div>
              </div>

              {/* Slider 3: Batteriespeicher */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={batteryInputId} className="text-sm font-semibold text-offwhite">
                    {t.calculator.storageLabel}
                  </label>
                  <span className="text-sm font-mono font-bold text-lime bg-forest-900 px-3 py-1 rounded-lg border border-forest-700">
                    {batteryKwh} kWh LiFePO4
                  </span>
                </div>
                <input
                  id={batteryInputId}
                  type="range"
                  min="0"
                  max="1200"
                  step="10"
                  value={batteryKwh}
                  onChange={(e) => setBatteryKwh(Number(e.target.value))}
                  className="w-full h-2 bg-forest-800 rounded-lg appearance-none cursor-pointer accent-lime"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                  <span>0 kWh</span>
                  <span>300 kWh</span>
                  <span>600 kWh</span>
                  <span>1.200 kWh</span>
                </div>
              </div>

              {/* Slider 4: V2H E-Autos */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={evInputId} className="text-sm font-semibold text-offwhite">
                    {t.calculator.evLabel}
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan-300 bg-forest-900 px-3 py-1 rounded-lg border border-forest-700">
                    {evCount} E-Autos (+{evCount * 25} kWh Puffer)
                  </span>
                </div>
                <input
                  id={evInputId}
                  type="range"
                  min="0"
                  max="100"
                  step="2"
                  value={evCount}
                  onChange={(e) => setEvCount(Number(e.target.value))}
                  className="w-full h-2 bg-forest-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                  <span>0 Autos</span>
                  <span>25 Autos</span>
                  <span>50 Autos</span>
                  <span>100 Autos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Calculated Results (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Primary Highlight Card: Cost Savings */}
            <div className="rounded-2xl bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 border border-lime/40 p-6 sm:p-7 shadow-lime-glow relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-lime flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t.calculator.resultSavings}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  title="Berechnungsgrundlagen anzeigen"
                  className="text-[10px] font-mono bg-forest-950/80 hover:bg-forest-900 text-lime px-2 py-0.5 rounded border border-lime/30 flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  <span>Ø 0,16 € Ersparnis / kWh</span>
                </button>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold text-offwhite font-sans tracking-tight my-2">
                {annualSavingsEuro.toLocaleString('de-AT')} €
              </div>
              <div className="text-xs text-lime/90 font-medium">
                {t.calculator.savingsPerYear} (~{Math.round(annualSavingsEuro / apartments)} € pro Haushalt)
              </div>
            </div>

            {/* Metric 2: Autarky Degree */}
            <div className="rounded-2xl bg-forest-950/80 border border-forest-700/80 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-300 block mb-1">
                  {t.calculator.resultAutarky}
                </span>
                <span className="text-xs text-lime">Direktverbrauch & Speicherpuffer</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-lime font-sans">
                  {totalAutarky}%
                </div>
                <div className="w-24 bg-forest-900 h-2 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-lime h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalAutarky}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 3: CO2 Saved */}
            <div className="rounded-2xl bg-forest-950/80 border border-forest-700/80 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-300 block mb-1">
                  {t.calculator.resultCO2}
                </span>
                <span className="text-xs text-emerald-400">Ökologischer Impact</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-offwhite font-sans">
                  {annualCO2Tons} <span className="text-lg font-normal text-gray-400">t</span>
                </div>
                <div className="text-[11px] text-gray-400">{t.calculator.annualCO2Avoided}</div>
              </div>
            </div>

            {/* Metric 4: Blackout Resilienz */}
            <div className="rounded-2xl bg-forest-950/80 border border-forest-700/80 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-300 block mb-1">
                  {t.calculator.resultIslandHours}
                </span>
                <span className="text-xs text-solar">Autarker Notstrombetrieb</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-solar font-sans">
                  {autonomyDays} <span className="text-lg font-normal text-gray-400">Tage</span>
                </div>
                <div className="text-[11px] text-gray-400">{t.calculator.blackoutAutonomy}</div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#join"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-lime hover:bg-lime-hover active:bg-lime-active text-forest-950 font-extrabold text-sm transition-all shadow-lime-glow"
            >
              <span>{t.calculator.ctaCalculate}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
