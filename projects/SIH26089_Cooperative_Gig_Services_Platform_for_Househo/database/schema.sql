-- =========================================================================
-- SAHAKARGIG 360 DATABASE SCHEMA (SIH26089)
-- Ministry of Cooperation / NCCT
-- =========================================================================

CREATE TABLE IF NOT EXISTS cooperative_gig_bookings (
    id SERIAL PRIMARY KEY,
    booking_id VARCHAR(64) UNIQUE NOT NULL,
    service_category VARCHAR(255) NOT NULL,
    cooperative_society VARCHAR(255) NOT NULL,
    worker_name VARCHAR(128) NOT NULL,
    customer_locality VARCHAR(255) NOT NULL,
    eta_minutes INTEGER NOT NULL,
    customer_paid_inr NUMERIC(8, 2) NOT NULL,
    worker_received_inr NUMERIC(8, 2) NOT NULL,
    welfare_fund_inr NUMERIC(8, 2) NOT NULL,
    private_platform_comparison TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'COOP_SERVICE_COMPLETED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS labour_cooperative_societies (
    id SERIAL PRIMARY KEY,
    society_name VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(128) NOT NULL,
    members_count INTEGER NOT NULL,
    skills_provided TEXT NOT NULL,
    certifying_authority VARCHAR(128) NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS worker_welfare_contributions (
    id SERIAL PRIMARY KEY,
    worker_id VARCHAR(64) NOT NULL,
    booking_id VARCHAR(64) REFERENCES cooperative_gig_bookings(booking_id),
    amount_inr NUMERIC(8, 2) NOT NULL,
    fund_purpose VARCHAR(128) NOT NULL, -- Health, Accident, Pension, Equipment Loan
    credited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
