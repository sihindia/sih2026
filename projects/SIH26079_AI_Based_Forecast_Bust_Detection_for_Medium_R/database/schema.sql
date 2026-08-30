-- =========================================================================
-- NCMRWF BUSTGUARD 360 DATABASE SCHEMA (SIH26079)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS forecast_bust_cases (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    synoptic_system VARCHAR(255) NOT NULL,
    forecast_lead_day INTEGER NOT NULL,
    lead_time_hours INTEGER NOT NULL,
    nwp_model VARCHAR(128) NOT NULL,
    predicted_scenario TEXT NOT NULL,
    bust_probability_pct NUMERIC(5, 2) NOT NULL,
    confidence_score_pct NUMERIC(5, 2) NOT NULL,
    historical_analog_match VARCHAR(255) NOT NULL,
    xai_root_cause TEXT NOT NULL,
    forecaster_guidance TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'BUST_WARNING_ISSUED',
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medium_range_confidence_indices (
    id SERIAL PRIMARY KEY,
    day_range VARCHAR(64) NOT NULL,
    average_confidence VARCHAR(32) NOT NULL,
    bust_frequency VARCHAR(32) NOT NULL,
    reliability_tier VARCHAR(64) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS operational_model_modifications (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) REFERENCES forecast_bust_cases(case_id),
    recommended_shift TEXT NOT NULL,
    meteorologist_approved BOOLEAN DEFAULT TRUE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
