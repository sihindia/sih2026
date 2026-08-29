-- Supabase / PostgreSQL Schema for SIH26046 (AIIA Clinical Trials Dashboard - a real-time, cloud-based, GCP-compliant Clinical Trial Management System (CTMS) for Ayurveda research, with CDISC/FHIR-interoperable data, role-based KPIs, and integrated ethics, regulatory (CTRI / NDCT Rules 2019) and pharma covigilance tracking.)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Operational Telemetry & Record Table
CREATE TABLE IF NOT EXISTS sih26046_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ps_number VARCHAR(20) DEFAULT 'SIH26046',
    entity_code VARCHAR(100) NOT NULL,
    metric_score NUMERIC(10, 3) NOT NULL,
    risk_category VARCHAR(30) DEFAULT 'NORMAL',
    metadata JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Audit & Verification Trail
CREATE TABLE IF NOT EXISTS sih26046_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_id UUID REFERENCES sih26046_records(id) ON DELETE CASCADE,
    action_taken VARCHAR(100) NOT NULL,
    performed_by VARCHAR(100) DEFAULT 'System Automated AI Engine',
    confidence NUMERIC(5, 3) DEFAULT 0.965,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sih26046_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE sih26046_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Records" ON sih26046_records FOR SELECT USING (true);
CREATE POLICY "Public Insert Records" ON sih26046_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Audits" ON sih26046_audit_logs FOR SELECT USING (true);
