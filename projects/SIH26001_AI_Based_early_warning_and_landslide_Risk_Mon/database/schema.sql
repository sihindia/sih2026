-- Supabase / PostgreSQL Schema for SIH26001 (AI-Based early warning and landslide Risk Monitoring System in NER)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Sensor Telemetry Nodes Table
CREATE TABLE IF NOT EXISTS sih26001_sensors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    station_code VARCHAR(50) UNIQUE NOT NULL,
    location_name TEXT NOT NULL,
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    elevation_m NUMERIC(8, 2),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Environmental Readings
CREATE TABLE IF NOT EXISTS sih26001_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    station_id UUID REFERENCES sih26001_sensors(id) ON DELETE CASCADE,
    rainfall_intensity_mm_hr NUMERIC(6, 2) NOT NULL,
    pore_water_pressure_kpa NUMERIC(6, 2) NOT NULL,
    slope_tilt_deg NUMERIC(5, 2) NOT NULL,
    factor_of_safety NUMERIC(4, 2) NOT NULL,
    risk_level VARCHAR(20) DEFAULT 'NORMAL',
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Incident Alert Broadcasts
CREATE TABLE IF NOT EXISTS sih26001_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reading_id UUID REFERENCES sih26001_readings(id),
    severity VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    dispatched_to VARCHAR(100) DEFAULT 'NDRF & District SDMA',
    acknowledged BOOLEAN DEFAULT FALSE,
    dispatched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE sih26001_sensors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sih26001_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sih26001_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON sih26001_sensors FOR SELECT USING (true);
CREATE POLICY "Public Read Readings" ON sih26001_readings FOR SELECT USING (true);
CREATE POLICY "Public Read Alerts" ON sih26001_alerts FOR SELECT USING (true);
