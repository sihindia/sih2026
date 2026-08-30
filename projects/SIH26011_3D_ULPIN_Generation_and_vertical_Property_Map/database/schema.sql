-- =========================================================================
-- DOLR NAKSHA3D 360 DATABASE SCHEMA (SIH26011)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS vertical_parcels (
    id SERIAL PRIMARY KEY,
    parcel_id VARCHAR(64) UNIQUE NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    property_type VARCHAR(128) NOT NULL,
    surface_survey_number VARCHAR(128) NOT NULL,
    floor_level VARCHAR(64) NOT NULL,
    floor_area_sqm NUMERIC(8, 2) NOT NULL,
    ceiling_height_m NUMERIC(4, 2) NOT NULL,
    volumetric_space_m3 NUMERIC(10, 2) NOT NULL,
    generated_3d_ulpin VARCHAR(64) UNIQUE NOT NULL,
    air_rights_elevation_m VARCHAR(64) NOT NULL,
    subsurface_depth_m VARCHAR(64) NOT NULL,
    topology_collision_check VARCHAR(64) NOT NULL,
    mortgage_registry_status VARCHAR(128) NOT NULL,
    cadastral_status VARCHAR(64) DEFAULT '3D_ULPIN_ISSUED_ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lidar_drone_surveys (
    id SERIAL PRIMARY KEY,
    source VARCHAR(128) NOT NULL,
    gsd_cm_px NUMERIC(4, 2),
    point_density_pts_m2 NUMERIC(6, 2),
    sensor_model VARCHAR(128) NOT NULL,
    extracted_features TEXT NOT NULL
);
