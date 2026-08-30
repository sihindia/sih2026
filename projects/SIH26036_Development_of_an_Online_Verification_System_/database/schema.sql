-- =========================================================================
-- DOCA E-MAAPTOL 360 DATABASE SCHEMA (SIH26036)
-- Ministry of Consumer Affairs, Food & Public Distribution (DoCA)
-- =========================================================================

CREATE TABLE IF NOT EXISTS instrument_verification_applications (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(64) UNIQUE NOT NULL,
    trader_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    instrument_type VARCHAR(128) NOT NULL,
    make_and_model VARCHAR(128) NOT NULL,
    inspecting_officer VARCHAR(128) NOT NULL,
    calibration_test TEXT NOT NULL,
    max_permissible_error VARCHAR(64) NOT NULL,
    observed_error VARCHAR(64) NOT NULL,
    security_seal_die VARCHAR(128) NOT NULL,
    certificate_number VARCHAR(128) UNIQUE NOT NULL,
    valid_till VARCHAR(64) NOT NULL,
    qr_hash TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'VERIFIED_AND_STAMPED',
    inspected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS legal_metrology_officers (
    id SERIAL PRIMARY KEY,
    officer_name VARCHAR(128) NOT NULL,
    circle_jurisdiction VARCHAR(128) NOT NULL,
    stamp_die_id VARCHAR(64) UNIQUE NOT NULL,
    authorized_classes TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);
