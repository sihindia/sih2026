-- =========================================================================
-- NCMRWF MESONOWCAST 360 DATABASE SCHEMA (SIH26084)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS convective_nowcast_events (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    target_corridor VARCHAR(255) NOT NULL,
    hazard_phenomena VARCHAR(255) NOT NULL,
    lead_time_hours VARCHAR(32) NOT NULL,
    countdown_minutes INTEGER NOT NULL,
    dwr_reflectivity_dbz NUMERIC(4, 1) NOT NULL,
    satellite_ctt_drop VARCHAR(128) NOT NULL,
    lightning_jump_rate VARCHAR(128) NOT NULL,
    hail_probability_pct NUMERIC(4, 1) NOT NULL,
    hail_size_cm VARCHAR(64) NOT NULL,
    downburst_wind_kmh NUMERIC(5, 1) NOT NULL,
    cloudburst_risk VARCHAR(128) NOT NULL,
    sector_impact_action TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'NOWCAST_ACTIVE',
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS multi_sensor_radar_satellite_logs (
    id SERIAL PRIMARY KEY,
    stream_name VARCHAR(128) NOT NULL,
    refresh_rate VARCHAR(64) NOT NULL,
    parameters TEXT NOT NULL,
    ingested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS aviation_taf_windshear_alerts (
    id SERIAL PRIMARY KEY,
    airport_code VARCHAR(16) NOT NULL,
    hazard_type VARCHAR(64) NOT NULL,
    microburst_velocity_kmh NUMERIC(5, 1) NOT NULL,
    flights_diverted INTEGER DEFAULT 0,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
