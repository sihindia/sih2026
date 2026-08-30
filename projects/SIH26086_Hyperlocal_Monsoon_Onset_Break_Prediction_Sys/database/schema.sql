-- =========================================================================
-- NCMRWF KRISHIMONSOON 360 DATABASE SCHEMA (SIH26086)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS block_monsoon_predictions (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    target_block VARCHAR(255) NOT NULL,
    primary_crop VARCHAR(128) NOT NULL,
    forecast_horizon_days INTEGER NOT NULL,
    lead_time_weeks VARCHAR(64) NOT NULL,
    teleconnection_signals TEXT NOT NULL,
    macro_imd_forecast TEXT NOT NULL,
    hyperlocal_ai_prediction TEXT NOT NULL,
    break_duration_days INTEGER NOT NULL,
    financial_risk_without_ai TEXT NOT NULL,
    crop_agronomic_advisory TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'ADVISORY_DISPATCHED',
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teleconnection_indices_log (
    id SERIAL PRIMARY KEY,
    signal_name VARCHAR(128) NOT NULL,
    observed_value VARCHAR(64) NOT NULL,
    phase_state VARCHAR(128) NOT NULL,
    downscaling_impact TEXT NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farmer_broadcast_logs (
    id SERIAL PRIMARY KEY,
    block_name VARCHAR(128) NOT NULL,
    language_code VARCHAR(16) NOT NULL, -- mr, hi, te, ta, bn, en
    farmers_messaged INTEGER NOT NULL,
    advisory_summary TEXT NOT NULL,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
