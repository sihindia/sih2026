-- =========================================================================
-- MOSJE UDYAMSAATHI 360 DATABASE SCHEMA (SIH26091)
-- Ministry of Social Justice and Empowerment (MoSJE)
-- =========================================================================

CREATE TABLE IF NOT EXISTS rural_micro_enterprise_proposals (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    entrepreneur_name VARCHAR(128) NOT NULL,
    location VARCHAR(255) NOT NULL,
    proposed_business VARCHAR(255) NOT NULL,
    available_margin_inr NUMERIC(10, 2) NOT NULL,
    calculated_project_cost_inr NUMERIC(12, 2) NOT NULL,
    scheme_selected VARCHAR(128) NOT NULL,
    eligible_loan_amount_inr NUMERIC(12, 2) NOT NULL,
    interest_rate_pct NUMERIC(4, 2) NOT NULL,
    tenure_years INTEGER NOT NULL,
    moratorium_months INTEGER NOT NULL,
    quarterly_emi_inr NUMERIC(10, 2) NOT NULL,
    market_radius_km VARCHAR(64) NOT NULL,
    underserved_demand TEXT NOT NULL,
    competitor_density VARCHAR(128) NOT NULL,
    feasibility_status VARCHAR(64) DEFAULT 'FEASIBILITY_APPROVED',
    assessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS concessional_credit_schemes (
    id SERIAL PRIMARY KEY,
    scheme_name VARCHAR(128) UNIQUE NOT NULL,
    cost_ceiling VARCHAR(128) NOT NULL,
    loan_percentage VARCHAR(64) NOT NULL,
    concessional_interest VARCHAR(64) NOT NULL,
    repayment_tenure VARCHAR(64) NOT NULL,
    moratorium_period VARCHAR(64) NOT NULL,
    target_beneficiaries TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rural_market_swot_records (
    id SERIAL PRIMARY KEY,
    business_category VARCHAR(128) NOT NULL,
    strengths TEXT NOT NULL,
    weaknesses TEXT NOT NULL,
    opportunities TEXT NOT NULL,
    threats TEXT NOT NULL,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
