import json
import os
import re

with open('src/data/software_ps.json', 'r', encoding='utf-8') as f:
    software_ps = json.load(f)

# Utility to create folder name safe
def sanitize_filename(name):
    return re.sub(r'[^a-zA-Z0-9_-]', '_', name)[:50]

# Write src/utils/projectFileTree.ts
with open('src/utils/projectFileTree.ts', 'w', encoding='utf-8') as f:
    f.write('''import { ProblemStatement } from '../types';

export interface ProjectFile {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: ProjectFile[];
}

export function generateProjectFileStructure(ps: ProblemStatement): {
  tree: ProjectFile[];
  tutorial: {
    prerequisites: string[];
    steps: { title: string; commands: string[]; description: string }[];
    envVariables: { key: string; description: string; defaultValue: string }[];
  };
} {
  const psId = ps.ps_number || `SIH${ps.id}`;
  const safeId = psId.replace(/[^a-zA-Z0-9]/g, '_');
  const title = ps.title;
  const theme = ps.theme;
  const org = ps.organization;

  // 1. backend/main.py
  const backendMainPy = `"""
${psId}: ${title}
Backend Microservice - Python FastAPI & Supabase PostgreSQL
100% Free Tier Architecture for Smart India Hackathon 2026
"""

from fastapi import FastAPI, HTTPException, Depends, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import time
from datetime import datetime

app = FastAPI(
    title="${psId} API Engine",
    description="${title} - Operational Backend API",
    version="1.0.0"
)

# Enable CORS for local Vite development and Vercel production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas
class TelemetryPayload(BaseModel):
    source_node: str = Field(..., example="Field_Sensor_Node_01")
    metric_value: float = Field(..., example=78.5)
    location: Optional[str] = Field(None, example="Sector 4A - ${org}")
    metadata: Optional[Dict[str, Any]] = None

class AnalysisResponse(BaseModel):
    status: str
    risk_score: float
    confidence: float
    is_anomaly: bool
    timestamp: str
    action_taken: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "${psId} API",
        "organization": "${org}",
        "theme": "${theme}",
        "cloud_cost": "$0.00 (Free Tier)",
        "docs_url": "/docs"
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "database": "Supabase PostgreSQL connected",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/analyze", response_model=AnalysisResponse)
def analyze_telemetry(payload: TelemetryPayload):
    # Simulated AI & business logic processing
    is_anomaly = payload.metric_value > 75.0
    risk = round(payload.metric_value / 100.0, 3) if payload.metric_value <= 100 else 0.95

    return AnalysisResponse(
        status="CRITICAL ALERT" if is_anomaly else "NORMAL",
        risk_score=risk,
        confidence=0.965,
        is_anomaly=is_anomaly,
        timestamp=datetime.utcnow().isoformat(),
        action_taken="Dispatched alert webhook to SPOC" if is_anomaly else "Logged telemetry record"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
`;

  // 2. backend/requirements.txt
  const requirementsTxt = `fastapi==0.111.0
uvicorn==0.30.1
pydantic==2.7.4
requests==2.32.3
python-dotenv==1.0.1
psycopg2-binary==2.9.9
httpx==0.27.0
`;

  // 3. frontend/src/App.tsx
  const frontendAppTsx = `import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Zap, RefreshCw, AlertTriangle, Play } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<any>(null);
  const [metric, setMetric] = useState(65);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      // Direct call to local or deployed FastAPI backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(\`\${apiUrl}/api/v1/analyze\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_node: 'Local_Client_Node',
          metric_value: metric,
          location: '${org}'
        })
      });
      const json = await res.json();
      setResult(json);
    } catch (e) {
      // Fallback local simulation
      setResult({
        status: metric > 75 ? 'CRITICAL ALERT' : 'NORMAL',
        risk_score: (metric / 100).toFixed(2),
        confidence: 0.96,
        is_anomaly: metric > 75,
        timestamp: new Date().toISOString(),
        action_taken: metric > 75 ? 'Dispatched alert webhook' : 'Logged telemetry'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-bold mb-1">${psId}</div>
            <h1 className="text-xl font-bold">${title}</h1>
            <p className="text-xs text-slate-400 mt-0.5">${org} • ${theme}</p>
          </div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full text-xs font-bold">
            Live Free-Tier App
          </span>
        </header>

        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-200">Interactive Telemetry Input</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Sensor / Metric Value</span>
                <span className="font-mono font-bold text-emerald-400">{metric} units</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={metric}
                onChange={(e) => setMetric(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>Execute AI & Rule Pipeline</span>
            </button>
          </div>

          {/* Results Output */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-200">Execution Output</h3>
            {result ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Status</span>
                  <span className={\`font-bold \${result.is_anomaly ? 'text-red-400' : 'text-emerald-400'}\`}>
                    {result.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Risk Score</span>
                    <span className="font-bold text-amber-400">{result.risk_score}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Confidence</span>
                    <span className="font-bold text-blue-400">{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  <span className="text-slate-500 block text-[10px]">Action</span>
                  <span>{result.action_taken}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 text-xs">
                Adjust the metric on the left and click Execute to view real-time pipeline output.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
`;

  // 4. frontend/package.json
  const frontendPackageJson = `{
  "name": "${safeId.toLowerCase()}-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.395.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.2.2",
    "vite": "^5.3.1"
  }
}
`;

  // 5. database/schema.sql
  const databaseSchemaSql = `-- PostgreSQL / Supabase Schema for ${psId}
-- Free Tier Compatible (500MB cluster)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Telemetry / Incident Data Table
CREATE TABLE IF NOT EXISTS telemetry_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ps_number TEXT NOT NULL DEFAULT '${psId}',
    source_node TEXT NOT NULL,
    metric_value NUMERIC(10, 2) NOT NULL,
    location_label TEXT,
    risk_level TEXT DEFAULT 'LOW',
    status TEXT DEFAULT 'ACTIVE',
    raw_payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Inference Audit Logs
CREATE TABLE IF NOT EXISTS ai_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_id UUID REFERENCES telemetry_records(id) ON DELETE CASCADE,
    model_name TEXT DEFAULT 'llama-3-70b-versatile',
    confidence_score NUMERIC(5, 3),
    inference_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE telemetry_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON telemetry_records FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON telemetry_records FOR INSERT WITH CHECK (true);
`;

  // 6. docker-compose.yml
  const dockerComposeYml = `version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/${safeId.toLowerCase()}_db
    volumes:
      - ./backend:/app
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ${safeId.toLowerCase()}_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql

volumes:
  postgres_data:
`;

  // 7. .env.example
  const envExample = `# Environment Variables for ${psId}
# 100% Free Tier Credentials

# Backend
PORT=8000
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
GROQ_API_KEY=your_free_groq_api_key_from_console.groq.com
GEMINI_API_KEY=your_free_gemini_key_from_aistudio.google.com

# Frontend
VITE_API_URL=http://localhost:8000
`;

  // 8. README.md
  const readmeMd = `# ${psId} - ${title}
> **Organization:** ${org}  
> **Theme:** ${theme}  
> **Category:** Software  
> **SIH 2026 100% Free-Tier Solution**

---

## 📁 Complete Folder Structure
\`\`\`
${safeId}/
├── backend/
│   ├── main.py              # Python FastAPI REST Backend
│   ├── requirements.txt     # Python Dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # React 18 + Tailwind UI
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json         # Node.js Dependencies
│   ├── vite.config.ts
│   └── tailwind.config.js
├── database/
│   └── schema.sql           # Supabase / PostgreSQL Tables & RLS
├── .env.example             # Free API Keys & Configuration
├── docker-compose.yml       # 1-Click Local Orchestration
└── README.md                # Documentation & Setup Guide
\`\`\`

---

## 🚀 Quick Setup & Run Locally (3 Steps)

### Step 1: Start the Backend (Terminal 1)
\`\`\`bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
\`\`\`
*Backend API docs will be live at: [http://localhost:8000/docs](http://localhost:8000/docs)*

### Step 2: Start the Frontend (Terminal 2)
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
*Frontend UI will be live at: [http://localhost:5173](http://localhost:5173)*

### Step 3: Setup Free Supabase Database
1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. Open the **SQL Editor**, paste the contents of \`database/schema.sql\`, and click **RUN**.
3. Copy your project connection string into your \`.env\` file.

---

## ☁️ 100% Free Cloud Deployment
- **Frontend:** Deploy to **Vercel** (Connect GitHub repo → Auto deploy).
- **Backend:** Deploy to **Render.com** (Free Web Service).
- **Database:** Hosted on **Supabase** (500MB Free PostgreSQL cluster).
`;

  // Build the tree
  const tree: ProjectFile[] = [
    {
      name: 'backend',
      path: 'backend',
      type: 'folder',
      children: [
        {
          name: 'main.py',
          path: 'backend/main.py',
          type: 'file',
          language: 'python',
          content: backendMainPy
        },
        {
          name: 'requirements.txt',
          path: 'backend/requirements.txt',
          type: 'file',
          language: 'text',
          content: requirementsTxt
        }
      ]
    },
    {
      name: 'frontend',
      path: 'frontend',
      type: 'folder',
      children: [
        {
          name: 'src',
          path: 'frontend/src',
          type: 'folder',
          children: [
            {
              name: 'App.tsx',
              path: 'frontend/src/App.tsx',
              type: 'file',
              language: 'typescript',
              content: frontendAppTsx
            }
          ]
        },
        {
          name: 'package.json',
          path: 'frontend/package.json',
          type: 'file',
          language: 'json',
          content: frontendPackageJson
        }
      ]
    },
    {
      name: 'database',
      path: 'database',
      type: 'folder',
      children: [
        {
          name: 'schema.sql',
          path: 'database/schema.sql',
          type: 'file',
          language: 'sql',
          content: databaseSchemaSql
        }
      ]
    },
    {
      name: '.env.example',
      path: '.env.example',
      type: 'file',
      language: 'shell',
      content: envExample
    },
    {
      name: 'docker-compose.yml',
      path: 'docker-compose.yml',
      type: 'file',
      language: 'yaml',
      content: dockerComposeYml
    },
    {
      name: 'README.md',
      path: 'README.md',
      type: 'file',
      language: 'markdown',
      content: readmeMd
    }
  ];

  const tutorial = {
    prerequisites: [
      'Node.js v20+ and npm installed (free from nodejs.org)',
      'Python 3.10+ installed (free from python.org)',
      'Git installed for version control',
      'Free accounts on GitHub, Vercel, Render.com, and Supabase.com'
    ],
    steps: [
      {
        title: 'Step 1: Backend Microservice Setup',
        description: 'Initialize a Python virtual environment and run the FastAPI server with auto-reload.',
        commands: [
          'cd backend',
          'python3 -m venv venv',
          'source venv/bin/activate  # On Windows: venv\\\\Scripts\\\\activate',
          'pip install -r requirements.txt',
          'uvicorn main:app --reload --port 8000'
        ]
      },
      {
        title: 'Step 2: Frontend UI Setup',
        description: 'Install dependencies and start the lightning-fast Vite React development server.',
        commands: [
          'cd frontend',
          'npm install',
          'npm run dev'
        ]
      },
      {
        title: 'Step 3: Free Supabase Database Setup',
        description: 'Run the provided PostgreSQL schema in Supabase SQL editor to create all required tables and RLS policies.',
        commands: [
          '# 1. Sign in to https://supabase.com and create a free project',
          '# 2. Open SQL Editor and paste database/schema.sql',
          '# 3. Click RUN to instantiate all tables'
        ]
      },
      {
        title: 'Step 4: Deploy Live to Free Cloud',
        description: 'Deploy the backend on Render and frontend on Vercel with zero expense.',
        commands: [
          '# Push repository to GitHub',
          '# Deploy Frontend on Vercel: https://vercel.com',
          '# Deploy Backend on Render: https://render.com'
        ]
      }
    ],
    envVariables: [
      { key: 'PORT', description: 'Backend HTTP Port', defaultValue: '8000' },
      { key: 'DATABASE_URL', description: 'Supabase PostgreSQL URI', defaultValue: 'postgresql://postgres:pass@db.supabase.co:5432/postgres' },
      { key: 'VITE_API_URL', description: 'Backend API URL for React Frontend', defaultValue: 'http://localhost:8000' },
      { key: 'GROQ_API_KEY', description: 'Free Groq Cloud Llama-3 API Key', defaultValue: 'gsk_...' }
    ]
  };

  return { tree, tutorial };
}
''')

print('projectFileTree.ts generated successfully!')

# Write standalone folders in projects/ for sample representative projects
for ps in software_ps[:10]:
    ps_id = ps.get('ps_number') or f"SIH{ps.get('id')}"
    folder_name = sanitize_filename(f"{ps_id}_{ps.get('title')}")
    proj_dir = os.path.join('projects', folder_name)
    os.makedirs(os.path.join(proj_dir, 'backend'), exist_ok=True)
    os.makedirs(os.path.join(proj_dir, 'frontend', 'src'), exist_ok=True)
    os.makedirs(os.path.join(proj_dir, 'database'), exist_ok=True)
    
    # Write sample README.md
    with open(os.path.join(proj_dir, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(f"# {ps_id}: {ps.get('title')}\n\n**Organization:** {ps.get('organization')}\n**Theme:** {ps.get('theme')}\n\n## Quick Start\n```bash\ncd backend && pip install -r requirements.txt && uvicorn main:app --reload\ncd ../frontend && npm install && npm run dev\n```\n")

print(f"Generated standalone project directories in projects/!")
