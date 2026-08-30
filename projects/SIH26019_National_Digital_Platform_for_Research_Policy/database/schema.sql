-- =========================================================================
-- DOLR NEETIMANTHAN 360 DATABASE SCHEMA (SIH26019)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS land_policy_research_papers (
    id SERIAL PRIMARY KEY,
    paper_id VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    lead_author VARCHAR(255) NOT NULL,
    category VARCHAR(128) NOT NULL,
    publication_year INTEGER NOT NULL,
    citations_count INTEGER NOT NULL,
    empirical_finding TEXT NOT NULL,
    policy_recommendation TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'POLICY_REFORM_SIMULATED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
