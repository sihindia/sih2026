-- =========================================================================
-- DOLR DRISHTIPREDICT 360 DATABASE SCHEMA (SIH26017)
-- Ministry of Rural Development - Department of Land Resources (DoLR)
-- =========================================================================

CREATE TABLE IF NOT EXISTS land_delay_predictions (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(64) UNIQUE NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    state VARCHAR(64) NOT NULL,
    district VARCHAR(128) NOT NULL,
    requiring_agency VARCHAR(128) NOT NULL,
    notified_area_ha NUMERIC(10, 2) NOT NULL,
    delay_risk_pct NUMERIC(5, 2) NOT NULL,
    predicted_slip_months NUMERIC(4, 2) NOT NULL,
    primary_bottleneck TEXT NOT NULL,
    shap_litigation_impact NUMERIC(4, 2) NOT NULL,
    shap_compensation_impact NUMERIC(4, 2) NOT NULL,
    recommended_mitigation TEXT NOT NULL,
    alert_level VARCHAR(64) DEFAULT 'CRITICAL_EARLY_WARNING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
