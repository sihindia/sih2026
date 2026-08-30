-- =========================================================================
-- DRDO GARUDATWIN 360 DATABASE SCHEMA (SIH26054)
-- DRDO - Department of Defence Production / iDEX
-- =========================================================================

CREATE TABLE IF NOT EXISTS uav_engine_digital_twin_missions (
    id SERIAL PRIMARY KEY,
    mission_id VARCHAR(64) UNIQUE NOT NULL,
    uav_platform VARCHAR(255) NOT NULL,
    operational_theatre TEXT NOT NULL,
    aero_piston_engine VARCHAR(255) NOT NULL,
    telemetry_stream TEXT NOT NULL,
    engine_state TEXT NOT NULL,
    digital_twin_assessment TEXT NOT NULL,
    predicted_rul_hours NUMERIC(6, 2) NOT NULL,
    pinn_anomaly_confidence NUMERIC(4, 1) NOT NULL,
    maintenance_advisory TEXT NOT NULL,
    mission_risk_level VARCHAR(64) DEFAULT 'LOW_SAFE_OPERATING_ENVELOPE',
    twin_status VARCHAR(64) DEFAULT 'TWIN_SYNCHRONIZED_HEALTH_OPTIMAL',
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS engine_realtime_telemetry_frames (
    id SERIAL PRIMARY KEY,
    mission_id VARCHAR(64) REFERENCES uav_engine_digital_twin_missions(mission_id),
    engine_rpm INTEGER NOT NULL,
    avg_cht_c NUMERIC(5, 2) NOT NULL,
    avg_egt_c NUMERIC(5, 2) NOT NULL,
    oil_pressure_bar NUMERIC(4, 2) NOT NULL,
    oil_temperature_c NUMERIC(5, 2) NOT NULL,
    vibration_rms_g NUMERIC(4, 2) NOT NULL,
    fuel_flow_l_h NUMERIC(5, 2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
