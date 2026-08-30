-- =========================================================================
-- JHARKHAND SURAKSHAAR 360 DATABASE SCHEMA (SIH26041)
-- Government of Jharkhand - Department of Higher & Technical Education
-- =========================================================================

CREATE TABLE IF NOT EXISTS ar_vocational_safety_trials (
    id SERIAL PRIMARY KEY,
    trial_id VARCHAR(64) UNIQUE NOT NULL,
    trainee_name VARCHAR(128) NOT NULL,
    workplace VARCHAR(255) NOT NULL,
    safety_module VARCHAR(128) NOT NULL,
    language VARCHAR(64) NOT NULL,
    ar_scenario TEXT NOT NULL,
    drill_actions TEXT NOT NULL,
    completion_score NUMERIC(5, 2) NOT NULL,
    dgms_rating VARCHAR(64) NOT NULL,
    qr_certificate VARCHAR(128) UNIQUE NOT NULL,
    status VARCHAR(64) DEFAULT 'CERTIFIED_COMPLIANT',
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dgms_safety_certificates (
    id SERIAL PRIMARY KEY,
    certificate_number VARCHAR(128) UNIQUE NOT NULL,
    trial_id VARCHAR(64) REFERENCES ar_vocational_safety_trials(trial_id),
    worker_adhaar_hash VARCHAR(64) NOT NULL,
    mines_act_section VARCHAR(64) DEFAULT 'Mines Act 1952 Sec 38',
    valid_years INTEGER DEFAULT 2,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
