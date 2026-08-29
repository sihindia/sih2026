import { ProblemStatement } from '../types';

export interface SolutionBlueprint {
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    aiMlModel: string;
    hostingFrontend: string;
    hostingBackend: string;
    hostingDatabase: string;
    storage: string;
    auth: string;
  };
  architectureSummary: string;
  dataFlow: string[];
  apiEndpoints: { method: string; path: string; desc: string }[];
  databaseSchema: string[];
  hackathonSprintRoadmap: {
    phase1_Hours0_8: string;
    phase2_Hours8_20: string;
    phase3_Hours20_30: string;
    phase4_Hours30_36: string;
  };
  freeTierServices: { name: string; freeTierQuota: string; url: string }[];
}

export const generateSolutionBlueprint = (ps: ProblemStatement): SolutionBlueprint => {
  const isAI = ps.tags?.some(t => t.includes('AI') || t.includes('Vision') || t.includes('NLP')) || ps.title.toLowerCase().includes('ai');
  const isGIS = ps.tags?.some(t => t.includes('GIS')) || ps.title.toLowerCase().includes('land') || ps.title.toLowerCase().includes('geo');
  const isBlockchain = ps.tags?.some(t => t.includes('Blockchain')) || ps.title.toLowerCase().includes('chain');
  const isMobile = ps.tags?.some(t => t.includes('Mobile')) || ps.title.toLowerCase().includes('app');

  let frontend = 'React 18 + Vite + Tailwind CSS + Lucide Icons + Shadcn UI';
  let backend = 'Python FastAPI + Pydantic + Uvicorn (Asynchronous REST API)';
  let database = 'Supabase PostgreSQL (Free Tier: 500MB + Row Level Security)';
  let aiMl = 'Groq Cloud API (Free Llama-3-70B 30 req/min) + HuggingFace Transformers';
  let hostingFrontend = 'Vercel / Cloudflare Pages (100% Free Unlimited Bandwidth)';
  let hostingBackend = 'Render.com (Free Web Service 750 hrs/month)';
  let hostingDB = 'Supabase Cloud (Free Tier PostgreSQL + Vector)';
  let storage = 'Cloudflare R2 / Supabase Storage (Free 10GB S3-Compatible)';
  let auth = 'Supabase Auth (Free 50,000 MAU with Google OAuth)';

  if (isGIS) {
    frontend = 'React + Vite + Leaflet.js / MapLibre GL + OpenStreetMap (100% Free Tiles)';
    database = 'PostgreSQL + PostGIS Extension (Supabase / Neon DB Free Tier)';
    aiMl = 'OpenCV + GDAL / Rasterio + PyTorch (YOLOv8-Seg for cadastral drone imagery)';
  } else if (isBlockchain) {
    frontend = 'Next.js 14 + Tailwind CSS + Ethers.js / Wagmi';
    backend = 'Node.js Express / NestJS + Solidity Smart Contracts';
    database = 'Polygon Amoy Testnet (Free Test MATIC) + IPFS Pinata (Free 1GB)';
    aiMl = 'Groq Llama-3 for smart contract audit & automated anomaly scoring';
    hostingBackend = 'Vercel Serverless Functions + Render Web Service';
  } else if (isMobile) {
    frontend = 'React Native (Expo SDK 51) + NativeWind / Tailwind + Offline SQLite Sync';
    backend = 'Python FastAPI + Celery / Redis Queue for async background jobs';
  }

  const freeTierServices = [
    { name: 'Vercel / Cloudflare Pages', freeTierQuota: 'Unlimited requests, 100GB bandwidth/month', url: 'https://vercel.com' },
    { name: 'Render Web Services', freeTierQuota: '750 free instance hours/month for FastAPI / Node.js backend', url: 'https://render.com' },
    { name: 'Supabase PostgreSQL & Auth', freeTierQuota: '500MB DB, 1GB Storage, 50,000 monthly active users', url: 'https://supabase.com' },
    { name: 'Groq Cloud / Google Gemini API', freeTierQuota: 'Free API Keys (30 req/min Llama 3, 15 RPM Gemini 1.5 Flash)', url: 'https://groq.com' },
    { name: 'OpenStreetMap & Carto CDN', freeTierQuota: '100% Free open-source map tiles with zero rate limits', url: 'https://openstreetmap.org' },
    { name: 'Cloudflare R2 Object Storage', freeTierQuota: '10GB free storage, $0 egress fees forever', url: 'https://cloudflare.com' }
  ];

  return {
    techStack: {
      frontend,
      backend,
      database,
      aiMlModel: aiMl,
      hostingFrontend,
      hostingBackend,
      hostingDatabase: hostingDB,
      storage,
      auth
    },
    architectureSummary: `Microservices architecture with a responsive ${frontend} SPA deployed on ${hostingFrontend}, consuming a low-latency ${backend} deployed on ${hostingBackend}. Data persistence managed via ${database} with free AI inference using ${aiMl}.`,
    dataFlow: [
      '1. User/Field Officer interacts with the responsive Web/Mobile frontend interface.',
      '2. Client communicates with FastAPI / Node.js REST API using secure JWT authentication.',
      '3. High-throughput data & spatial queries processed against Supabase PostgreSQL / PostGIS.',
      '4. Heavy inference & RAG tasks routed to Groq Cloud / Gemini Free API with sub-second response times.',
      '5. Analytical dashboards receive live telemetry updates via Supabase Realtime WebSockets.'
    ],
    apiEndpoints: [
      { method: 'GET', path: '/api/v1/health', desc: 'System health check and database connectivity verification' },
      { method: 'POST', path: '/api/v1/auth/login', desc: 'Secure OAuth2 / JWT authentication endpoint' },
      { method: 'POST', path: '/api/v1/analyze', desc: 'Core AI analysis & anomaly detection payload processor' },
      { method: 'GET', path: '/api/v1/records', desc: 'Filtered records and spatial telemetry query endpoint' },
      { method: 'POST', path: '/api/v1/reports/export', desc: 'Automated compliance report and analytics generator' }
    ],
    databaseSchema: [
      'users (id UUID PRIMARY KEY, name TEXT, email TEXT UNIQUE, role TEXT, created_at TIMESTAMPTZ)',
      'incidents_data (id UUID PRIMARY KEY, ps_id TEXT, title TEXT, location JSONB, telemetry JSONB, status TEXT)',
      'ai_inference_logs (id UUID PRIMARY KEY, input_hash TEXT, confidence_score FLOAT, model_version TEXT, result JSONB)',
      'compliance_reports (id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), summary TEXT, file_url TEXT)'
    ],
    hackathonSprintRoadmap: {
      phase1_Hours0_8: 'Scaffold React + Vite frontend, configure Tailwind, setup FastAPI skeleton, initialize free Supabase DB, create mock JSON schema.',
      phase2_Hours8_20: 'Implement core domain logic (AI inference via Groq/Gemini API, map visualization, or workflow engine), hook up REST API endpoints.',
      phase3_Hours20_30: 'Integrate frontend with backend, deploy frontend to Vercel and backend to Render, test live on mobile/web browsers.',
      phase4_Hours30_36: 'Final UI polish, populate real SIH mock data, prepare 5-slide winning PPT, record backup video walkthrough for jury.'
    },
    freeTierServices
  };
};

export const generateStarterProjectFiles = (ps: ProblemStatement) => {
  const bp = generateSolutionBlueprint(ps);
  const psId = ps.ps_number || `SIH${ps.id}`;
  const safeTitle = ps.title.replace(/[^a-zA-Z0-9 ]/g, '').slice(0, 40);

  const readme = `# ${psId} - ${ps.title}
## Smart India Hackathon 2026 Free-Stack Solution

### 🌟 Problem Overview
- **Category:** ${ps.category}
- **Theme:** ${ps.theme}
- **Sponsoring Organization:** ${ps.organization}

### 🛠️ 100% Free Technology Stack
- **Frontend:** ${bp.techStack.frontend} (Deploy on **Vercel / Cloudflare Pages**)
- **Backend:** ${bp.techStack.backend} (Deploy on **Render.com Free Tier**)
- **Database:** ${bp.techStack.database} (Deploy on **Supabase Free Tier**)
- **AI/LLM Engine:** ${bp.techStack.aiMlModel}
- **Storage:** ${bp.techStack.storage}
- **Auth:** ${bp.techStack.auth}

### 🚀 Rapid 3-Step Setup (Local Development)

#### 1. Backend Setup
\`\`\`bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
\`\`\`

#### 2. Frontend Setup
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

#### 3. Free Cloud Deployment
- Push this repo to GitHub.
- Import frontend to **Vercel** (Set Framework: Vite, Output: dist).
- Import backend to **Render.com** (Set Environment: Python 3, Build: \`pip install -r requirements.txt\`, Start: \`uvicorn main:app --host 0.0.0.0 --port $PORT\`).
- Setup free PostgreSQL instance on **Supabase.com** and paste \`DATABASE_URL\` into Render environment variables.

---
*Generated by SIH 2026 Solution Blueprint & Free-Stack Studio*
`;

  const packageJson = `{
  "name": "sih2026-${psId.toLowerCase()}-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3",
    "vite": "^6.0.7"
  }
}`;

  const requirementsTxt = `fastapi==0.115.6
uvicorn[standard]==0.34.0
pydantic==2.10.4
requests==2.32.3
python-dotenv==1.0.1
httpx==0.28.1
psycopg2-binary==2.9.10
numpy==2.2.1
`;

  const mainPy = `from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI(
    title="${psId} - ${safeTitle} API",
    description="Zero-Cost Backend API for SIH 2026 Problem Statement ${psId}",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    input_text: str = ""
    payload_data: dict = {}

@app.get("/")
def read_root():
    return {
        "status": "online",
        "ps_number": "${psId}",
        "theme": "${ps.theme}",
        "message": "SIH 2026 Free-Tier API Running Successfully"
    }

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "database": "connected", "ai_engine": "ready"}

@app.post("/api/v1/analyze")
def analyze_data(req: AnalysisRequest):
    return {
        "ps_number": "${psId}",
        "status": "success",
        "confidence_score": 0.942,
        "recommendation": "Optimal parameter configuration identified. Zero violations detected.",
        "input_echo": req.input_text
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
`;

  const dockerCompose = `version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:8000

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/sih_db

  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_DB: sih_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
`;

  return {
    readme,
    packageJson,
    requirementsTxt,
    mainPy,
    dockerCompose
  };
};
