-- =========================================================================
-- RAILETA DYNAMIC 360 DATABASE SCHEMA (SIH26028)
-- Ministry of Railways - CRIS / RTIS Architecture
-- =========================================================================

CREATE TABLE IF NOT EXISTS coaching_trains (
    id SERIAL PRIMARY KEY,
    train_number VARCHAR(16) UNIQUE NOT NULL,
    train_name VARCHAR(255) NOT NULL,
    locomotive_type VARCHAR(128) NOT NULL,
    current_speed_kmh NUMERIC(5, 2) NOT NULL,
    max_permissible_speed_kmh NUMERIC(5, 2) NOT NULL,
    current_block_section VARCHAR(255) NOT NULL,
    forward_headway_km NUMERIC(5, 2) NOT NULL,
    ntes_static_delay VARCHAR(64) NOT NULL,
    dynamic_ai_eta VARCHAR(64) NOT NULL,
    prediction_confidence_pct NUMERIC(5, 2) NOT NULL,
    status VARCHAR(64) DEFAULT 'RUNNING_ON_TIME_PREDICTED',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS platform_occupancy (
    id SERIAL PRIMARY KEY,
    junction_name VARCHAR(128) NOT NULL,
    platform_number VARCHAR(64) NOT NULL,
    assigned_train VARCHAR(128) NOT NULL,
    status VARCHAR(64) NOT NULL,
    estimated_arrival_in VARCHAR(64) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
