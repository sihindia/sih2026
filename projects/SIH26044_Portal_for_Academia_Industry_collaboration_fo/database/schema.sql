-- =========================================================================
-- AYUSH KAUSHALSETU 360 DATABASE SCHEMA (SIH26044)
-- Ministry of Ayush - All India Institute of Ayurveda (AIIA)
-- =========================================================================

CREATE TABLE IF NOT EXISTS ayush_student_skill_profiles (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(64) UNIQUE NOT NULL,
    student_name VARCHAR(128) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    target_domain VARCHAR(128) NOT NULL,
    verified_strengths TEXT NOT NULL,
    identified_skill_gap TEXT NOT NULL,
    recommended_upskilling TEXT NOT NULL,
    matched_internship VARCHAR(255) NOT NULL,
    stipend_offered VARCHAR(128) NOT NULL,
    match_compatibility_pct NUMERIC(4, 2) NOT NULL,
    status VARCHAR(64) DEFAULT 'INTERNSHIP_OFFER_ACCEPTED',
    assessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ayush_industry_job_openings (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(128) NOT NULL,
    job_role VARCHAR(128) NOT NULL,
    stipend_inr VARCHAR(64) NOT NULL,
    vacancies INTEGER NOT NULL,
    required_skills TEXT NOT NULL,
    gmp_certified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
