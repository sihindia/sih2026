-- =========================================================================
-- KVIC HONEY CHAIN 360 DATABASE SCHEMA (SIH26021)
-- Ministry of MSME - Khadi & Village Industries Commission (KVIC)
-- =========================================================================

CREATE TABLE IF NOT EXISTS honey_batches (
    id SERIAL PRIMARY KEY,
    batch_id VARCHAR(64) UNIQUE NOT NULL,
    apiary_name VARCHAR(255) NOT NULL,
    region VARCHAR(128) NOT NULL,
    beekeeper_name VARCHAR(128) NOT NULL,
    botanical_origin VARCHAR(128) NOT NULL,
    pollen_purity_pct NUMERIC(5, 2) NOT NULL,
    moisture_pct NUMERIC(5, 2) NOT NULL,
    hmf_mg_kg NUMERIC(6, 2) NOT NULL,
    nmr_isotope_test VARCHAR(128) NOT NULL,
    blockchain_tx_hash VARCHAR(128) NOT NULL,
    retail_pack_price VARCHAR(64) NOT NULL,
    traceability_status VARCHAR(64) DEFAULT 'BLOCKCHAIN_VERIFIED_AUTHENTIC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
