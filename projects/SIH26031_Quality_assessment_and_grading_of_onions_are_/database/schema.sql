-- =========================================================================
-- PYAAZPARIKSHAN AI 360 DATABASE SCHEMA (SIH26031)
-- Ministry of Consumer Affairs - DoCA / NAFED
-- =========================================================================

CREATE TABLE IF NOT EXISTS onion_lots (
    id SERIAL PRIMARY KEY,
    lot_id VARCHAR(64) UNIQUE NOT NULL,
    mandi_center VARCHAR(255) NOT NULL,
    farmer_name VARCHAR(128) NOT NULL,
    variety VARCHAR(128) NOT NULL,
    lot_weight_quintals NUMERIC(8, 2) NOT NULL,
    grade_a_pct NUMERIC(5, 2) NOT NULL,
    grade_b_pct NUMERIC(5, 2) NOT NULL,
    urs_pct NUMERIC(5, 2) NOT NULL,
    final_payout_rate VARCHAR(64) NOT NULL,
    total_lot_value VARCHAR(64) NOT NULL,
    quality_certificate_no VARCHAR(128) UNIQUE NOT NULL,
    dbt_transaction_utr VARCHAR(128) NOT NULL,
    procurement_status VARCHAR(64) DEFAULT 'NAFED_ACCEPTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
