-- =========================================================================
-- AYUSH IP-SAKTI SAHAYAK 360 DATABASE SCHEMA (SIH26045)
-- Ministry of Ayush - All India Institute of Ayurveda (AIIA)
-- =========================================================================

CREATE TABLE IF NOT EXISTS ayurvedic_ip_consultations (
    id SERIAL PRIMARY KEY,
    consultation_id VARCHAR(64) UNIQUE NOT NULL,
    applicant_entity VARCHAR(255) NOT NULL,
    formulation_name VARCHAR(255) NOT NULL,
    primary_query TEXT NOT NULL,
    formulation_tier VARCHAR(128) NOT NULL,
    jurisdiction VARCHAR(64) NOT NULL,
    national_patent_verdict TEXT NOT NULL,
    abs_compliance_obligation TEXT NOT NULL,
    international_guidance TEXT NOT NULL,
    statutory_citations TEXT NOT NULL,
    rag_confidence_score NUMERIC(4, 2) NOT NULL,
    status VARCHAR(64) DEFAULT 'SOURCE_CITED_VALIDATED',
    consulted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS statutory_legal_corpus (
    id SERIAL PRIMARY KEY,
    statute_name VARCHAR(255) NOT NULL,
    section_rule VARCHAR(128) NOT NULL,
    official_gazette_ref VARCHAR(255) NOT NULL,
    tkdl_cross_reference VARCHAR(128),
    legal_text TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
