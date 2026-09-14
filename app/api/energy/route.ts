import { NextRequest, NextResponse } from 'next/server';

export interface EnergyTelemetry {
  isLive: boolean;
  updatedAt: string;
  source: 'anker_solix_e5000' | 'simulated';
  system: {
    model: string;
    peakSolarW: number;
    nominalCapacityKwh: number;
  };
  solarPowerW: number;
  batterySoc: number;
  batteryPowerW: number; // positive: charging, negative: discharging
  homeConsumptionW: number;
  gridPowerW: number; // positive: feed-in, negative: grid import
}

// In-memory cache for live telemetry
let latestTelemetry: EnergyTelemetry | null = null;
let lastTelemetryTimestamp = 0;

// Expiration time for "live" state: 5 minutes (300,000 ms)
const LIVE_EXPIRATION_MS = 5 * 60 * 1000;

function getFallbackData(): EnergyTelemetry {
  const now = new Date();
  const hour = now.getHours();
  // Simulated solar profile during daytime (peak around 13:00)
  let simSolar = 0;
  if (hour >= 6 && hour <= 20) {
    const sunFactor = Math.sin(((hour - 6) / 14) * Math.PI);
    simSolar = Math.round(Math.max(0, sunFactor * 4200));
  }

  const simHome = 450 + Math.round(Math.random() * 200);
  const diff = simSolar - simHome;
  const simBatteryPower = diff > 0 ? Math.min(2500, diff) : Math.max(-2500, diff);
  const simGrid = diff - simBatteryPower;

  return {
    isLive: false,
    updatedAt: now.toISOString(),
    source: 'simulated',
    system: {
      model: 'Anker SOLIX Solarbank 4 E5000 Pro',
      peakSolarW: 5000,
      nominalCapacityKwh: 5.0,
    },
    solarPowerW: simSolar,
    batterySoc: 78,
    batteryPowerW: simBatteryPower,
    homeConsumptionW: simHome,
    gridPowerW: simGrid,
  };
}

/**
 * GET /api/energy
 * Returns current telemetry data for the website
 */
export async function GET() {
  const now = Date.now();

  // If we have live data received within the last 5 minutes, serve it
  if (latestTelemetry && now - lastTelemetryTimestamp < LIVE_EXPIRATION_MS) {
    return NextResponse.json({
      ...latestTelemetry,
      isLive: true,
    });
  }

  // If HOME_ASSISTANT_URL & HOME_ASSISTANT_TOKEN are configured, try fetching directly
  const haUrl = process.env.HOME_ASSISTANT_URL;
  const haToken = process.env.HOME_ASSISTANT_TOKEN;

  if (haUrl && haToken) {
    try {
      const headers = {
        Authorization: `Bearer ${haToken}`,
        'Content-Type': 'application/json',
      };

      // Query Home Assistant states
      // Customize sensor names as configured in HA (e.g. sensor.solarbank_pv_power)
      const pvSensor = process.env.HA_SENSOR_PV || 'sensor.anker_solix_pv_power';
      const socSensor = process.env.HA_SENSOR_SOC || 'sensor.anker_solix_battery_soc';
      const battPowerSensor = process.env.HA_SENSOR_BATTERY_POWER || 'sensor.anker_solix_battery_power';
      const loadSensor = process.env.HA_SENSOR_LOAD || 'sensor.anker_solix_home_load';

      const [resPv, resSoc] = await Promise.all([
        fetch(`${haUrl}/api/states/${pvSensor}`, { headers, next: { revalidate: 15 } }),
        fetch(`${haUrl}/api/states/${socSensor}`, { headers, next: { revalidate: 15 } }),
      ]);

      if (resPv.ok && resSoc.ok) {
        const dataPv = await resPv.json();
        const dataSoc = await resSoc.json();

        const solarW = parseFloat(dataPv.state) || 0;
        const soc = parseFloat(dataSoc.state) || 0;

        let batteryW = 0;
        let homeW = 350;

        try {
          const resBatt = await fetch(`${haUrl}/api/states/${battPowerSensor}`, { headers });
          if (resBatt.ok) {
            const dataBatt = await resBatt.json();
            batteryW = parseFloat(dataBatt.state) || 0;
          }
        } catch {
          // ignore optional sensor fetch error
        }

        try {
          const resLoad = await fetch(`${haUrl}/api/states/${loadSensor}`, { headers });
          if (resLoad.ok) {
            const dataLoad = await resLoad.json();
            homeW = parseFloat(dataLoad.state) || 350;
          }
        } catch {
          // ignore optional sensor fetch error
        }

        const telemetry: EnergyTelemetry = {
          isLive: true,
          updatedAt: new Date().toISOString(),
          source: 'anker_solix_e5000',
          system: {
            model: 'Anker SOLIX Solarbank 4 E5000 Pro',
            peakSolarW: 5000,
            nominalCapacityKwh: 5.0,
          },
          solarPowerW: solarW,
          batterySoc: Math.round(soc),
          batteryPowerW: batteryW,
          homeConsumptionW: homeW,
          gridPowerW: solarW - batteryW - homeW,
        };

        latestTelemetry = telemetry;
        lastTelemetryTimestamp = Date.now();
        return NextResponse.json(telemetry);
      }
    } catch (err) {
      console.error('Failed to pull from Home Assistant:', err);
    }
  }

  // Otherwise return standard fallback data
  return NextResponse.json(getFallbackData());
}

/**
 * POST /api/energy
 * Webhook endpoint for Home Assistant or IoT bridge pushing live values
 * Protected by ENERGY_API_KEY (optional bearer or x-api-key)
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || '';
  const apiKeyHeader = req.headers.get('x-api-key') || '';
  const configuredKey = process.env.ENERGY_API_KEY;

  // Verify API Key if one is configured
  if (configuredKey) {
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';
    if (bearer !== configuredKey && apiKeyHeader !== configuredKey) {
      return NextResponse.json({ error: 'Unauthorized: Invalid API key' }, { status: 401 });
    }
  }

  try {
    const body = await req.json();

    // Parse incoming values (support Watts or kW)
    const solarPowerW = typeof body.solarPowerW === 'number' 
      ? body.solarPowerW 
      : (typeof body.solarPowerKw === 'number' ? body.solarPowerKw * 1000 : 0);

    const batterySoc = typeof body.batterySoc === 'number' ? body.batterySoc : 0;
    const batteryPowerW = typeof body.batteryPowerW === 'number' ? body.batteryPowerW : 0;
    const homeConsumptionW = typeof body.homeConsumptionW === 'number' ? body.homeConsumptionW : 0;
    const gridPowerW = typeof body.gridPowerW === 'number' ? body.gridPowerW : 0;

    latestTelemetry = {
      isLive: true,
      updatedAt: new Date().toISOString(),
      source: 'anker_solix_e5000',
      system: {
        model: body.model || 'Anker SOLIX Solarbank 4 E5000 Pro',
        peakSolarW: body.peakSolarW || 5000,
        nominalCapacityKwh: body.nominalCapacityKwh || 5.0,
      },
      solarPowerW,
      batterySoc: Math.min(100, Math.max(0, Math.round(batterySoc))),
      batteryPowerW,
      homeConsumptionW,
      gridPowerW,
    };

    lastTelemetryTimestamp = Date.now();

    return NextResponse.json({
      success: true,
      message: 'Telemetry updated successfully',
      data: latestTelemetry,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Bad Request', details: err?.message || 'Invalid JSON' },
      { status: 400 }
    );
  }
}
