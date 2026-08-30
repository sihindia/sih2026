-- =========================================================================
-- MOES SAMUDRANETRA 360 DATABASE SCHEMA (SIH26057)
-- Ministry of Earth Sciences (MoES) - National Institute of Ocean Technology
-- =========================================================================

CREATE TABLE IF NOT EXISTS sonar_acoustic_surveys (
    id SERIAL PRIMARY KEY,
    survey_id VARCHAR(64) UNIQUE NOT NULL,
    survey_location VARCHAR(255) NOT NULL,
    sonar_instrument VARCHAR(128) NOT NULL,
    seabed_depth_meters NUMERIC(6, 2) NOT NULL,
    towfish_altitude_meters NUMERIC(6, 2) NOT NULL,
    detected_anomaly_class VARCHAR(128) NOT NULL,
    bounding_dimensions VARCHAR(128) NOT NULL,
    acoustic_signature TEXT NOT NULL,
    latitude VARCHAR(32) NOT NULL,
    longitude VARCHAR(32) NOT NULL,
    detection_confidence_pct NUMERIC(4, 1) NOT NULL,
    recommended_mitigation TEXT NOT NULL,
    hazard_status VARCHAR(64) DEFAULT 'HAZARD_GEOREFERENCED_FOR_RETRIEVAL',
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS marine_debris_salvage_logs (
    id SERIAL PRIMARY KEY,
    survey_id VARCHAR(64) REFERENCES sonar_acoustic_surveys(survey_id),
    debris_type VARCHAR(64) NOT NULL,
    estimated_weight_kg NUMERIC(8, 2) DEFAULT 0.0,
    salvage_vessel VARCHAR(128) NOT NULL,
    retrieval_status VARCHAR(64) DEFAULT 'DIVER_RETRIEVAL_PENDING',
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
