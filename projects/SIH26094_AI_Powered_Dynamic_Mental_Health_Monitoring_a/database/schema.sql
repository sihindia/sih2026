-- =========================================================================
-- MOSJE MANASRAKSHAK 360 DATABASE SCHEMA (SIH26094)
-- Ministry of Social Justice and Empowerment (MoSJE)
-- =========================================================================

CREATE TABLE IF NOT EXISTS longitudinal_victim_distress_profiles (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    victim_identifier VARCHAR(128) NOT NULL,
    location VARCHAR(255) NOT NULL,
    legal_stage VARCHAR(128) NOT NULL,
    initial_dds_score NUMERIC(5, 2) NOT NULL,
    month3_dds_score NUMERIC(5, 2) NOT NULL,
    current_month5_dds NUMERIC(5, 2) NOT NULL,
    longitudinal_trend VARCHAR(64) NOT NULL,
    distress_root_cause TEXT NOT NULL,
    ai_crisis_prediction TEXT NOT NULL,
    district_interventions TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'CRISIS_INTERVENTION_DISPATCHED',
    last_evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS touchpoint_interaction_logs (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) REFERENCES longitudinal_victim_distress_profiles(case_id),
    channel_type VARCHAR(64) NOT NULL, -- IVRS, Chatbot, Portal, Field Visit
    recorded_dds NUMERIC(5, 2) NOT NULL,
    voice_tremor_detected BOOLEAN DEFAULT FALSE,
    interaction_summary TEXT NOT NULL,
    interacted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS district_magistrate_alerts (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) REFERENCES longitudinal_victim_distress_profiles(case_id),
    alert_level VARCHAR(32) NOT NULL, -- Amber, Red, Critical
    witness_protection_action TEXT NOT NULL,
    dm_acknowledged BOOLEAN DEFAULT FALSE,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
