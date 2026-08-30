-- =========================================================================
-- MOES SETUPOLAR 360 DATABASE SCHEMA (SIH26062)
-- Ministry of Earth Sciences (MoES) - NCPOR Goa
-- =========================================================================

CREATE TABLE IF NOT EXISTS polar_logistics_operations (
    id SERIAL PRIMARY KEY,
    operation_id VARCHAR(64) UNIQUE NOT NULL,
    operation_title VARCHAR(255) NOT NULL,
    theatre_location VARCHAR(255) NOT NULL,
    cargo_manifest TEXT NOT NULL,
    total_tonnage_mt NUMERIC(8, 2) NOT NULL,
    transport_mode VARCHAR(128) NOT NULL,
    route_distance_km NUMERIC(6, 1) NOT NULL,
    crevasse_hazard_status TEXT NOT NULL,
    subzero_rfid_tracking TEXT NOT NULL,
    convoy_transit_time_hours NUMERIC(4, 1) NOT NULL,
    delivery_status VARCHAR(64) DEFAULT 'CONVOY_DELIVERED_TO_MAITRI_STATION',
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS polar_subzero_assets (
    id SERIAL PRIMARY KEY,
    asset_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    temp_rating VARCHAR(64) NOT NULL,
    tracking_tech VARCHAR(128) NOT NULL,
    current_status VARCHAR(64) NOT NULL,
    last_ping_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
