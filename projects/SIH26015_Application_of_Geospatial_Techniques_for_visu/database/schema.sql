-- =========================================================================
-- DOLR JALDRISHTI 360 DATABASE SCHEMA (SIH26015)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS watershed_basins (
    id SERIAL PRIMARY KEY,
    watershed_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    basin VARCHAR(255) NOT NULL,
    area_hectares NUMERIC(10, 2) NOT NULL,
    ndvi_gain_pct NUMERIC(5, 2) NOT NULL,
    soil_moisture_pct NUMERIC(5, 2) NOT NULL,
    active_structures_count INTEGER NOT NULL,
    storage_capacity_cum NUMERIC(10, 2) NOT NULL,
    ecological_health_score NUMERIC(5, 2) NOT NULL,
    siltation_level VARCHAR(128) NOT NULL,
    monitoring_status VARCHAR(64) DEFAULT 'POSITIVE_ECOLOGICAL_IMPACT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
