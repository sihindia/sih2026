-- =========================================================================
-- MOSJE TRAUMASHIELD 360 DATABASE SCHEMA (SIH26093)
-- Ministry of Social Justice and Empowerment (MoSJE)
-- =========================================================================

CREATE TABLE IF NOT EXISTS nhaa_distress_call_assessments (
    id SERIAL PRIMARY KEY,
    call_id VARCHAR(64) UNIQUE NOT NULL,
    caller_category VARCHAR(128) NOT NULL,
    location VARCHAR(255) NOT NULL,
    helpline_channel VARCHAR(64) NOT NULL, -- NHAA 14566, Portal, Chatbot, App
    caller_narrative TEXT NOT NULL,
    pitch_instability_hz VARCHAR(64) NOT NULL,
    speech_pause_ratio_pct NUMERIC(5, 2) NOT NULL,
    speech_jitter_pct NUMERIC(4, 2) NOT NULL,
    svi_score NUMERIC(5, 2) NOT NULL,
    risk_category VARCHAR(64) NOT NULL, -- Low, Moderate, High, Critical
    trauma_indicators TEXT NOT NULL,
    automated_interventions TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'EMERGENCY_ESCALATION_ACTIVE',
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS emergency_counselling_dispatches (
    id SERIAL PRIMARY KEY,
    call_id VARCHAR(64) REFERENCES nhaa_distress_call_assessments(call_id),
    psychiatrist_name VARCHAR(128) NOT NULL,
    institution VARCHAR(128) DEFAULT 'NIMHANS Tele-MANAS',
    police_protection_alerted BOOLEAN DEFAULT TRUE,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
