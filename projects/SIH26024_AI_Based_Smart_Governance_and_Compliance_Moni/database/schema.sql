-- =========================================================================
-- KOILGOVERNANCE AI 360 DATABASE SCHEMA (SIH26024)
-- Ministry of Coal - Coal India Limited (CIL)
-- =========================================================================

CREATE TABLE IF NOT EXISTS coal_mines_compliance (
    id SERIAL PRIMARY KEY,
    mine_id VARCHAR(64) UNIQUE NOT NULL,
    mine_name VARCHAR(255) NOT NULL,
    subsidiary VARCHAR(128) NOT NULL,
    area_coalfield VARCHAR(128) NOT NULL,
    state VARCHAR(64) NOT NULL,
    daily_production_tonnes INTEGER NOT NULL,
    dgms_safety_rating VARCHAR(64) NOT NULL,
    slope_stability_radar_status VARCHAR(128) NOT NULL,
    ambient_pm10_ug_m3 NUMERIC(6, 2) NOT NULL,
    spcb_cto_status VARCHAR(64) NOT NULL,
    forest_clearance_stage VARCHAR(64) NOT NULL,
    compliance_index_pct NUMERIC(5, 2) NOT NULL,
    governance_status VARCHAR(64) DEFAULT 'FULLY_COMPLIANT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS field_safety_inspections (
    id SERIAL PRIMARY KEY,
    inspection_id VARCHAR(64) UNIQUE NOT NULL,
    mine_name VARCHAR(255) NOT NULL,
    inspector_name VARCHAR(128) NOT NULL,
    geo_coordinates VARCHAR(64) NOT NULL,
    inspection_domain VARCHAR(128) NOT NULL,
    observations TEXT NOT NULL,
    corrective_action_required TEXT NOT NULL,
    urgency VARCHAR(64) NOT NULL,
    inspected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
