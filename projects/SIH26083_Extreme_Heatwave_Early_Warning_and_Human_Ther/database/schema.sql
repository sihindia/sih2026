-- =========================================================================
-- NCMRWF THERMALSHIELD 360 DATABASE SCHEMA (SIH26083)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS thermal_stress_episodes (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    city_zone VARCHAR(255) NOT NULL,
    hazard_type VARCHAR(255) NOT NULL,
    forecast_lead_day INTEGER NOT NULL,
    lead_time_hours INTEGER NOT NULL,
    dry_bulb_temp_c NUMERIC(4, 1) NOT NULL,
    relative_humidity_pct NUMERIC(4, 1) NOT NULL,
    heat_index_c NUMERIC(4, 1) NOT NULL,
    wbgt_index_c NUMERIC(4, 1) NOT NULL,
    utci_stress_c NUMERIC(4, 1) NOT NULL,
    stress_category VARCHAR(128) NOT NULL,
    vulnerable_demographics TEXT NOT NULL,
    projected_hospital_spike TEXT NOT NULL,
    municipal_hap_action TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'RED_HEAT_EMERGENCY',
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ward_heat_action_triggers (
    id SERIAL PRIMARY KEY,
    alert_tier VARCHAR(64) NOT NULL,
    trigger_threshold VARCHAR(128) NOT NULL,
    statutory_actions TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hospital_heatstroke_reserves (
    id SERIAL PRIMARY KEY,
    city_zone VARCHAR(255) NOT NULL,
    cooling_centres_active INTEGER NOT NULL,
    ors_kiosks_deployed INTEGER NOT NULL,
    hospital_ice_beds_reserved INTEGER NOT NULL,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
