-- =========================================================================
-- MOES DHRUVAGYAN 360 DATABASE SCHEMA (SIH26063)
-- Ministry of Earth Sciences (MoES) - NCPOR Goa
-- =========================================================================

CREATE TABLE IF NOT EXISTS polar_science_datasets (
    id SERIAL PRIMARY KEY,
    dataset_id VARCHAR(64) UNIQUE NOT NULL,
    dataset_title VARCHAR(255) NOT NULL,
    theatre_domain VARCHAR(128) NOT NULL,
    sampling_depth_m NUMERIC(6, 2) NOT NULL,
    chronological_span VARCHAR(128) NOT NULL,
    measured_proxies TEXT NOT NULL,
    doi_identifier VARCHAR(128) NOT NULL,
    fair_compliance_rating VARCHAR(64) NOT NULL,
    file_size_mb NUMERIC(6, 1) NOT NULL,
    citation_count INTEGER DEFAULT 0,
    access_status VARCHAR(64) DEFAULT 'OPEN_RESEARCH_ACCESSIBLE',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS science_outreach_articles (
    id SERIAL PRIMARY KEY,
    dataset_id VARCHAR(64) REFERENCES polar_science_datasets(dataset_id),
    language_code VARCHAR(8) NOT NULL,
    article_title VARCHAR(255) NOT NULL,
    educational_summary TEXT NOT NULL,
    target_audience VARCHAR(64) NOT NULL,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
