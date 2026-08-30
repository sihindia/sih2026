-- =========================================================================
-- MOSPI VAYUINDEX 360 DATABASE SCHEMA (SIH26056)
-- Ministry of Statistics and Programme Implementation (MoSPI) - DIID
-- =========================================================================

CREATE TABLE IF NOT EXISTS dgca_city_pair_routes (
    id SERIAL PRIMARY KEY,
    route_code VARCHAR(16) UNIQUE NOT NULL,
    sector_name VARCHAR(255) NOT NULL,
    dgca_traffic_weight_pct NUMERIC(4, 2) NOT NULL,
    carriers_monitored TEXT NOT NULL,
    current_route_apix NUMERIC(6, 2) NOT NULL,
    mom_inflation_pct NUMERIC(4, 2) NOT NULL,
    cpi_contribution_status VARCHAR(64) DEFAULT 'AUGMENTED_LIVE_NSO_CPI',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS airfare_quotes_scraped (
    id SERIAL PRIMARY KEY,
    route_code VARCHAR(16) REFERENCES dgca_city_pair_routes(route_code),
    carrier_code VARCHAR(8) NOT NULL,
    portal_source VARCHAR(64) NOT NULL,
    advance_lead_time_days INTEGER NOT NULL,
    base_fare_inr NUMERIC(10, 2) NOT NULL,
    fuel_surcharge_inr NUMERIC(10, 2) NOT NULL,
    udf_asf_fees_inr NUMERIC(10, 2) NOT NULL,
    gst_inr NUMERIC(10, 2) NOT NULL,
    total_fare_inr NUMERIC(10, 2) NOT NULL,
    scraped_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
