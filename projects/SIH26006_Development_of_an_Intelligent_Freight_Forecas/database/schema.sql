-- =========================================================================
-- SAIL SAMUDRASETU 360 DATABASE SCHEMA (SIH26006)
-- Ministry of Steel - Steel Authority of India Limited (SAIL)
-- =========================================================================

CREATE TABLE IF NOT EXISTS bulk_cargo_trade_lanes (
    id SERIAL PRIMARY KEY,
    lane_id VARCHAR(64) UNIQUE NOT NULL,
    lane_title VARCHAR(255) NOT NULL,
    origin_port VARCHAR(128) NOT NULL,
    destination_port VARCHAR(128) NOT NULL,
    cargo_type VARCHAR(128) NOT NULL,
    parcel_size_mt NUMERIC(10, 2) NOT NULL,
    recommended_vessel VARCHAR(64) NOT NULL,
    spot_freight_usd_mt NUMERIC(6, 2) NOT NULL,
    forecast_60d_usd_mt NUMERIC(6, 2) NOT NULL,
    charter_recommendation TEXT NOT NULL,
    draft_status TEXT NOT NULL,
    estimated_savings_usd NUMERIC(12, 2) NOT NULL,
    charter_status VARCHAR(64) DEFAULT 'TIME_CHARTER_LOCKED_OPTIMAL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS east_coast_ports (
    id SERIAL PRIMARY KEY,
    port_name VARCHAR(128) UNIQUE NOT NULL,
    state VARCHAR(64) NOT NULL,
    max_draft_m NUMERIC(4, 1) NOT NULL,
    max_loa_m NUMERIC(5, 1) NOT NULL,
    max_beam_m NUMERIC(4, 1) NOT NULL,
    handling_rate_mt_day INTEGER NOT NULL,
    suitable_vessels TEXT NOT NULL
);
