-- =========================================================================
-- MOES SAMUDRA3D 360 DATABASE SCHEMA (SIH26067)
-- Ministry of Earth Sciences (MoES) - INCOIS Ocean Valley
-- =========================================================================

CREATE TABLE IF NOT EXISTS ocean_3d_model_scenes (
    id SERIAL PRIMARY KEY,
    scene_id VARCHAR(64) UNIQUE NOT NULL,
    scene_title VARCHAR(255) NOT NULL,
    theatre_domain VARCHAR(255) NOT NULL,
    numerical_model_source VARCHAR(128) NOT NULL,
    insitu_instruments_overlaid TEXT NOT NULL,
    rendered_isosurfaces TEXT NOT NULL,
    vector_flow_streamlines TEXT NOT NULL,
    vertical_exaggeration_factor VARCHAR(64) NOT NULL,
    model_vs_insitu_bias_c NUMERIC(4, 2) NOT NULL,
    rendering_fps INTEGER DEFAULT 60,
    webgl_engine_status VARCHAR(64) DEFAULT '3D_VOLUMETRIC_CO_VISUALIZATION_ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS insitu_instrument_markers (
    id SERIAL PRIMARY KEY,
    instrument_id VARCHAR(64) UNIQUE NOT NULL,
    instrument_type VARCHAR(64) NOT NULL,
    coordinates VARCHAR(64) NOT NULL,
    max_depth_meters INTEGER NOT NULL,
    sensors_equipped TEXT NOT NULL,
    status VARCHAR(64) NOT NULL,
    last_ping_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
