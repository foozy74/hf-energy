'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface LiveEnergyData {
  isLive: boolean;
  updatedAt: string;
  source: 'anker_solix_e5000' | 'simulated';
  model: string;
  solarPowerW: number;
  batterySoc: number;
  batteryPowerW: number;
  homeConsumptionW: number;
  gridPowerW: number;
  // Formatted helpers
  solarDisplay: string;
  batterySocDisplay: string;
  batteryActionDisplay: string;
  homeConsumptionDisplay: string;
  gridDisplay: string;
  refresh: () => Promise<void>;
}

const defaultData: LiveEnergyData = {
  isLive: false,
  updatedAt: '',
  source: 'simulated',
  model: 'Anker SOLIX Solarbank 4 E5000 Pro',
  solarPowerW: 0,
  batterySoc: 0,
  batteryPowerW: 0,
  homeConsumptionW: 0,
  gridPowerW: 0,
  solarDisplay: '0 W',
  batterySocDisplay: '0%',
  batteryActionDisplay: 'Bereit',
  homeConsumptionDisplay: '0 W',
  gridDisplay: '0 W',
  refresh: async () => {},
};

const LiveEnergyContext = createContext<LiveEnergyData>(defaultData);

function formatWatts(watts: number): string {
  if (Math.abs(watts) >= 1000) {
    return `${(watts / 1000).toFixed(2).replace('.', ',')} kW`;
  }
  return `${Math.round(watts)} W`;
}

export const LiveEnergyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LiveEnergyData>(defaultData);

  const fetchEnergy = useCallback(async () => {
    try {
      const res = await fetch('/api/energy', { cache: 'no-store' });
      if (!res.ok) return;
      const json = await res.json();

      const solarW = json.solarPowerW ?? 0;
      const battSoc = json.batterySoc ?? 0;
      const battPowerW = json.batteryPowerW ?? 0;
      const homeW = json.homeConsumptionW ?? 0;
      const gridW = json.gridPowerW ?? 0;

      let batteryAction = 'Standby';
      if (battPowerW > 50) {
        batteryAction = `+${formatWatts(battPowerW)} (Laden)`;
      } else if (battPowerW < -50) {
        batteryAction = `-${formatWatts(Math.abs(battPowerW))} (Entladen)`;
      }

      let gridDisplay = '0 W (Ausgeglichen)';
      if (gridW > 50) {
        gridDisplay = `+${formatWatts(gridW)} (Einspeisung)`;
      } else if (gridW < -50) {
        gridDisplay = `-${formatWatts(Math.abs(gridW))} (Netzbezug)`;
      }

      setData({
        isLive: !!json.isLive,
        updatedAt: json.updatedAt || new Date().toISOString(),
        source: json.source || 'simulated',
        model: json.system?.model || 'Anker SOLIX Solarbank 4 E5000 Pro',
        solarPowerW: solarW,
        batterySoc: battSoc,
        batteryPowerW: battPowerW,
        homeConsumptionW: homeW,
        gridPowerW: gridW,
        solarDisplay: formatWatts(solarW),
        batterySocDisplay: `${battSoc}%`,
        batteryActionDisplay: batteryAction,
        homeConsumptionDisplay: formatWatts(homeW),
        gridDisplay,
        refresh: fetchEnergy,
      });
    } catch {
      // Keep existing data on transient network failure
    }
  }, []);

  useEffect(() => {
    fetchEnergy();
    // Poll every 15 seconds
    const interval = setInterval(fetchEnergy, 15000);
    return () => clearInterval(interval);
  }, [fetchEnergy]);

  return (
    <LiveEnergyContext.Provider value={data}>
      {children}
    </LiveEnergyContext.Provider>
  );
};

export const useLiveEnergy = () => useContext(LiveEnergyContext);
