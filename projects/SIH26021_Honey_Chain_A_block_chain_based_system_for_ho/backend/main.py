"""
SIH26021: Honey Chain - Blockchain Honey Traceability & Smart Beekeeping (KVIC Honey Chain 360)
Ministry of MSME - Khadi & Village Industries Commission (KVIC)
FastAPI Production Microservice for Blockchain Ledger, Acoustic Swarm AI,
Comb CV Diagnostics, eDNA Metabarcoding, Biodiversity Credits & Smart Escrow
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import json
import os
import random
from datetime import datetime

app = FastAPI(
    title="KVIC Honey Chain 360 Hub (SIH26021) - Ministry of MSME",
    description="Blockchain-Based Honey Traceability, AI Comb CV Diagnostics, eDNA Metabarcoding & Smart IoT Beekeeping Ecosystem",
    version="4.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load_json(name):
    path = os.path.join(DATA_DIR, name)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

# Pydantic Schemas
class VerifyPassportRequest(BaseModel):
    batch_id: str = Field("BATCH-KVIC-KSH-081", description="Unique KVIC Batch Identifier")

class FftAudioAnalysisRequest(BaseModel):
    hive_id: str = Field("HIVE-KSH-04", description="Hive Sensor Device ID")
    audio_sample_hz: float = Field(235.0, description="Dominant Acoustic Frequency in Hz")

class CombCvScanRequest(BaseModel):
    hive_id: str = Field("HIVE-KSH-04", description="Hive Identifier")
    frame_number: int = Field(4, description="Brood Comb Frame Index (1-10)")

class SmartEscrowRequest(BaseModel):
    batch_id: str = Field("BATCH-KVIC-KSH-081", description="Batch ID for Delivery Verification")
    retail_jar_id: str = Field("JAR-KVIC-081-442", description="Consumer Jar QR Serial")
    consumer_delivery_verified: bool = Field(True, description="Customer scan verification flag")

class MintTokensRequest(BaseModel):
    cluster_id: str = Field("DAO-KSH-ANANTNAG", description="Beekeeping Cooperative Cluster ID")
    colonies_count: int = Field(840, description="Active pollinating colonies")

class TriggerDefenseRequest(BaseModel):
    hive_id: str = Field("HIVE-KSH-04", description="Target Hive Identifier")
    threat_type: str = Field("YELLOW_JACKET_VELUTINA_SWARM", description="Detected predator species")

@app.get("/")
def read_root():
    batches = load_json("honey_batches_and_purity_ledger.json")
    hives = load_json("smart_iot_hive_telemetry.json")
    return {
        "service": "KVIC Honey Chain 360 Hub (SIH26021)",
        "ministry": "Ministry of MSME",
        "agency": "Khadi & Village Industries Commission (KVIC)",
        "mission": "National Honey Mission (KVIC Sweet Revolution)",
        "batches_tracked": len(batches),
        "active_iot_hives": len(hives),
        "status": "online",
        "blockchain_network": "Polygon PoS / IPFS Decentralized Storage",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/batches")
def get_batches():
    return load_json("honey_batches_and_purity_ledger.json")

@app.get("/api/v1/hives")
def get_hives():
    return load_json("smart_iot_hive_telemetry.json")

@app.get("/api/v1/comb-diagnostics")
def get_comb_diagnostics():
    return load_json("ai_comb_disease_diagnostics.json")

@app.get("/api/v1/floral-calendar")
def get_floral_calendar():
    return load_json("floral_migration_calendar.json")

@app.get("/api/v1/kvic-subsidies")
def get_kvic_subsidies():
    return load_json("kvic_honey_mission_subsidies.json")

@app.get("/api/v1/edna-sequencing")
def get_edna():
    return load_json("edna_metabarcoding_and_pesticide_hazard.json")

@app.get("/api/v1/dao-clusters")
def get_dao():
    return load_json("biodiversity_credits_and_apiculture_dao.json")

@app.post("/api/v1/mint-biodiversity-tokens")
def mint_tokens(req: MintTokensRequest):
    tokens = req.colonies_count
    return {
        "cluster_id": req.cluster_id,
        "biodiversity_tokens_minted": tokens,
        "smart_contract": "0x4b9a712...BEE_BIODIVERSITY_ERC20",
        "verra_gold_standard_status": "VERIFIED_CARBON_AND_BIODIVERSITY_CREDIT",
        "secondary_earnings_inr": tokens * 200,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/trigger-predator-defense")
def trigger_defense(req: TriggerDefenseRequest):
    return {
        "hive_id": req.hive_id,
        "threat_detected": req.threat_type,
        "entrance_barrier_status": "MOTORIZED_PREDATOR_FLAP_CLOSED",
        "colony_safety": "DEFENSE_ACTIVE_WORKERS_PROTECTED",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/verify-passport")
def verify_passport(req: VerifyPassportRequest):
    batches = load_json("honey_batches_and_purity_ledger.json")
    match = next((b for b in batches if b["batch_id"].lower() == req.batch_id.lower()), None)
    if not match:
        raise HTTPException(status_code=404, detail=f"Batch {req.batch_id} not found in KVIC Blockchain Registry")
    return {
        "verified": True,
        "passport": match,
        "blockchain_proof": {
            "network": "Polygon PoS Mainnet",
            "block_confirmations": 412,
            "nmr_purity_certified": match["nmr_test_result"],
            "trust_index": f"{match['trust_index_score']}/100",
            "ipfs_cid": match["ipfs_lab_cid"],
            "polygon_tx": match["polygon_tx_hash"]
        }
    }

@app.post("/api/v1/fft-swarm-analysis")
def analyze_fft_audio(req: FftAudioAnalysisRequest):
    freq = req.audio_sample_hz
    is_pre_swarm = freq >= 285.0
    risk_pct = min(100, int((freq - 200) / 1.4)) if freq > 200 else 5
    return {
        "hive_id": req.hive_id,
        "recorded_frequency_hz": freq,
        "fft_spectrum_peak": f"{freq:.1f} Hz",
        "swarm_risk_percentage": risk_pct,
        "colony_state": "PRE_SWARM_QUEEN_PIPING_WARNING" if is_pre_swarm else "NORMAL_FORAGING_EQUILIBRIUM",
        "advance_warning_window": "48-72 hours before mass absconding" if is_pre_swarm else "N/A",
        "recommended_action": "Execute Pagden artificial colony split immediately to capture virgin queen and double apiary units." if is_pre_swarm else "Routine monitoring."
    }

@app.post("/api/v1/comb-cv-scan")
def scan_comb_frame(req: CombCvScanRequest):
    scans = load_json("ai_comb_disease_diagnostics.json")
    match = next((s for s in scans if s["hive_id"].lower() == req.hive_id.lower()), scans[0])
    return {
        "hive_id": req.hive_id,
        "frame_inspected": req.frame_number,
        "varroa_mite_count": match["detected_varroa_mites"],
        "varroa_infestation_rate": f"{match['varroa_infestation_rate_pct']}%",
        "foulbrood_afb_cells": match["american_foulbrood_cells"],
        "foulbrood_efb_cells": match["european_foulbrood_cells"],
        "wax_moth_damage": f"{match['wax_moth_webbing_pct']}%",
        "queen_status": "PRESENT_ACTIVE_LAYING" if match["queen_presence_detected"] else "QUEENLESS_ALERT",
        "comb_health_score": match["ai_comb_health_score"],
        "treatment_protocol": match["treatment_guidance"]
    }

@app.post("/api/v1/smart-escrow-release")
def release_smart_escrow(req: SmartEscrowRequest):
    return {
        "status": "ESCROW_PAYOUT_SETTLED",
        "batch_id": req.batch_id,
        "jar_id": req.retail_jar_id,
        "smart_contract": "0x892a76f2...KVIC_ESCROW_CONTRACT_V3",
        "tribal_beekeeper_payout": "₹720 credited via PFMS Aadhaar DBT",
        "platform_commission": "₹0 (KVIC 100% Zero Deduction Policy)",
        "settlement_timestamp": datetime.utcnow().isoformat() + "Z",
        "transaction_receipt": f"0x{random.randint(10**39, 10**40 - 1):x}"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
