-- =========================================================================
-- NCMRWF ANOMALYTRACKER 360 DATABASE SCHEMA (SIH26078)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS medium_range_anomalies (
    id SERIAL PRIMARY KEY,
    anomaly_id VARCHAR(64) UNIQUE NOT NULL,
    hazard_name VARCHAR(255) NOT NULL,
    forecast_horizon_days INTEGER NOT NULL,
    lead_time_hours INTEGER NOT NULL,
    coarse_12km_input TEXT NOT NULL,
    stage1_gnn_mesh TEXT NOT NULL,
    stage2_diffusion_5km TEXT NOT NULL,
    pinpoint_5km_centroid TEXT NOT NULL,
    ndrf_targeted_alert TEXT NOT NULL,
    status VARCHAR(64) DEFAULT '4D_ANOMALY_TRACKED',
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS icosahedral_mesh_bounding_boxes (
    id SERIAL PRIMARY KEY,
    anomaly_id VARCHAR(64) REFERENCES medium_range_anomalies(anomaly_id),
    min_lat NUMERIC(6, 3) NOT NULL,
    max_lat NUMERIC(6, 3) NOT NULL,
    min_lon NUMERIC(6, 3) NOT NULL,
    max_lon NUMERIC(6, 3) NOT NULL,
    extreme_forecast_index NUMERIC(4, 3) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pinpoint_5km_alerts (
    id SERIAL PRIMARY KEY,
    anomaly_id VARCHAR(64) REFERENCES medium_range_anomalies(anomaly_id),
    centroid_lat NUMERIC(6, 3) NOT NULL,
    centroid_lon NUMERIC(6, 3) NOT NULL,
    impact_radius_km NUMERIC(4, 2) DEFAULT 5.00,
    peak_amplitude VARCHAR(128) NOT NULL,
    dispatched_to VARCHAR(128) NOT NULL, -- NDRF, SDMA, District Disaster Management
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
