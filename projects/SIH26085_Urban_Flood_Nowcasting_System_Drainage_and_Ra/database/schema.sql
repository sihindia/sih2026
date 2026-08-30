-- =========================================================================
-- NCMRWF URBANHYDRO 360 DATABASE SCHEMA (SIH26085)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS street_flood_nowcast_episodes (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    metro_city VARCHAR(255) NOT NULL,
    drainage_basin VARCHAR(255) NOT NULL,
    lead_time_hours VARCHAR(64) NOT NULL,
    rainfall_rate_mmh NUMERIC(5, 1) NOT NULL,
    drainage_node_status TEXT NOT NULL,
    hydraulic_surcharge TEXT NOT NULL,
    projected_water_depth_cm NUMERIC(5, 1) NOT NULL,
    flood_severity VARCHAR(64) NOT NULL,
    navigation_reroute TEXT NOT NULL,
    pumping_action TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'INUNDATION_ALERT_ACTIVE',
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drainage_network_topology (
    id SERIAL PRIMARY KEY,
    element_type VARCHAR(64) NOT NULL,
    count_mapped VARCHAR(64) NOT NULL,
    hydraulic_function TEXT NOT NULL,
    failure_mode TEXT NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flood_safe_routing_dispatches (
    id SERIAL PRIMARY KEY,
    vehicle_type VARCHAR(64) NOT NULL,
    depth_threshold_cm INTEGER NOT NULL,
    alternative_route_dispatched TEXT NOT NULL,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
