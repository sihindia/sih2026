-- =========================================================================
-- DRDO ASTRASCAN 360 DATABASE SCHEMA (SIH26055)
-- DRDO - Department of Defence Production / iDEX
-- =========================================================================

CREATE TABLE IF NOT EXISTS ew_tactical_environments (
    id SERIAL PRIMARY KEY,
    environment_id VARCHAR(64) UNIQUE NOT NULL,
    theatre_name VARCHAR(255) NOT NULL,
    rf_spectrum_span VARCHAR(128) NOT NULL,
    hostile_emitters TEXT NOT NULL,
    receiver_architecture TEXT NOT NULL,
    scan_strategy VARCHAR(128) NOT NULL,
    open_loop_intercept_sec NUMERIC(5, 2) NOT NULL,
    smart_scan_intercept_sec NUMERIC(5, 2) NOT NULL,
    time_reduction_pct NUMERIC(4, 1) NOT NULL,
    probability_of_intercept_pct NUMERIC(4, 1) NOT NULL,
    false_alarm_rate_pct NUMERIC(4, 2) NOT NULL,
    reward_cost_ratio NUMERIC(5, 2) NOT NULL,
    intercept_verdict VARCHAR(64) DEFAULT 'HOSTILE_EMITTER_LOCKED_SUB_2S',
    simulated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS esm_receiver_time_frequency_dwells (
    id SERIAL PRIMARY KEY,
    environment_id VARCHAR(64) REFERENCES ew_tactical_environments(environment_id),
    frequency_band_ghz NUMERIC(6, 3) NOT NULL,
    dwell_duration_microseconds INTEGER NOT NULL,
    hit_or_miss BOOLEAN NOT NULL,
    reward_score NUMERIC(5, 2) NOT NULL,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
