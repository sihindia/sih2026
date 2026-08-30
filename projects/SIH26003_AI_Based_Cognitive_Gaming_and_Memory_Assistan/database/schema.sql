-- =========================================================================
-- MDONER SMRITINER 360 DATABASE SCHEMA (SIH26003)
-- Ministry of Development of North Eastern Region (MDoNER)
-- =========================================================================

CREATE TABLE IF NOT EXISTS dementia_patient_profiles (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    diagnosis VARCHAR(128) NOT NULL,
    preferred_language VARCHAR(64) NOT NULL,
    active_module VARCHAR(128) NOT NULL,
    tap_accuracy_pct NUMERIC(5, 2) NOT NULL,
    reaction_latency_sec NUMERIC(4, 2) NOT NULL,
    fatigue_score_pct NUMERIC(5, 2) NOT NULL,
    difficulty_level VARCHAR(64) NOT NULL,
    medication_compliance VARCHAR(128) NOT NULL,
    caregiver_contact VARCHAR(128) NOT NULL,
    session_status VARCHAR(64) DEFAULT 'COGNITIVE_SESSION_COMPLETED_SUCCESSFULLY',
    last_session_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS caregiver_medication_logs (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES dementia_patient_profiles(patient_id),
    pill_name VARCHAR(128) NOT NULL,
    scheduled_time VARCHAR(32) NOT NULL,
    taken_status BOOLEAN DEFAULT TRUE,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
