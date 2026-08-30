-- =========================================================================
-- NCMRWF REGIMECORRECT 360 DATABASE SCHEMA (SIH26080)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS district_rainfall_calibrations (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    district_location VARCHAR(255) NOT NULL,
    classified_regime VARCHAR(128) NOT NULL,
    raw_nwp_rainfall_mm NUMERIC(6, 2) NOT NULL,
    ai_corrected_rainfall_mm NUMERIC(6, 2) NOT NULL,
    ground_truth_obs_mm NUMERIC(6, 2) NOT NULL,
    heavy_rain_prob_pct NUMERIC(5, 2) NOT NULL,
    extreme_threshold_tag VARCHAR(128) NOT NULL,
    verification_improvement TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'REGIME_CALIBRATED',
    calibrated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS synoptic_weather_regimes (
    id SERIAL PRIMARY KEY,
    regime_name VARCHAR(128) UNIQUE NOT NULL,
    features TEXT NOT NULL,
    correction_strategy TEXT NOT NULL,
    active_season VARCHAR(64) DEFAULT 'Southwest Monsoon'
);

CREATE TABLE IF NOT EXISTS verification_skill_scores (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(128) NOT NULL,
    raw_score VARCHAR(64) NOT NULL,
    ai_corrected_score VARCHAR(64) NOT NULL,
    improvement_pct VARCHAR(64) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
