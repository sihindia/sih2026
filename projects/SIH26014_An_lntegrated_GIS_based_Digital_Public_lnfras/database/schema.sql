-- =========================================================================
-- DOLR LANDSTACK 360 DATABASE SCHEMA (SIH26014)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS land_stack_parcels (
    id SERIAL PRIMARY KEY,
    ulpin VARCHAR(64) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    parcel_area_sqm NUMERIC(10, 2) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    state_ut VARCHAR(128) NOT NULL,
    base_layer_cadastre TEXT NOT NULL,
    essential_layer_rights TEXT NOT NULL,
    usecase_layer_services TEXT NOT NULL,
    citizen_service_status TEXT NOT NULL,
    stack_status VARCHAR(64) DEFAULT 'DPI_STACK_LIVE_ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
