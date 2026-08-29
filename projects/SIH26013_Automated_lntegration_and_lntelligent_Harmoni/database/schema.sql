-- Supabase / PostgreSQL Schema for SIH26013 (Automated lntegration and lntelligent Harmonization of Multi-source Geospatial Data for urban Land Record Management.)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Cadastral Land Parcels
CREATE TABLE IF NOT EXISTS sih26013_parcels (
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
CREATE TABLE IF NOT EXISTS sih26013_ownership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES sih26013_parcels(id) ON DELETE CASCADE,
    owner_name VARCHAR(200) NOT NULL,
    aadhaar_hash VARCHAR(64) NOT NULL,
    share_percentage NUMERIC(5, 2) DEFAULT 100.0,
    encumbrance_status VARCHAR(50) DEFAULT 'CLEAR',
    verified_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sih26013_parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE sih26013_ownership ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Parcels" ON sih26013_parcels FOR SELECT USING (true);
CREATE POLICY "Public Read Ownership" ON sih26013_ownership FOR SELECT USING (true);
