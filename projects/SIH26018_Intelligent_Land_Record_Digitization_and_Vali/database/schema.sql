-- =========================================================================
-- DOLR ABHILEKHAI 360 DATABASE SCHEMA (SIH26018)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS digitized_land_records (
    id SERIAL PRIMARY KEY,
    record_id VARCHAR(64) UNIQUE NOT NULL,
    khasra VARCHAR(64) NOT NULL,
    khata VARCHAR(64) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    local_area VARCHAR(128) NOT NULL,
    metric_area_ha NUMERIC(8, 3) NOT NULL,
    land_type VARCHAR(128) NOT NULL,
    ocr_conf VARCHAR(32) NOT NULL,
    ulpin VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
