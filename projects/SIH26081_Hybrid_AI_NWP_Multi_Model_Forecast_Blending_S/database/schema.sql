-- =========================================================================
-- NCMRWF BLENDCAST 360 DATABASE SCHEMA (SIH26081)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS multimodel_blended_cases (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    hazard_scenario VARCHAR(255) NOT NULL,
    region_district VARCHAR(255) NOT NULL,
    forecast_lead_day INTEGER NOT NULL,
    lead_time_hours INTEGER NOT NULL,
    candidate_models TEXT NOT NULL,
    ai_adaptive_weights TEXT NOT NULL,
    dynamically_blended_consensus VARCHAR(128) NOT NULL,
    observed_ground_truth VARCHAR(128) NOT NULL,
    skill_improvement_vs_best TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'BLENDED_OPTIMAL',
    blended_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS model_weight_allocations (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(128) UNIQUE NOT NULL,
    model_type VARCHAR(64) NOT NULL,
    dominant_regimes TEXT NOT NULL,
    avg_weight VARCHAR(32) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS extreme_consensus_alerts (
    id SERIAL PRIMARY KEY,
    variable VARCHAR(128) NOT NULL,
    consensus_spread VARCHAR(64) NOT NULL,
    confidence VARCHAR(64) NOT NULL,
    operational_advice TEXT NOT NULL,
    alerted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
