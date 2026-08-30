-- =========================================================================
-- MOES OCEANEMBED 360 DATABASE SCHEMA (SIH26066)
-- Ministry of Earth Sciences (MoES) - INCOIS Ocean Valley
-- =========================================================================

CREATE TABLE IF NOT EXISTS ocean_subsurface_reconstructions (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) UNIQUE NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    coordinates VARCHAR(64) NOT NULL,
    sst_celsius NUMERIC(4, 2) NOT NULL,
    sss_psu NUMERIC(4, 2) NOT NULL,
    sea_level_anomaly_cm NUMERIC(5, 2) NOT NULL,
    wind_stress_mps NUMERIC(4, 2) NOT NULL,
    isotherm_d26_depth_m NUMERIC(5, 1) NOT NULL,
    tchp_kj_cm2 NUMERIC(6, 1) NOT NULL,
    argo_validation_rmse_c NUMERIC(4, 3) NOT NULL,
    reconstruction_status VARCHAR(64) DEFAULT 'CYCLONE_FUEL_WARM_CORE_DETECTED',
    reconstructed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subsurface_depth_layers (
    id SERIAL PRIMARY KEY,
    case_id VARCHAR(64) REFERENCES ocean_subsurface_reconstructions(case_id),
    depth_meters INTEGER NOT NULL,
    temperature_celsius NUMERIC(5, 2) NOT NULL,
    argo_reference_temp_celsius NUMERIC(5, 2) NOT NULL,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
