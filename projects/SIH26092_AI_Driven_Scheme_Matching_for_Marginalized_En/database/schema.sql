-- =========================================================================
-- MOSJE CHANNELMATCH 360 DATABASE SCHEMA (SIH26092)
-- Ministry of Social Justice and Empowerment (MoSJE)
-- =========================================================================

CREATE TABLE IF NOT EXISTS marginalized_scheme_applications (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    beneficiary_name VARCHAR(128) NOT NULL,
    family_income_inr NUMERIC(10, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    estimated_cost_inr NUMERIC(12, 2) NOT NULL,
    matched_scheme VARCHAR(128) NOT NULL,
    eligible_loan_inr NUMERIC(12, 2) NOT NULL,
    concessional_rate_pct NUMERIC(4, 2) NOT NULL,
    tenure_years INTEGER NOT NULL,
    moratorium_months INTEGER NOT NULL,
    quarterly_emi_inr NUMERIC(10, 2) NOT NULL,
    nearest_channel_partner VARCHAR(255) NOT NULL,
    partner_npa_health VARCHAR(64) NOT NULL,
    partner_distance_km NUMERIC(5, 2) NOT NULL,
    status VARCHAR(64) DEFAULT 'ROUTED_TO_SCA_BRANCH',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS channel_partners_registry (
    id SERIAL PRIMARY KEY,
    partner_name VARCHAR(255) UNIQUE NOT NULL,
    partner_type VARCHAR(64) NOT NULL,
    npa_percentage NUMERIC(4, 2) NOT NULL,
    liquidity_status VARCHAR(64) NOT NULL,
    geographic_coverage TEXT NOT NULL,
    audited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
