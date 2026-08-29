-- Supabase / PostgreSQL Schema for SIH26014 (An lntegrated GIS-based Digital Public lnfrastructure for Land Governance)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Cadastral Land Parcels
CREATE TABLE IF NOT EXISTS sih26014_parcels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ulpin_code VARCHAR(14) UNIQUE NOT NULL,
    state_code VARCHAR(10) DEFAULT 'JH',
    district_name VARCHAR(100) NOT NULL,
    village_name VARCHAR(100) NOT NULL,
    survey_area_sqm NUMERIC(12, 2) NOT NULL,
    geometry GEOMETRY(Polygon, 4326),
    land_type VARCHAR(50) DEFAULT 'Agricultural',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Ownership Title Records
CREATE TABLE IF NOT EXISTS sih26014_ownership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES sih26014_parcels(id) ON DELETE CASCADE,
    owner_name VARCHAR(200) NOT NULL,
    aadhaar_hash VARCHAR(64) NOT NULL,
    share_percentage NUMERIC(5, 2) DEFAULT 100.0,
    encumbrance_status VARCHAR(50) DEFAULT 'CLEAR',
    verified_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sih26014_parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE sih26014_ownership ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Parcels" ON sih26014_parcels FOR SELECT USING (true);
CREATE POLICY "Public Read Ownership" ON sih26014_ownership FOR SELECT USING (true);
