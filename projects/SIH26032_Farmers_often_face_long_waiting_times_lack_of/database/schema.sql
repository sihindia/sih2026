-- =========================================================================
-- KISANSETU QUEUE 360 DATABASE SCHEMA (SIH26032)
-- Ministry of Consumer Affairs - DoCA
-- =========================================================================

CREATE TABLE IF NOT EXISTS mandi_centers (
    id SERIAL PRIMARY KEY,
    center_id VARCHAR(64) UNIQUE NOT NULL,
    center_name VARCHAR(255) NOT NULL,
    district_state VARCHAR(128) NOT NULL,
    primary_crop VARCHAR(128) NOT NULL,
    daily_intake_capacity VARCHAR(64) NOT NULL,
    current_truck_queue INTEGER NOT NULL,
    average_tat_mins VARCHAR(32) NOT NULL,
    status VARCHAR(64) DEFAULT 'OPERATIONAL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farmer_queue_tokens (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR(64) UNIQUE NOT NULL,
    farmer_name VARCHAR(128) NOT NULL,
    mobile_masked VARCHAR(32) NOT NULL,
    vehicle_number VARCHAR(32) NOT NULL,
    crop_name VARCHAR(128) NOT NULL,
    quantity_quintals NUMERIC(8, 2) NOT NULL,
    allotted_slot VARCHAR(64) NOT NULL,
    assigned_bay VARCHAR(32) NOT NULL,
    gate_entry_status VARCHAR(128) NOT NULL,
    current_step INTEGER NOT NULL,
    jform_number VARCHAR(64) UNIQUE NOT NULL,
    qr_pass_code VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
