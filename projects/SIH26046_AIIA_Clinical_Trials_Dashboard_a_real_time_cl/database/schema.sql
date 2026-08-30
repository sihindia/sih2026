-- =========================================================================
-- AIIA CLINICAL TRIALS MANAGEMENT SYSTEM (CTMS) DATABASE SCHEMA (SIH26046)
-- Ministry of Ayush - All India Institute of Ayurveda (AIIA)
-- =========================================================================

CREATE TABLE IF NOT EXISTS aiia_clinical_trials (
    id SERIAL PRIMARY KEY,
    trial_code VARCHAR(64) UNIQUE NOT NULL,
    ctri_number VARCHAR(64) UNIQUE NOT NULL,
    study_title TEXT NOT NULL,
    lead_centre VARCHAR(255) NOT NULL,
    principal_investigator VARCHAR(128) NOT NULL,
    regulatory_framework VARCHAR(255) NOT NULL,
    target_recruitment INTEGER NOT NULL,
    current_enrolled INTEGER NOT NULL,
    enrolment_rate_pct NUMERIC(4, 2) NOT NULL,
    iec_approval_status VARCHAR(64) NOT NULL,
    data_standard VARCHAR(128) NOT NULL,
    safety_profile TEXT NOT NULL,
    study_phase VARCHAR(64) NOT NULL,
    status VARCHAR(64) DEFAULT 'RECRUITING_ON_SCHEDULE',
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pharmacovigilance_safety_reports (
    id SERIAL PRIMARY KEY,
    ae_id VARCHAR(64) UNIQUE NOT NULL,
    trial_code VARCHAR(64) REFERENCES aiia_clinical_trials(trial_code),
    meddra_term VARCHAR(128) NOT NULL,
    severity VARCHAR(64) NOT NULL,
    causality_assessment VARCHAR(64) NOT NULL,
    action_taken TEXT NOT NULL,
    reported_to_dcgi BOOLEAN DEFAULT FALSE,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
