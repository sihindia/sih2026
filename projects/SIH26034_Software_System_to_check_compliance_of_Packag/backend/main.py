"""
SIH26034: Legal Metrology Packaged Commodities Compliance System (NaapTol AI 360)
Ministry of Consumer Affairs, Food & Public Distribution - DoCA
FastAPI Production Microservice for Packaging Label OCR, PDP Font Caliper & Notice Issuance
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
    title="NaapTol AI 360 Hub (SIH26034) - Ministry of Consumer Affairs",
    description="Software system to check compliance of packaged commodities under Legal Metrology Rules, 2011 by scanning labels & product images",
    version="3.0.0"
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

class AuditPackageRequest(BaseModel):
    product_id: str = Field("PROD-COOKIE", example="PROD-COOKIE")
    pdp_area_cm2: float = Field(180.0, example=180.0)
    measured_font_mm: float = Field(1.4, example=1.4)
    has_mrp_inclusive_taxes: bool = Field(False, example=False)
    has_unit_sale_price: bool = Field(False, example=False)
    has_standard_si_unit: bool = Field(True, example=True)

@app.get("/")
def read_root():
    return {
        "service": "NaapTol AI 360 Hub (SIH26034)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "department": "Department of Consumer Affairs (DoCA)",
        "statutory_act": "Legal Metrology Act, 2009 & Packaged Commodities Rules, 2011",
        "products_cataloged": len(load_json("packaged_commodities_audit_catalog.json")),
        "status": "online",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs": "/docs"
    }

@app.get("/api/v1/products")
def get_products():
    return load_json("packaged_commodities_audit_catalog.json")

@app.get("/api/v1/rules")
def get_rules():
    return load_json("legal_metrology_statutory_rules.json")

@app.get("/api/v1/notices")
def get_notices():
    return load_json("show_cause_statutory_notices.json")

@app.get("/api/v1/stats")
def get_stats():
    return load_json("naaptol_compliance_stats.json")

@app.post("/api/v1/audit-package")
def audit_package(req: AuditPackageRequest):
    min_font = 1.0 if req.pdp_area_cm2 <= 50 else (2.0 if req.pdp_area_cm2 <= 200 else (2.5 if req.pdp_area_cm2 <= 1000 else 4.0))
    violations = []
    if not req.has_mrp_inclusive_taxes: violations.append("Rule 6(1)(e): MRP lacks 'incl. of all taxes'")
    if not req.has_unit_sale_price: violations.append("Rule 6(1)(s): Unit Sale Price (USP) missing")
    if not req.has_standard_si_unit: violations.append("Rule 5: Non-standard SI unit symbol used")
    if req.measured_font_mm < min_font: violations.append(f"Rule 7: Font ({req.measured_font_mm}mm) is below minimum ({min_font}mm) for {req.pdp_area_cm2} cm² PDP")
    
    comp = len(violations) == 0
    fine = 0 if comp else len(violations) * 25000
    notice_id = f"SCN-DOCA-{random.randint(100, 999)}" if not comp else None
    
    return {
        "product_id": req.product_id,
        "is_compliant": comp,
        "minimum_mandatory_font_mm": min_font,
        "violations_detected": violations,
        "statutory_compounding_fine": f"₹{fine:,}" if not comp else "₹0",
        "generated_notice_id": notice_id,
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
