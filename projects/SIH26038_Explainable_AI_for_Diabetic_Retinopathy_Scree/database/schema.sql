-- =========================================================================
-- MATHWORKS NETRAAI 360 DATABASE SCHEMA (SIH26038)
-- MathWorks Retinal Imaging & Telemedicine Architecture
-- =========================================================================

CREATE TABLE IF NOT EXISTS rural_retinal_screenings (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(64) UNIQUE NOT NULL,
    patient_demographics VARCHAR(255) NOT NULL,
    phc_location VARCHAR(255) NOT NULL,
    fundus_camera VARCHAR(128) NOT NULL,
    image_quality VARCHAR(64) NOT NULL,
    lesions_detected TEXT NOT NULL,
    icdr_grade VARCHAR(64) NOT NULL,
    gradcam_attention TEXT NOT NULL,
    ai_confidence_pct NUMERIC(4, 2) NOT NULL,
    tele_ophthalmologist_time_sec INTEGER NOT NULL,
    clinical_action TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'VALIDATED_BY_SPECIALIST',
    screened_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tele_ophthalmologist_reviews (
    id SERIAL PRIMARY KEY,
    screening_id VARCHAR(64) REFERENCES rural_retinal_screenings(patient_id),
    doctor_name VARCHAR(128) NOT NULL,
    hospital VARCHAR(128) NOT NULL,
    concurrence_with_ai BOOLEAN DEFAULT TRUE,
    review_latency_sec INTEGER NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
