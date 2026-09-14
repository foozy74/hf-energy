'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'de' | 'en';

export interface Translations {
  nav: {
    system: string;
    pillars: string;
    calculator: string;
    benefits: string;
    location: string;
    faq: string;
    join: string;
  };
  hero: {
    badge: string;
    h1Line1: string;
    h1Line2: string;
    h1Line3: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statSolar: string;
    statSolarLabel: string;
    statAutarky: string;
    statAutarkyLabel: string;
    statCO2: string;
    statCO2Label: string;
  };
  system: {
    tag: string;
    title: string;
    desc: string;
    modeTitle: string;
    modeSunny: string;
    modePeak: string;
    modeIsland: string;
    solarTitle: string;
    solarDesc: string;
    storageTitle: string;
    storageDesc: string;
    buildingsTitle: string;
    buildingsDesc: string;
    evTitle: string;
    evDesc: string;
    statusLegend: string;
  };
  pillars: {
    tag: string;
    title: string;
    desc: string;
    pillar1Title: string;
    pillar1Sub: string;
    pillar1Points: string[];
    pillar2Title: string;
    pillar2Sub: string;
    pillar2Points: string[];
    pillar3Title: string;
    pillar3Sub: string;
    pillar3Points: string[];
  };
  calculator: {
    tag: string;
    title: string;
    desc: string;
    unitsLabel: string;
    pvLabel: string;
    storageLabel: string;
    evLabel: string;
    resultSavings: string;
    resultAutarky: string;
    resultCO2: string;
    resultIslandHours: string;
    savingsPerYear: string;
    annualCO2Avoided: string;
    blackoutAutonomy: string;
    ctaCalculate: string;
  };
  benefits: {
    tag: string;
    title: string;
    ownersTitle: string;
    ownersPoints: string[];
    residentsTitle: string;
    residentsPoints: string[];
    gridTitle: string;
    gridPoints: string[];
  };
  location: {
    tag: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    statHomes: string;
    statHomesLabel: string;
    statCapacity: string;
    statCapacityLabel: string;
    statBattery: string;
    statBatteryLabel: string;
  };
  faq: {
    tag: string;
    title: string;
    items: { q: string; a: string }[];
  };
  join: {
    tag: string;
    title: string;
    desc: string;
    nameLabel: string;
    emailLabel: string;
    roleLabel: string;
    roleResident: string;
    roleOwner: string;
    roleManager: string;
    messageLabel: string;
    submitButton: string;
    successMsg: string;
  };
  footer: {
    desc: string;
    rights: string;
  };
}

const translations: Record<Language, Translations> = {
  de: {
    nav: {
      system: 'Energiezellen-System',
      pillars: 'Technologie',
      calculator: 'Autarkie-Rechner',
      benefits: 'Vorteile',
      location: 'Wienerbergcity',
      faq: 'Häufige Fragen',
      join: 'Mitmachen',
    },
    hero: {
      badge: 'Pionier-Energiegemeinschaft Hertha-Firnberg-Straße • Wien',
      h1Line1: 'Generate locally.',
      h1Line2: 'Close the gap.',
      h1Line3: 'Scale resilience.',
      sub: 'Wir verwandeln Wohnanlagen und Quartiere in vernetzte, krisensichere Energiezellen. Lokale Erzeugung, intelligenter Batteriespeicher und bidirektionale E-Fahrzeuge für maximale Unabhängigkeit.',
      ctaPrimary: 'Energiezelle erleben',
      ctaSecondary: 'Autarkie berechnen',
      statSolar: '1.240 kWp',
      statSolarLabel: 'Lokale PV-Kapazität',
      statAutarky: '88%',
      statAutarkyLabel: 'Durchschnittliche Autarkiequote',
      statCO2: '495 t',
      statCO2Label: 'CO₂-Reduktion / Jahr',
    },
    system: {
      tag: 'DAS SYSTEM DER ZUKUNFT',
      title: 'Das vernetzte Energiezellen-System',
      desc: 'Lokale Erzeugung, Speicherung und flexible Nutzung — in Echtzeit vernetzt zu einer krisensicheren und resilienten Gemeinschaft.',
      modeTitle: 'Betriebssituation simulieren:',
      modeSunny: 'Sonniger Tag (Überschuss)',
      modePeak: 'Abendspitze (Eigenstrom)',
      modeIsland: 'Inselbetrieb (Blackout-Schutz)',
      solarTitle: 'SOLARDÄCHER',
      solarDesc: 'Maximized Rooftop Solar: Photovoltaikanlagen auf allen geeigneten Dächern ernten sauberen Strom genau dort, wo er benötigt wird.',
      storageTitle: 'BATTERIESPEICHER',
      storageDesc: 'High-Capacity Stationary Storage: Zentraler Quartiers- und Quartierspuffer fängt Erzeugungsspitzen ab und sichert die Nachtversorgung.',
      buildingsTitle: 'GEBÄUDE & VERBRAUCHER',
      buildingsDesc: 'Haushalte, Wärmepumpen und Gemeinschaftsanlagen werden dynamisch mit dem günstigsten, lokal verfügbaren Strom versorgt.',
      evTitle: 'BIDIREKTIONALE EVS',
      evDesc: 'Smart V2H / V2G Integration: Mobile Speicher auf vier Rädern fungieren als flexible Energieressourcen für das Haus und das Quartier.',
      statusLegend: 'Aktiver Daten- & Energiefluss im Quartier',
    },
    pillars: {
      tag: 'DREI SÄULEN DER RESILIENZ',
      title: 'Von Gebäuden zu intelligenten Energiezellen',
      desc: 'Gemeinsam schaffen wir ein hochmodernes Energie-Ökosystem, das Bürgerinnen und Bürger aktiv an der Energiewende beteiligt.',
      pillar1Title: 'MAXIMIZED ROOFTOP SOLAR',
      pillar1Sub: 'Lokale Erzeugung auf Dächern & Fassaden',
      pillar1Points: [
        'Vollständige Ausnutzung solarer Dachflächen auf Mehrfamilienhäusern',
        'Gemeinschaftliche Erzeugungsanlage nach § 16a ElWOG',
        'Direkter Eigenverbrauch ohne Umwege über das überregionale Übertragungsnetz',
        'Priorisierte Versorgung der Wärmepumpen und Allgemeinstromzähler',
      ],
      pillar2Title: 'HIGH-CAPACITY STATIONARY STORAGE',
      pillar2Sub: 'Quartiersspeicher & Netzstabilität',
      pillar2Points: [
        'Zentrale LiFePO4-Quartiersbatterie mit hoher Zyklenfestigkeit',
        'Glättung von Lastspitzen (Peak Shaving) und Entlastung der Netze',
        'Bereitstellung von gesicherter Energie in verbrauchsstarken Abendstunden',
        'Schwarzstartfähigkeit und Notstromversorgung im Krisenfall',
      ],
      pillar3Title: 'SMART BIDIRECTIONAL EV INTEGRATION',
      pillar3Sub: 'Vehicle-to-Home & Vehicle-to-Grid (V2H/V2G)',
      pillar3Points: [
        'Intelligentes Lade- und Entlademanagement in der Quartiersgarage',
        'Fahrzeuge puffern Solarstrom tagsüber und geben ihn abends zurück',
        'Kostenvorteile für Autobesitzer durch flexible Tarifvergütung',
        'Verfünffachung der verfügbaren Speicherkapazität im Quartier',
      ],
    },
    calculator: {
      tag: 'SIMULATOR & WIRTSCHAFTLICHKEIT',
      title: 'Berechnen Sie das Potenzial Ihres Quartiers',
      desc: 'Interaktiver Autarkie- und Ersparnis-Simulator für Mehrparteienhäuser, Wohnhausanlagen und Siedlungsgemeinschaften.',
      unitsLabel: 'Anzahl Wohneinheiten im Gebäude:',
      pvLabel: 'PV-Leistung auf dem Dach (kWp):',
      storageLabel: 'Kapazität Batteriespeicher (kWh):',
      evLabel: 'E-Fahrzeuge mit V2H/V2G Anbindung:',
      resultSavings: 'Jährliche Stromkosten-Ersparnis',
      resultAutarky: 'Autarkiegrad der Gemeinschaft',
      resultCO2: 'Vermiedene CO₂-Emissionen',
      resultIslandHours: 'Autonomiezeit bei Netzausfall',
      savingsPerYear: '€ pro Jahr für das Quartier',
      annualCO2Avoided: 'Tonnen CO₂ pro Jahr',
      blackoutAutonomy: 'Tage kontinuierliche Notstrom-Autonomie',
      ctaCalculate: 'Detaillierte Machbarkeitsanalyse anfordern',
    },
    benefits: {
      tag: 'MEHRWERT FÜR ALLE',
      title: 'Vorteile für Eigentümer, Bewohner und die Umwelt',
      ownersTitle: 'Für Eigentümer & Verwaltungen',
      ownersPoints: [
        'Signifikante ESG-Wertsteigerung des Immobilienbestands',
        'Langfristige Absicherung gegen volatile Strommarktschwankungen',
        'Rechtssichere, automatisierte Abrechnung via Smart Meter',
        'Attraktivitätssteigerung bei Mieter- und Eigentümerakquise',
      ],
      residentsTitle: 'Für Bewohner & Mieter',
      residentsPoints: [
        'Bis zu 40% geringere Stromkosten durch direkten Nachbarschaftsstrom',
        'Volle Preistransparenz über die Quartiers-App',
        'Garantierte Notstromversorgung bei regionalen Blackouts',
        'Aktiver, greifbarer Beitrag zum Klimaschutz im eigenen Grätzel',
      ],
      gridTitle: 'Für Netz & Umwelt',
      gridPoints: [
        'Entlastung der städtischen Umspannwerke und Transformatoren',
        'Minimaler Übertragungsverlust durch Direktverbrauch vor Ort',
        'Effektive Sektorkopplung von Strom, Wärme und urbaner Mobilität',
        'Blaupause für die urbane Energiewende der Stadt Wien',
      ],
    },
    location: {
      tag: 'DAS PROJEKT IN WIEN',
      title: 'Pionierquartier Hertha-Firnberg-Straße',
      subtitle: 'Wienerbergcity • 1100 Wien',
      p1: 'Die Hertha-Firnberg-Straße im Bereich Wienerbergcity (Wien 10) steht beispielhaft für zukunftsweisenden, urbanen Mehrfamilienhausbau. Die Energiezelle Hertha Firnberg beweist, dass dichte Stadtstrukturen zu hocheffizienten, selbstversorgenden Energie-Ökosystemen werden können.',
      p2: 'Dank modernster Messtechnik und intelligenter Steuerungsalgorithmen teilen sich hunderte Bewohner saubere Sonnenenergie, reduzieren ihre Abhängigkeit von fossilen Brennstoffen und schaffen ein starkes Gefühl nachbarschaftlicher Resilienz.',
      statHomes: '420+',
      statHomesLabel: 'Vernetzte Wohnungen',
      statCapacity: '1.240 kWp',
      statCapacityLabel: 'Installierte PV-Leistung',
      statBattery: '850 kWh',
      statBatteryLabel: 'Stationärer Quartiersspeicher',
    },
    faq: {
      tag: 'WISSENSWERTES & RECHT',
      title: 'Häufig gestellte Fragen',
      items: [
        {
          q: 'Was ist eine Energiezelle bzw. Erneuerbare-Energie-Gemeinschaft (EEG)?',
          a: 'Eine EEG nach österreichischem Erneuerbaren-Ausbau-Gesetz (EAG) ermöglicht es Nachbarn und Liegenschaften, gemeinsam erzeugten Strom (z.B. von Wohnhausdächern) innerhalb des lokalen Netzbereichs direkt untereinander zu teilen und abzurechnen — zu reduzierten Netzentgelten und befreit vom Erneuerbaren-Förderbeitrag.',
        },
        {
          q: 'Welche technischen Voraussetzungen müssen in meiner Wohnung erfüllt sein?',
          a: 'Es wird lediglich ein intelligenter digitaler Stromzähler (Smart Meter mit 15-Minuten-Werteauslesung) der Wiener Netze benötigt. Es sind keine baulichen Eingriffe in der einzelnen Wohnung erforderlich.',
        },
        {
          q: 'Was bedeutet Bidirektionales Laden (V2H / V2G)?',
          a: 'V2H (Vehicle-to-Home) und V2G (Vehicle-to-Grid) bedeuten, dass Elektroautos nicht nur Strom aus dem Netz laden, sondern überschüssigen Batteriestrom bei Bedarf wieder an das Gebäude zurückspeisen können. So wird die Autobatterie zum wertvollen Energiespeicher für den Abend.',
        },
        {
          q: 'Bleibt meine Stromversorgung immer sichergestellt?',
          a: 'Ja, absolut. Sollte der lokale Sonnenstrom oder der Speicher einmal nicht ausreichen, wird die Versorgung nahtlos und unbemerkt über das öffentliche Stromnetz abgesichert. Umgekehrt bietet das System bei einem Ausfall des öffentlichen Netzes einen Inselbetrieb.',
        },
        {
          q: 'Wie funktioniert die Abrechnung der bezogenen Energie?',
          a: 'Die Verrechnung erfolgt vollautomatisch über die viertelstündlichen Daten des Netzbetreibers. Bewohner sehen in der Energie-App genau, wann wie viel Strom vom Dach bezogen wurde und wie viel gespart wurde.',
        },
      ],
    },
    join: {
      tag: 'WERDEN SIE TEIL DER GEMEINSCHAFT',
      title: 'Jetzt für die Energiezelle anmelden',
      desc: 'Ob als Mieter, Wohnungseigentümer oder Hausverwaltung: Machen Sie Ihr Gebäude zukunftssicher und profitieren Sie von sauberer, günstiger Lokalenergie.',
      nameLabel: 'Ihr vollständiger Name',
      emailLabel: 'E-Mail-Adresse',
      roleLabel: 'Ihre Rolle',
      roleResident: 'Mieter / Bewohner',
      roleOwner: 'Wohnungseigentümer (WEG)',
      roleManager: 'Hausverwaltung / Bauträger',
      messageLabel: 'Adresse oder Nachricht (z.B. Stiege, Tür, Fragen)',
      submitButton: 'Voranmeldung absenden',
      successMsg: 'Vielen Dank für Ihr Interesse! Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit allen Details bei Ihnen.',
    },
    footer: {
      desc: 'Generate locally. Close the gap. Scale resilience. Die zukunftsfähige Energiezelle für Wien und darüber hinaus.',
      rights: 'Alle Rechte vorbehalten. Energiegemeinschaft Hertha-Firnberg-Straße.',
    },
  },
  en: {
    nav: {
      system: 'Energy Cell System',
      pillars: 'Technology',
      calculator: 'Resilience Calculator',
      benefits: 'Benefits',
      location: 'Wienerbergcity',
      faq: 'FAQ',
      join: 'Get Involved',
    },
    hero: {
      badge: 'Pioneering Energy Community Hertha-Firnberg-Straße • Vienna',
      h1Line1: 'Generate locally.',
      h1Line2: 'Close the gap.',
      h1Line3: 'Scale resilience.',
      sub: 'We transform residential properties and apartment buildings into interconnected, resilient energy cells. Local generation, high-capacity stationary storage, and smart bidirectional EV integration for maximum energy autonomy.',
      ctaPrimary: 'Explore Energy Cell',
      ctaSecondary: 'Calculate Autarky',
      statSolar: '1,240 kWp',
      statSolarLabel: 'Local Solar Capacity',
      statAutarky: '88%',
      statAutarkyLabel: 'Average Self-Sufficiency',
      statCO2: '495 t',
      statCO2Label: 'CO₂ Reduced / Year',
    },
    system: {
      tag: 'THE SYSTEM OF TOMORROW',
      title: 'The Interconnected Energy Cell System',
      desc: 'Local generation, stationary storage, and flexible utilization — networked in real-time for community resilience.',
      modeTitle: 'Simulate Operating Scenario:',
      modeSunny: 'Sunny Noon (Surplus)',
      modePeak: 'Evening Peak (Battery & V2H)',
      modeIsland: 'Island Mode (Blackout Protection)',
      solarTitle: 'ROOFTOP SOLAR',
      solarDesc: 'Maximized Rooftop Solar: Clean energy harvested directly on apartment roofs where energy is needed most.',
      storageTitle: 'STATIONARY STORAGE',
      storageDesc: 'High-Capacity Stationary Storage: Central district storage buffers generation peaks and powers the community through the night.',
      buildingsTitle: 'BUILDINGS & APARTMENTS',
      buildingsDesc: 'Apartments, heat pumps, and common facilities dynamically draw the lowest-cost local renewable energy.',
      evTitle: 'BIDIRECTIONAL EVS',
      evDesc: 'Smart V2H / V2G Integration: Turning vehicles on four wheels into flexible energy assets supporting homes and the grid.',
      statusLegend: 'Active energy & telemetry pulse in the neighborhood',
    },
    pillars: {
      tag: 'THREE PILLARS OF RESILIENCE',
      title: 'From Buildings to Resilient Energy Cells',
      desc: 'Building a state-of-the-art clean-tech ecosystem empowering citizens to lead the energy transition.',
      pillar1Title: 'MAXIMIZED ROOFTOP SOLAR',
      pillar1Sub: 'Local rooftop generation at scale',
      pillar1Points: [
        'Full utilization of viable roof areas on multi-family buildings',
        'Collective generation plant under Austrian EAG/ElWOG guidelines',
        'Direct peer-to-peer neighborhood consumption without transmission loss',
        'Prioritized supply for heat pumps and building services',
      ],
      pillar2Title: 'HIGH-CAPACITY STATIONARY STORAGE',
      pillar2Sub: 'Community storage & grid balancing',
      pillar2Points: [
        'Central LiFePO4 battery system engineered for high cycle life',
        'Effective peak shaving and stabilization of the local distribution network',
        'Guaranteed power supply during high-demand evening hours',
        'Black-start capability for uninterruptible microgrid operation',
      ],
      pillar3Title: 'SMART BIDIRECTIONAL EV INTEGRATION',
      pillar3Sub: 'Vehicle-to-Home & Vehicle-to-Grid (V2H/V2G)',
      pillar3Points: [
        'Smart charge and discharge algorithms in the community garage',
        'Vehicles absorb midday solar surplus and power homes at dusk',
        'Cost savings for EV owners via dynamic compensation rates',
        'Quintuplying total community energy storage capacity on wheels',
      ],
    },
    calculator: {
      tag: 'SIMULATOR & ECONOMICS',
      title: 'Calculate Your District’s Autarky Potential',
      desc: 'Interactive resilience and financial savings simulator for apartment complexes and residential communities.',
      unitsLabel: 'Number of apartments in complex:',
      pvLabel: 'Rooftop PV capacity (kWp):',
      storageLabel: 'Stationary battery capacity (kWh):',
      evLabel: 'EVs with bidirectional V2H/V2G support:',
      resultSavings: 'Annual Electricity Bill Savings',
      resultAutarky: 'Community Autarky Degree',
      resultCO2: 'Avoided CO₂ Emissions',
      resultIslandHours: 'Island Autonomy Duration',
      savingsPerYear: '€ per year for the community',
      annualCO2Avoided: 'Tons CO₂ avoided per year',
      blackoutAutonomy: 'Days of complete power autonomy',
      ctaCalculate: 'Request Detailed Feasibility Study',
    },
    benefits: {
      tag: 'VALUE FOR EVERYONE',
      title: 'Benefits for Owners, Residents, and the Climate',
      ownersTitle: 'For Property Owners & Managers',
      ownersPoints: [
        'Measurable ESG score enhancement and asset appreciation',
        'Long-term hedge against volatile energy markets',
        'Automated, legally compliant billing via smart meters',
        'High appeal for prospective tenants and buyers',
      ],
      residentsTitle: 'For Residents & Tenants',
      residentsPoints: [
        'Up to 40% lower electricity tariffs through direct neighbor power',
        'Full real-time consumption transparency in the community app',
        'Uninterruptible backup power during regional blackouts',
        'Direct, tangible climate impact right at home',
      ],
      gridTitle: 'For the Grid & Environment',
      gridPoints: [
        'Reduced strain on urban substations and transformers',
        'Minimal transmission loss through hyper-local self-consumption',
        'Sector coupling uniting clean electricity, heating, and EVs',
        'Blueprint for urban resilience across modern metropolises',
      ],
    },
    location: {
      tag: 'THE VIENNA PILOT',
      title: 'Pioneering District Hertha-Firnberg-Straße',
      subtitle: 'Wienerbergcity • 1100 Vienna, Austria',
      p1: 'Hertha-Firnberg-Straße in Vienna’s Wienerbergcity district exemplifies cutting-edge urban multi-family architecture. The Hertha Firnberg Energy Cell demonstrates how dense urban blocks transform into self-balancing, resilient energy hubs.',
      p2: 'Powered by smart meters and predictive dispatch algorithms, hundreds of residents share clean rooftop solar, slash fossil dependence, and establish deep neighborhood resilience.',
      statHomes: '420+',
      statHomesLabel: 'Connected Apartments',
      statCapacity: '1,240 kWp',
      statCapacityLabel: 'Installed Rooftop PV',
      statBattery: '850 kWh',
      statBatteryLabel: 'Stationary Battery System',
    },
    faq: {
      tag: 'LEGAL & TECHNICAL FACTS',
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'What is an Energy Cell or Renewable Energy Community (REC)?',
          a: 'Under Austrian renewable energy legislation (EAG/ElWOG), an REC allows neighbors and buildings to share electricity generated locally (e.g. rooftop solar) at reduced grid tariffs and exempted from renewable surcharges.',
        },
        {
          q: 'What technical equipment is needed in individual apartments?',
          a: 'Only a standard smart meter provided by the local grid operator (Wiener Netze) with 15-minute readings. No construction or rewiring is needed inside individual apartments.',
        },
        {
          q: 'What does bidirectional charging (V2H/V2G) mean?',
          a: 'V2H (Vehicle-to-Home) and V2G (Vehicle-to-Grid) enable electric vehicles to feed electricity back into buildings during evening peaks, turning parked cars into active neighborhood batteries.',
        },
        {
          q: 'Is power supply always guaranteed?',
          a: 'Yes, seamlessly. Whenever local solar or storage is depleted, power is automatically drawn from the regular public grid without any interruption. In case of a blackout, the microgrid switches to island mode.',
        },
        {
          q: 'How is shared energy billed?',
          a: 'Billing is automated via the grid operator’s verified 15-minute smart meter readings. Residents can see real-time generation, consumption, and savings in the app.',
        },
      ],
    },
    join: {
      tag: 'JOIN THE COMMUNITY',
      title: 'Register for the Hertha Firnberg Energy Cell',
      desc: 'Whether you are a tenant, apartment owner, or property manager: future-proof your building and unlock clean, affordable local energy.',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      roleLabel: 'Your Role',
      roleResident: 'Tenant / Resident',
      roleOwner: 'Apartment Owner',
      roleManager: 'Property Manager / Developer',
      messageLabel: 'Address or Message (e.g. Staircase, Door, Questions)',
      submitButton: 'Submit Pre-Registration',
      successMsg: 'Thank you for your interest! We have received your inquiry and will contact you shortly with full documentation.',
    },
    footer: {
      desc: 'Generate locally. Close the gap. Scale resilience. The sustainable energy cell for Vienna and beyond.',
      rights: 'All rights reserved. Energy Community Hertha-Firnberg-Straße.',
    },
  },
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}>({
  lang: 'de',
  setLang: () => {},
  t: translations.de,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('de');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
