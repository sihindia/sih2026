-- =========================================================================
-- RAILBLOCK AI 360 DATABASE SCHEMA (SIH26027)
-- Ministry of Railways - CRIS / COIS Architecture
-- =========================================================================

CREATE TABLE IF NOT EXISTS rail_corridors (
    id SERIAL PRIMARY KEY,
    corridor_id VARCHAR(64) UNIQUE NOT NULL,
    corridor_name VARCHAR(255) NOT NULL,
    railway_zone VARCHAR(64) NOT NULL,
    section_length_km NUMERIC(8, 2) NOT NULL,
    line_capacity_utilization_pct NUMERIC(5, 2) NOT NULL,
    daily_train_density INTEGER NOT NULL,
    active_shadow_blocks_count INTEGER NOT NULL,
    punctuality_gain_pct NUMERIC(5, 2) NOT NULL,
    freight_throughput_gain_pct NUMERIC(5, 2) NOT NULL,
    delay_mins_saved_daily INTEGER NOT NULL,
    critical_bottleneck VARCHAR(255) NOT NULL,
    status VARCHAR(64) DEFAULT 'AI_BLOCK_PLANNING_ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shadow_blocks (
    id SERIAL PRIMARY KEY,
    block_id VARCHAR(64) UNIQUE NOT NULL,
    corridor_id VARCHAR(64) NOT NULL,
    scheduled_window VARCHAR(128) NOT NULL,
    duration_hours NUMERIC(4, 2) NOT NULL,
    participating_departments TEXT[] NOT NULL,
    delay_minutes_saved INTEGER NOT NULL,
    cois_safety_token VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
