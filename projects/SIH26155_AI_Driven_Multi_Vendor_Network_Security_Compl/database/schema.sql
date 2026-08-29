-- Supabase / PostgreSQL Schema for SIH26155 (AI-Driven Multi-Vendor Network Security Compliance Auditor)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Commodity Audit Batches
CREATE TABLE IF NOT EXISTS sih26155_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name VARCHAR(200) NOT NULL,
    manufacturer_name VARCHAR(200) NOT NULL,
    mrp_declared NUMERIC(10, 2) NOT NULL,
    mrp_tax_inclusive BOOLEAN NOT NULL DEFAULT TRUE,
    net_quantity VARCHAR(50) NOT NULL,
    is_standard_unit BOOLEAN NOT NULL DEFAULT TRUE,
    mfg_date DATE NOT NULL,
    consumer_care_declared BOOLEAN NOT NULL DEFAULT TRUE,
    is_compliant BOOLEAN NOT NULL,
    violations_json JSONB DEFAULT '[]'::jsonb,
    audited_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sih26155_audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Audits" ON sih26155_audits FOR SELECT USING (true);
CREATE POLICY "Public Insert Audits" ON sih26155_audits FOR INSERT WITH CHECK (true);
