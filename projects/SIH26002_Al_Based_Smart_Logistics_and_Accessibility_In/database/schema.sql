-- =========================================================================
-- MDONER GATINER 360 DATABASE SCHEMA (SIH26002)
-- Ministry of Development of North Eastern Region (MDoNER)
-- =========================================================================

CREATE TABLE IF NOT EXISTS ner_logistics_corridors (
    id SERIAL PRIMARY KEY,
    corridor_id VARCHAR(64) UNIQUE NOT NULL,
    corridor_name VARCHAR(255) NOT NULL,
    states_spanned VARCHAR(255) NOT NULL,
    primary_highway VARCHAR(128) NOT NULL,
    distance_km NUMERIC(6, 1) NOT NULL,
    current_disruption TEXT NOT NULL,
    disruption_severity VARCHAR(64) NOT NULL,
    ai_recommended_detour TEXT NOT NULL,
    detour_bridge_capacity VARCHAR(128) NOT NULL,
    estimated_delay_hours NUMERIC(4, 1) NOT NULL,
    essential_cargo_priority TEXT NOT NULL,
    logistics_status VARCHAR(64) DEFAULT 'ESSENTIAL_SUPPLY_DELIVERED_VIA_DETOUR',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS essential_cargo_shipments (
    id SERIAL PRIMARY KEY,
    shipment_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    temp_monitored VARCHAR(128) NOT NULL,
    status VARCHAR(64) NOT NULL,
    last_gps_ping TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
