-- =========================================================================
-- DOLR SAMANVAY3D 360 DATABASE SCHEMA (SIH26013)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS multi_source_conflicts (
    id SERIAL PRIMARY KEY,
    conflict_id VARCHAR(64) UNIQUE NOT NULL,
    ulpin VARCHAR(64) NOT NULL,
    location VARCHAR(255) NOT NULL,
    conflict_type VARCHAR(128) NOT NULL,
    spatial_shift_m NUMERIC(5, 2) NOT NULL,
    root_cause TEXT NOT NULL,
    ai_resolution_applied TEXT NOT NULL,
    inter_agency_stakeholders VARCHAR(255) NOT NULL,
    status VARCHAR(64) DEFAULT 'AUTO_RESOLVED_SYNCHRONIZED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS geospatial_layers (
    id SERIAL PRIMARY KEY,
    layer_name VARCHAR(128) NOT NULL,
    agency VARCHAR(128) NOT NULL,
    format VARCHAR(64) NOT NULL,
    spatial_accuracy VARCHAR(64) NOT NULL,
    update_frequency VARCHAR(64) NOT NULL
);
