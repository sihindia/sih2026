-- =========================================================================
-- MOES IMD WEATHERGPT 360 DATABASE SCHEMA (SIH26068)
-- Ministry of Earth Sciences (MoES) - India Meteorological Department
-- =========================================================================

CREATE TABLE IF NOT EXISTS weathergpt_conversations (
    id SERIAL PRIMARY KEY,
    query_id VARCHAR(64) UNIQUE NOT NULL,
    user_persona VARCHAR(128) NOT NULL,
    location VARCHAR(255) NOT NULL,
    user_query_text TEXT NOT NULL,
    language_code VARCHAR(32) NOT NULL,
    nwp_model_retrieved VARCHAR(128) NOT NULL,
    weathergpt_response TEXT NOT NULL,
    actionable_advisory TEXT NOT NULL,
    alert_level VARCHAR(64) DEFAULT 'GREEN_NOMINAL',
    sector VARCHAR(64) NOT NULL,
    responded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS extreme_weather_bulletins (
    id SERIAL PRIMARY KEY,
    alert_id VARCHAR(64) UNIQUE NOT NULL,
    hazard_type VARCHAR(128) NOT NULL,
    severity_level VARCHAR(64) NOT NULL,
    affected_regions TEXT NOT NULL,
    lead_time_hours INTEGER NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
