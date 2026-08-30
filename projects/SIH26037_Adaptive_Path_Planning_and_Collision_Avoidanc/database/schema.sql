-- =========================================================================
-- MATHWORKS AUTOPATH 360 DATABASE SCHEMA (SIH26037)
-- MathWorks Autonomous Driving & Navigation Simulation
-- =========================================================================

CREATE TABLE IF NOT EXISTS autonomous_driving_scenarios (
    id SERIAL PRIMARY KEY,
    scenario_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    location VARCHAR(255) NOT NULL,
    road_type VARCHAR(255) NOT NULL,
    ego_speed_kmh NUMERIC(5, 2) NOT NULL,
    primary_obstacle VARCHAR(255) NOT NULL,
    sensor_detections TEXT NOT NULL,
    planner_action TEXT NOT NULL,
    replan_latency_ms NUMERIC(5, 2) NOT NULL,
    path_smoothness NUMERIC(4, 2) NOT NULL,
    safety_margin_m NUMERIC(4, 2) NOT NULL,
    status VARCHAR(64) DEFAULT 'COLLISION_AVOIDED_SAFE_STOP',
    simulated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS replanned_trajectory_logs (
    id SERIAL PRIMARY KEY,
    scenario_id VARCHAR(64) REFERENCES autonomous_driving_scenarios(scenario_id),
    timestamp_ms INTEGER NOT NULL,
    frenet_s NUMERIC(8, 2) NOT NULL,
    frenet_d NUMERIC(5, 2) NOT NULL,
    steering_angle_deg NUMERIC(5, 2) NOT NULL,
    brake_pressure_bar NUMERIC(5, 2) NOT NULL,
    collision_clearance_m NUMERIC(4, 2) NOT NULL
);
