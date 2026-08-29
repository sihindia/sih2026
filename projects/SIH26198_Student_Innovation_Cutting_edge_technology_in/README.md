# SIH26198: Student Innovation-Cutting-edge technology in these sectors continues to be in demand. Recent shifts in healthcare trends, growing populations also present an array of opportunities for innovation.

> **Ministry / Organization:** AICTE  
> **Theme:** MedTech / BioTech / HealthTech  
> **Category:** Software  
> **Platform:** Smart India Hackathon 2026  
> **Hosting Cost:** $0.00 (100% Free-Tier Architecture)

---

## 📁 Standalone Project Architecture
```
SIH26198_Student_Innovation_Cutting_edge_technology_in/
├── backend/
│   ├── main.py              # FastAPI Python Microservice
│   ├── requirements.txt     # Python Dependencies
│   └── Dockerfile           # Free Container Deployment
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
├── docker-compose.yml       # Local 1-Click Multi-Container Dev
├── .env.example             # Free Credentials Template
└── README.md                # Documentation & Setup Guide
```

---

## 🚀 How to Setup & Run Locally (3 Steps)

### Step 1: Start Backend API (Terminal 1)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*Backend Swagger Docs will be live at: [http://localhost:8000/docs](http://localhost:8000/docs)*

### Step 2: Start Frontend Application (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
*Frontend User Interface will be live at: [http://localhost:5173](http://localhost:5173)*

### Step 3: Setup Free Supabase PostgreSQL Database
1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. Open the **SQL Editor**, paste the contents of `database/schema.sql`, and click **RUN**.
3. Copy your project connection string into your `.env` file.

---

## ☁️ 100% Free Cloud Deployment
- **Frontend:** Deploy to **Vercel / Cloudflare Pages** (Connect GitHub → Auto deploy).
- **Backend:** Deploy to **Render.com** (Free Web Service).
- **Database:** Hosted on **Supabase** (500MB Free PostgreSQL cluster).
