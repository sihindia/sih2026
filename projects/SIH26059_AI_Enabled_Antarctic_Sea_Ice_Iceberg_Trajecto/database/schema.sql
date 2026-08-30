-- =========================================================================
-- MOES HIMNAV 360 DATABASE SCHEMA (SIH26059)
-- Ministry of Earth Sciences (MoES) - NCPOR Goa
-- =========================================================================

CREATE TABLE IF NOT EXISTS antarctic_navigation_voyages (
    id SERIAL PRIMARY KEY,
    voyage_id VARCHAR(64) UNIQUE NOT NULL,
    expedition_name VARCHAR(255) NOT NULL,
    vessel_name VARCHAR(255) NOT NULL,
    transit_corridor TEXT NOT NULL,
    current_sea_ice_concentration_pct NUMERIC(4, 1) NOT NULL,
    prevailing_ice_thickness_m NUMERIC(4, 2) NOT NULL,
    tracked_iceberg TEXT NOT NULL,
    ai_recommended_waypoint_path TEXT NOT NULL,
    route_divergence_nm NUMERIC(6, 1) NOT NULL,
    transit_time_saved_hours NUMERIC(5, 1) NOT NULL,
    fuel_saved_metric_tons NUMERIC(6, 1) NOT NULL,
    besetment_risk_index VARCHAR(64) DEFAULT 'ZERO_BESETMENT_RISK',
    navigation_verdict VARCHAR(64) DEFAULT 'OPTIMAL_POLAR_ROUTE_RECOMMENDED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS iceberg_drift_trajectories (
    id SERIAL PRIMARY KEY,
    iceberg_id VARCHAR(64) UNIQUE NOT NULL,
    dimensions VARCHAR(128) NOT NULL,
    drift_speed_knots NUMERIC(4, 2) NOT NULL,
    drift_direction VARCHAR(64) NOT NULL,
    collision_hazard TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
