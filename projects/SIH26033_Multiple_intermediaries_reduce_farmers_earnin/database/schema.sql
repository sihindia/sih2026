-- =========================================================================
-- KISANDIRECT D2C 360 DATABASE SCHEMA (SIH26033)
-- Ministry of Consumer Affairs - DoCA
-- =========================================================================

CREATE TABLE IF NOT EXISTS fpo_produce_listings (
    id SERIAL PRIMARY KEY,
    listing_id VARCHAR(64) UNIQUE NOT NULL,
    fpo_name VARCHAR(255) NOT NULL,
    origin_location VARCHAR(128) NOT NULL,
    member_farmers_count INTEGER NOT NULL,
    crop_commodity VARCHAR(255) NOT NULL,
    available_stock_mt NUMERIC(8, 2) NOT NULL,
    farm_gate_price_per_qtl VARCHAR(32) NOT NULL,
    direct_consumer_price_per_qtl VARCHAR(32) NOT NULL,
    traditional_mandi_retail_price VARCHAR(32) NOT NULL,
    farmer_value_share_pct VARCHAR(16) NOT NULL,
    fpo_contact_person VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS direct_escrow_orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(64) UNIQUE NOT NULL,
    listing_id VARCHAR(64) NOT NULL,
    buyer_name VARCHAR(128) NOT NULL,
    quantity_quintals NUMERIC(8, 2) NOT NULL,
    total_consumer_payment VARCHAR(32) NOT NULL,
    direct_farmer_payout VARCHAR(32) NOT NULL,
    escrow_status VARCHAR(64) DEFAULT 'ESCROW_LOCKED_100_PCT',
    proof_of_delivery_token VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
