-- =========================================================================
-- MOIL BHUDHATRI 360 DATABASE SCHEMA (SIH26009)
-- Ministry of Steel - MOIL Limited
-- =========================================================================

CREATE TABLE IF NOT EXISTS manganese_mines (
    id SERIAL PRIMARY KEY,
    mine_id VARCHAR(64) UNIQUE NOT NULL,
    mine_name VARCHAR(255) NOT NULL,
    state VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL,
    mine_type VARCHAR(128) NOT NULL,
    ore_grade_mn_pct NUMERIC(4, 2) NOT NULL,
    weekly_target_mt NUMERIC(10, 2) NOT NULL,
    satellite_spectral_anomaly TEXT NOT NULL,
    active_bottleneck TEXT NOT NULL,
    ai_corrective_action TEXT NOT NULL,
    recovered_production_mt NUMERIC(10, 2) NOT NULL,
    target_recovery_pct NUMERIC(5, 2) NOT NULL,
    shortfall_status VARCHAR(64) DEFAULT 'PRODUCTION_RECOVERED_TARGET_MET',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS satellite_spectral_indices (
    id SERIAL PRIMARY KEY,
    sensor VARCHAR(128) NOT NULL,
    bands_used VARCHAR(128) NOT NULL,
    index_name VARCHAR(128) NOT NULL,
    spectral_response TEXT NOT NULL,
    spatial_resolution VARCHAR(64) NOT NULL
);
