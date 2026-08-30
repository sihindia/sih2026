-- =========================================================================
-- DOLR BHOOMIACQUIRE 360 DATABASE SCHEMA (SIH26016)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS land_acquisition_proposals (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    state VARCHAR(64) NOT NULL,
    district VARCHAR(128) NOT NULL,
    requiring_body VARCHAR(255) NOT NULL,
    notified_area_ha NUMERIC(10, 2) NOT NULL,
    acquired_area_ha NUMERIC(10, 2) NOT NULL,
    assessed_compensation_cr NUMERIC(10, 2) NOT NULL,
    disbursed_compensation_cr NUMERIC(10, 2) NOT NULL,
    affected_families_count INTEGER NOT NULL,
    randr_completion_pct NUMERIC(5, 2) NOT NULL,
    current_stage VARCHAR(128) NOT NULL,
    lifecycle_status VARCHAR(64) DEFAULT 'POSSESSION_COMPLETED_HANDED_OVER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
