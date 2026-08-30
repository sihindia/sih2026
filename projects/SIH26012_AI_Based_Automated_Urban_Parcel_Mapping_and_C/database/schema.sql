-- =========================================================================
-- DOLR NAKSHADRONE 360 DATABASE SCHEMA (SIH26012)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS drone_survey_zones (
    id SERIAL PRIMARY KEY,
    zone_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(128) NOT NULL,
    state VARCHAR(64) NOT NULL,
    gsd_cm_px NUMERIC(4, 2) NOT NULL,
    flight_altitude_m INTEGER NOT NULL,
    surveyed_area_sqm NUMERIC(10, 2) NOT NULL,
    total_parcels_extracted INTEGER NOT NULL,
    building_footprints_delineated INTEGER NOT NULL,
    geoai_confidence_pct NUMERIC(5, 2) NOT NULL,
    drone_sensor VARCHAR(128) NOT NULL,
    survey_status VARCHAR(64) DEFAULT 'CADASTRAL_FINALIZED_ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS extracted_cadastral_parcels (
    id SERIAL PRIMARY KEY,
    parcel_id VARCHAR(64) UNIQUE NOT NULL,
    ulpin VARCHAR(64) UNIQUE NOT NULL,
    land_use VARCHAR(128) NOT NULL,
    parcel_area_sqm NUMERIC(8, 2) NOT NULL,
    building_footprint_sqm NUMERIC(8, 2) NOT NULL,
    road_access_width_m VARCHAR(128) NOT NULL,
    extraction_confidence_pct NUMERIC(5, 2) NOT NULL,
    boundary_type VARCHAR(128) NOT NULL,
    topology_status VARCHAR(64) DEFAULT 'SLIVER_FREE_CLEAN'
);
