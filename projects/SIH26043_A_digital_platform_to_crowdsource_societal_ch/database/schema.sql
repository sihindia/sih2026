-- =========================================================================
-- JHARKHAND SAHAYOGSETU 360 DATABASE SCHEMA (SIH26043)
-- Government of Jharkhand - Department of Higher & Technical Education
-- =========================================================================

CREATE TABLE IF NOT EXISTS crowdsourced_societal_challenges (
    id SERIAL PRIMARY KEY,
    challenge_id VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    originator VARCHAR(255) NOT NULL,
    thematic_domain VARCHAR(128) NOT NULL,
    problem_summary TEXT NOT NULL,
    assigned_university VARCHAR(255) NOT NULL,
    faculty_mentor VARCHAR(128) NOT NULL,
    industry_csr_sponsor VARCHAR(255) NOT NULL,
    grant_awarded_inr NUMERIC(12, 2) NOT NULL,
    solution_status TEXT NOT NULL,
    stage VARCHAR(64) DEFAULT 'PILOT_DEPLOYMENT_ACTIVE',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_nep_academic_credits (
    id SERIAL PRIMARY KEY,
    challenge_id VARCHAR(64) REFERENCES crowdsourced_societal_challenges(challenge_id),
    student_name VARCHAR(128) NOT NULL,
    roll_number VARCHAR(64) NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    credits_awarded INTEGER DEFAULT 6,
    certified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
