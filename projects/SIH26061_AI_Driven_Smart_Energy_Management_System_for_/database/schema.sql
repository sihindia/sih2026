-- =========================================================================
-- MOES DHRUVAURJA 360 DATABASE SCHEMA (SIH26061)
-- Ministry of Earth Sciences (MoES) - NCPOR Goa
-- =========================================================================

CREATE TABLE IF NOT EXISTS polar_energy_dispatch_logs (
    id SERIAL PRIMARY KEY,
    scenario_id VARCHAR(64) UNIQUE NOT NULL,
    station_name VARCHAR(255) NOT NULL,
    ambient_temperature_c NUMERIC(5, 2) NOT NULL,
    katabatic_wind_speed_kmh NUMERIC(5, 1) NOT NULL,
    solar_irradiance_wm2 NUMERIC(6, 1) NOT NULL,
    total_electric_demand_kw NUMERIC(6, 1) NOT NULL,
    total_thermal_demand_kw NUMERIC(6, 1) NOT NULL,
    wind_turbine_generation_kw NUMERIC(6, 1) NOT NULL,
    solar_pv_generation_kw NUMERIC(6, 1) NOT NULL,
    chp_heat_recovery_kw NUMERIC(6, 1) NOT NULL,
    diesel_burn_rate_lph NUMERIC(5, 2) NOT NULL,
    fuel_savings_pct NUMERIC(4, 1) NOT NULL,
    life_support_curtailment_pct NUMERIC(4, 1) DEFAULT 0.0,
    dispatch_verdict VARCHAR(64) DEFAULT 'MICROGRID_OPTIMAL_DISPATCH',
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS renewable_source_telemetry (
    id SERIAL PRIMARY KEY,
    scenario_id VARCHAR(64) REFERENCES polar_energy_dispatch_logs(scenario_id),
    source_name VARCHAR(64) NOT NULL,
    active_power_kw NUMERIC(6, 2) NOT NULL,
    state_of_charge_pct NUMERIC(4, 1) DEFAULT 100.0,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
