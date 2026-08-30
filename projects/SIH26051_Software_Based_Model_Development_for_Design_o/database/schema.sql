-- =========================================================================
-- DRDO HIMSURAKSHA 360 DATABASE SCHEMA (SIH26051)
-- DRDO - Department of Defence Production / iDEX
-- =========================================================================

CREATE TABLE IF NOT EXISTS high_altitude_shelter_simulations (
    id SERIAL PRIMARY KEY,
    simulation_id VARCHAR(64) UNIQUE NOT NULL,
    deployment_location VARCHAR(255) NOT NULL,
    ambient_climate TEXT NOT NULL,
    shelter_geometry VARCHAR(255) NOT NULL,
    envelope_materials TEXT NOT NULL,
    thermal_storage_system TEXT NOT NULL,
    openings_and_glazing TEXT NOT NULL,
    daytime_indoor_peak NUMERIC(4, 1) NOT NULL,
    nighttime_indoor_minimum NUMERIC(4, 1) NOT NULL,
    kerosene_fuel_saved_liters_yr NUMERIC(10, 1) NOT NULL,
    ansys_mesh_elements VARCHAR(128) NOT NULL,
    comfort_status VARCHAR(64) DEFAULT 'COMFORT_MAINTAINED_ZERO_FOSSIL_FUEL',
    simulated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS thermal_material_properties (
    id SERIAL PRIMARY KEY,
    material_name VARCHAR(128) UNIQUE NOT NULL,
    thermal_conductivity_w_mk NUMERIC(6, 4) NOT NULL,
    density_kg_m3 NUMERIC(8, 2) NOT NULL,
    specific_heat_j_kgk NUMERIC(8, 2) NOT NULL,
    latent_heat_kj_kg NUMERIC(8, 2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
