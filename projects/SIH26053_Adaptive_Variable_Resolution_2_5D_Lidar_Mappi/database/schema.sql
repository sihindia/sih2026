-- =========================================================================
-- DRDO NETRALIDAR 360 DATABASE SCHEMA (SIH26053)
-- DRDO - Department of Defence Production / iDEX
-- =========================================================================

CREATE TABLE IF NOT EXISTS lidar_perception_missions (
    id SERIAL PRIMARY KEY,
    mission_id VARCHAR(64) UNIQUE NOT NULL,
    vehicle_platform VARCHAR(255) NOT NULL,
    operational_environment TEXT NOT NULL,
    lidar_sensor_spec VARCHAR(255) NOT NULL,
    grid_structure TEXT NOT NULL,
    deep_learning_backbone VARCHAR(128) NOT NULL,
    raw_pointcloud_ram_mb NUMERIC(8, 1) NOT NULL,
    foveated_grid_ram_mb NUMERIC(8, 1) NOT NULL,
    memory_reduction_pct NUMERIC(4, 1) NOT NULL,
    inference_fps NUMERIC(5, 2) NOT NULL,
    latency_ms NUMERIC(5, 2) NOT NULL,
    critical_detections TEXT NOT NULL,
    perception_status VARCHAR(64) DEFAULT 'REAL_TIME_AUTONOMOUS_PERCEPTION',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS foveated_elevation_cells (
    id SERIAL PRIMARY KEY,
    mission_id VARCHAR(64) REFERENCES lidar_perception_missions(mission_id),
    radial_distance_m NUMERIC(6, 2) NOT NULL,
    cell_resolution_m NUMERIC(4, 2) NOT NULL,
    z_max_elevation NUMERIC(6, 3) NOT NULL,
    z_min_elevation NUMERIC(6, 3) NOT NULL,
    elevation_variance NUMERIC(6, 4) NOT NULL,
    semantic_class VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
