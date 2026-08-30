-- =========================================================================
-- MOSJE SHILPSETU 360 DATABASE SCHEMA (SIH26090)
-- Ministry of Social Justice and Empowerment (MoSJE)
-- =========================================================================

CREATE TABLE IF NOT EXISTS artisan_product_catalogs (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(64) UNIQUE NOT NULL,
    craft_title VARCHAR(255) NOT NULL,
    artisan_name VARCHAR(128) NOT NULL,
    cluster_location VARCHAR(255) NOT NULL,
    craft_domain VARCHAR(128) NOT NULL,
    gi_tag_status VARCHAR(64) NOT NULL,
    artisan_voice_input TEXT NOT NULL,
    ai_generated_catalog_title VARCHAR(255) NOT NULL,
    ai_studio_enhancement TEXT NOT NULL,
    labor_hours INTEGER NOT NULL,
    raw_material_cost_inr NUMERIC(10, 2) NOT NULL,
    labor_fair_compensation_inr NUMERIC(10, 2) NOT NULL,
    suggested_fair_price_inr NUMERIC(10, 2) NOT NULL,
    traditional_middleman_cut TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'CATALOG_PUBLISHED_LIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS voice_catalog_translations (
    id SERIAL PRIMARY KEY,
    source_language VARCHAR(32) NOT NULL,
    audio_transcript TEXT NOT NULL,
    seo_english_description TEXT NOT NULL,
    seo_hindi_description TEXT NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS b2b_gem_dispatches (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(64) REFERENCES artisan_product_catalogs(product_id),
    buyer_type VARCHAR(64) NOT NULL, -- GeM, Corporate Gifting, Export
    order_quantity INTEGER NOT NULL,
    total_artisan_payout NUMERIC(12, 2) NOT NULL,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
