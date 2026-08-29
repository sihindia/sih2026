-- Supabase / PostgreSQL Schema for SIH26157 (Supervisory Analytics Tool for SOC Assessment (SAT-SA))
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Operational Telemetry & Record Table
CREATE TABLE IF NOT EXISTS sih26157_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ps_number VARCHAR(20) DEFAULT 'SIH26157',
    entity_code VARCHAR(100) NOT NULL,
    metric_score NUMERIC(10, 3) NOT NULL,
    risk_category VARCHAR(30) DEFAULT 'NORMAL',
    metadata JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Audit & Verification Trail
CREATE TABLE IF NOT EXISTS sih26157_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_id UUID REFERENCES sih26157_records(id) ON DELETE CASCADE,
    action_taken VARCHAR(100) NOT NULL,
    performed_by VARCHAR(100) DEFAULT 'System Automated AI Engine',
    confidence NUMERIC(5, 3) DEFAULT 0.965,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sih26157_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE sih26157_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Records" ON sih26157_records FOR SELECT USING (true);
CREATE POLICY "Public Insert Records" ON sih26157_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Audits" ON sih26157_audit_logs FOR SELECT USING (true);
