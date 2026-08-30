-- =========================================================================
-- OIML METROLOGYLAB 360 DATABASE SCHEMA (SIH26035)
-- Ministry of Consumer Affairs - DoCA
-- =========================================================================

CREATE TABLE IF NOT EXISTS nawi_instruments (
    id SERIAL PRIMARY KEY,
    instrument_id VARCHAR(64) UNIQUE NOT NULL,
    instrument_name VARCHAR(255) NOT NULL,
    manufacturer_name VARCHAR(255) NOT NULL,
    accuracy_class VARCHAR(64) NOT NULL,
    max_capacity VARCHAR(64) NOT NULL,
    min_capacity VARCHAR(64) NOT NULL,
    verification_scale_interval_e VARCHAR(32) NOT NULL,
    scale_interval_d VARCHAR(32) NOT NULL,
    number_of_intervals_n VARCHAR(32) NOT NULL,
    testing_laboratory VARCHAR(255) NOT NULL,
    approval_status VARCHAR(64) DEFAULT 'APPROVED_OIML_R76',
    model_approval_certificate VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS oiml_test_observations (
    id SERIAL PRIMARY KEY,
    instrument_id VARCHAR(64) NOT NULL,
    step_number INTEGER NOT NULL,
    applied_load VARCHAR(32) NOT NULL,
    indicated_reading VARCHAR(32) NOT NULL,
    intrinsic_error VARCHAR(32) NOT NULL,
    maximum_permissible_error VARCHAR(32) NOT NULL,
    test_verdict VARCHAR(16) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
