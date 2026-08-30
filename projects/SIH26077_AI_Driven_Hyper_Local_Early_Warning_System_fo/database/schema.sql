-- =========================================================================
-- NCMRWF HYPERWARN 360 DATABASE SCHEMA (SIH26077)
-- Ministry of Earth Sciences (MoES) / NCMRWF
-- =========================================================================

CREATE TABLE IF NOT EXISTS severe_weather_events (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(64) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    hazard_type VARCHAR(128) NOT NULL,
    lead_time_hours NUMERIC(4, 2) NOT NULL,
    atmospheric_precursors TEXT NOT NULL,
    topographic_channeling TEXT NOT NULL,
    mtl_probabilities TEXT NOT NULL,
    actionable_alert TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'DISPATCHED',
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS satellite_precursors (
    id SERIAL PRIMARY KEY,
    sensor_name VARCHAR(64) NOT NULL,
    channel_type VARCHAR(64) NOT NULL,
    variable_name VARCHAR(128) NOT NULL,
    observed_value NUMERIC(10, 3) NOT NULL,
    rate_of_change NUMERIC(10, 3),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nowcast_disaster_alerts (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(64) REFERENCES severe_weather_events(event_id),
    target_agency VARCHAR(128) NOT NULL, -- NDRF, SDMA, District Magistrate
    alert_severity VARCHAR(32) NOT NULL,
    dispatched_via VARCHAR(64) NOT NULL, -- SMS, Webhook, WhatsApp, Sirens
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
