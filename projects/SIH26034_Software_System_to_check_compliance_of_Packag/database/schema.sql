-- =========================================================================
-- NAAPTOL AI 360 DATABASE SCHEMA (SIH26034)
-- Ministry of Consumer Affairs - DoCA
-- =========================================================================

CREATE TABLE IF NOT EXISTS packaged_commodities (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(64) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    manufacturer_details TEXT NOT NULL,
    category VARCHAR(128) NOT NULL,
    pdp_area_cm2 VARCHAR(32) NOT NULL,
    declared_net_quantity VARCHAR(64) NOT NULL,
    mrp_declaration VARCHAR(128) NOT NULL,
    unit_sale_price VARCHAR(64) NOT NULL,
    measured_font_size VARCHAR(32) NOT NULL,
    status VARCHAR(64) DEFAULT 'FULLY_COMPLIANT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS statutory_show_cause_notices (
    id SERIAL PRIMARY KEY,
    notice_id VARCHAR(64) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    violation_sections TEXT NOT NULL,
    issuing_authority VARCHAR(255) NOT NULL,
    penalty_compounded VARCHAR(64) NOT NULL,
    status VARCHAR(64) DEFAULT 'NOTICE_SERVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
