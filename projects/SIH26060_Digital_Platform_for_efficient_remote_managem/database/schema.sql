-- =========================================================================
-- MOES MAITRIBHARATI 360 DATABASE SCHEMA (SIH26060)
-- Ministry of Earth Sciences (MoES) - NCPOR Goa
-- =========================================================================

CREATE TABLE IF NOT EXISTS antarctic_station_twins (
    id SERIAL PRIMARY KEY,
    station_id VARCHAR(64) UNIQUE NOT NULL,
    station_name VARCHAR(255) NOT NULL,
    geographic_location VARCHAR(255) NOT NULL,
    wintering_crew_size INTEGER NOT NULL,
    ambient_temperature_c NUMERIC(5, 2) NOT NULL,
    katabatic_wind_speed_kmh NUMERIC(5, 1) NOT NULL,
    indoor_habitat_temp_c NUMERIC(4, 1) NOT NULL,
    chp_microgrid_status TEXT NOT NULL,
    thermal_heat_recovery_kw NUMERIC(6, 1) NOT NULL,
    freshwater_source TEXT NOT NULL,
    fuel_reserve_litres NUMERIC(10, 2) NOT NULL,
    wintering_autonomy_days INTEGER NOT NULL,
    overall_life_support_status VARCHAR(64) DEFAULT 'ALL_SYSTEMS_NOMINAL_SUBZERO_READY',
    last_satellite_sync TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS polar_subsystem_telemetry_logs (
    id SERIAL PRIMARY KEY,
    station_id VARCHAR(64) REFERENCES antarctic_station_twins(station_id),
    subsystem_type VARCHAR(64) NOT NULL,
    active_power_kw NUMERIC(6, 2) NOT NULL,
    fuel_flow_lph NUMERIC(5, 2) NOT NULL,
    water_flow_lpm NUMERIC(5, 2) NOT NULL,
    trace_heating_active BOOLEAN DEFAULT TRUE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
