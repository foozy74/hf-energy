# Energiezelle Hertha-Firnberg-Straße (1100 Wien)

Moderne Next.js Webanwendung für das Pionierquartier Hertha-Firnberg-Straße mit Live-Telemetrieanbindung für die **Anker SOLIX Solarbank 4 E5000 Pro**.

## Features

- **Responsive & Mobile-First:** Vollständig für Smartphones, Tablets und Desktops optimiert.
- **Live-Telemetrie:** Integrierte API-Route (`/api/energy`) für Live-Messwerte (Erzeugung, Speicher, Verbrauch, Netzeinspeisung).
- **Interaktiver Ersparnis-Rechner:** Dynamische Berechnung für Wohnanlagen (EAG & § 16a ElWOG konform).
- **Zweisprachig:** Deutsch & Englisch (DE/EN).
- **Coolify / Docker-Ready:** Multi-Stage Dockerfile mit Next.js Standalone-Output für minimalen Ressourcenverbrauch.

---

## Live-Telemetrie Anbindung (Anker SOLIX E5000 Pro)

Die Website empfängt Messwerte über den HTTP-Endpunkt:
`POST /api/energy`

### 1. Über Home Assistant (ha-anker-solix-official)

In Home Assistant `automations.yaml` einfügen (sendet alle 30 Sekunden):

```yaml
alias: "Anker Solix: Telemetrie an Website senden"
trigger:
  - platform: time_pattern
    seconds: "/30"
action:
  - service: rest_command.send_energy_telemetry
    data:
      solarPowerW: "{{ states('sensor.anker_solix_pv_power') | float(0) }}"
      batterySoc: "{{ states('sensor.anker_solix_battery_soc') | int(0) }}"
      batteryPowerW: "{{ states('sensor.anker_solix_battery_power') | float(0) }}"
      homeConsumptionW: "{{ states('sensor.anker_solix_home_load') | float(0) }}"
      gridPowerW: "{{ states('sensor.anker_solix_grid_power') | float(0) }}"
```

In `configuration.yaml`:

```yaml
rest_command:
  send_energy_telemetry:
    url: "https://<ihre-coolify-domain>/api/energy"
    method: POST
    headers:
      content-type: "application/json"
      x-api-key: !secret energy_api_key # Optional
    payload: >-
      {
        "solarPowerW": {{ solarPowerW }},
        "batterySoc": {{ batterySoc }},
        "batteryPowerW": {{ batteryPowerW }},
        "homeConsumptionW": {{ homeConsumptionW }},
        "gridPowerW": {{ gridPowerW }}
      }
```

### 2. Schneller Test via Terminal / cURL

```bash
curl -X POST https://<ihre-coolify-domain>/api/energy \
  -H "Content-Type: application/json" \
  -d '{
    "solarPowerW": 3420,
    "batterySoc": 88,
    "batteryPowerW": 1100,
    "homeConsumptionW": 540,
    "gridPowerW": 1780
  }'
```

Sobald ein Request eingeht, schaltet die Website automatisch in den Live-Modus und zeigt die aktuellen Werte der Anker Solarbank 4 in Echtzeit an.

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Lokale Vorschau: [http://localhost:3000](http://localhost:3000)
API-Test: [http://localhost:3000/api/energy](http://localhost:3000/api/energy)
