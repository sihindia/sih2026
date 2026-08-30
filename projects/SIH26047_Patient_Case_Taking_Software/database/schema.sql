-- =========================================================================
-- AIIA MEDIKIOSK 360 DATABASE SCHEMA (SIH26047)
-- Ministry of Ayush - All India Institute of Ayurveda (AIIA)
-- =========================================================================

CREATE TABLE IF NOT EXISTS medikiosk_patient_intakes (
    id SERIAL PRIMARY KEY,
    intake_id VARCHAR(64) UNIQUE NOT NULL,
    abha_id VARCHAR(64) NOT NULL,
    patient_demographics VARCHAR(255) NOT NULL,
    opd_clinic VARCHAR(255) NOT NULL,
    interaction_mode VARCHAR(128) NOT NULL,
    chief_complaint TEXT NOT NULL,
    socrates_hpi TEXT NOT NULL,
    ayurvedic_pariksha TEXT NOT NULL,
    ocr_documents_scanned TEXT NOT NULL,
    red_flag_alert TEXT NOT NULL,
    time_saved_minutes NUMERIC(4, 1) NOT NULL,
    physician_summary_status VARCHAR(128) NOT NULL,
    status VARCHAR(64) DEFAULT 'SUMMARY_PUSHED_TO_HIS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS abha_fhir_bundles (
    id SERIAL PRIMARY KEY,
    intake_id VARCHAR(64) REFERENCES medikiosk_patient_intakes(intake_id),
    fhir_resource_type VARCHAR(64) DEFAULT 'Bundle',
    abdm_consent_artifact_id VARCHAR(128) NOT NULL,
    encrypted_payload_hash VARCHAR(128) NOT NULL,
    pushed_to_his BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
