-- =========================================================================
-- CMPDI MINEREPORT AI 360 DATABASE SCHEMA (SIH26023)
-- Ministry of Coal - Coal India Limited (CIL) / CMPDI
-- =========================================================================

CREATE TABLE IF NOT EXISTS geological_exploration_blocks (
    id SERIAL PRIMARY KEY,
    block_id VARCHAR(64) UNIQUE NOT NULL,
    block_name VARCHAR(255) NOT NULL,
    subsidiary VARCHAR(128) NOT NULL,
    coalfield VARCHAR(128) NOT NULL,
    state VARCHAR(64) NOT NULL,
    drilling_boreholes_count INTEGER NOT NULL,
    max_drilled_depth_m NUMERIC(8, 2) NOT NULL,
    proved_geological_reserves_mt NUMERIC(10, 2) NOT NULL,
    indicated_reserves_mt NUMERIC(10, 2) NOT NULL,
    average_gcv_grade VARCHAR(128) NOT NULL,
    stripping_ratio_cum_per_tonne NUMERIC(6, 2) NOT NULL,
    extraction_status VARCHAR(64) DEFAULT 'ACTIVE_MEGA_MINING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subsidiary_production_records (
    id SERIAL PRIMARY KEY,
    subsidiary_code VARCHAR(32) UNIQUE NOT NULL,
    subsidiary_name VARCHAR(255) NOT NULL,
    annual_target_mt NUMERIC(10, 2) NOT NULL,
    actual_production_mt NUMERIC(10, 2) NOT NULL,
    target_achievement_pct NUMERIC(5, 2) NOT NULL,
    overburden_removal_mcum NUMERIC(10, 2) NOT NULL,
    dispatch_to_power_plants_mt NUMERIC(10, 2) NOT NULL,
    daily_rail_rakes_loaded INTEGER NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
