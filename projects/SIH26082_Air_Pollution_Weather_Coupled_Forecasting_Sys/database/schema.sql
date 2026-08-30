-- =========================================================================
-- NCMRWF AEROCOUPLED 360 DATABASE SCHEMA (SIH26082)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS delhi_coupled_aqi_episodes (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    delhi_hotspot VARCHAR(255) NOT NULL,
    episode_type VARCHAR(255) NOT NULL,
    forecast_horizon_hours INTEGER NOT NULL,
    pbl_height_m INTEGER NOT NULL,
    inversion_strength VARCHAR(128) NOT NULL,
    uncoupled_model_pm25 NUMERIC(6, 2) NOT NULL,
    coupled_aero_pm25 NUMERIC(6, 2) NOT NULL,
    air_quality_index INTEGER NOT NULL,
    aqi_category VARCHAR(64) NOT NULL,
    stubble_smoke_share_pct NUMERIC(5, 2) NOT NULL,
    two_way_feedback TEXT NOT NULL,
    grap_action TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'COUPLED_SIMULATION_ACTIVE',
    simulated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inversion_pbl_feedbacks (
    id SERIAL PRIMARY KEY,
    parameter_name VARCHAR(128) UNIQUE NOT NULL,
    typical_summer VARCHAR(64) NOT NULL,
    winter_inversion VARCHAR(64) NOT NULL,
    feedback_mechanism TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stubble_fire_trajectories (
    id SERIAL PRIMARY KEY,
    region VARCHAR(128) NOT NULL,
    active_fire_count VARCHAR(64) NOT NULL,
    wind_corridor VARCHAR(64) NOT NULL,
    delhi_impact TEXT NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
