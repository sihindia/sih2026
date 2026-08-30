# 🇮🇳 Smart India Hackathon (SIH) 2026: Comprehensive Problem Statements Explorer & Full-Stack Applications Suite

[![SIH 2026 Live Portal](https://img.shields.io/badge/Live%20Portal-sih2026.flugelsoft.com-0B192C?style=for-the-badge&logo=google-chrome&logoColor=white)](https://sih2026.flugelsoft.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Vite 6](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript%20%7C%20Vite%206-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.10+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20%7C%20Navy%20Theme-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **A national-scale open-source developer platform built by Flugelsoft Labs featuring interactive working applications, production-ready zero-cost ($0.00) cloud architectures, and starter codebases for all 175 Software Category Problem Statements in Smart India Hackathon (SIH) 2026.**

---

## 📑 Table of Contents

1. [About Smart India Hackathon (SIH) 2026](#-about-smart-india-hackathon-sih-2026)
2. [Why SIH is Nationally & Academically Important](#-why-sih-is-nationally--academically-important)
3. [What This Platform Provides](#-what-this-platform-provides)
4. [Live Production & Local Access](#-live-production--local-access)
5. [Local Computer Setup (Quickstart)](#-local-computer-setup-quickstart)
   - [Frontend Explorer Setup](#1-frontend-explorer-setup)
   - [Launching Working Applications](#2-launching-working-applications)
   - [Backend Microservices Setup (FastAPI)](#3-backend-microservices-setup-fastapi)
6. [Server Deployment Guide (Ubuntu / Linux VPS)](#-server-deployment-guide-ubuntu--linux-vps)
   - [Production Build & Nginx Reverse Proxy](#option-a-production-build--nginx-reverse-proxy)
   - [Docker & Containerized Deployment](#option-b-docker--containerized-deployment)
7. [The 100% Zero-Cost ($0.00) Tech Stack Blueprint](#-the-100-zero-cost-000-tech-stack-blueprint)
8. [Repository Architecture & Directory Structure](#-repository-architecture--directory-structure)
9. [Featured Government of India Live Applications](#-featured-government-of-india-live-applications)
10. [Important Hackathon Dates & Official Links](#-important-hackathon-dates--official-links)
11. [Disclaimer & Intellectual Property](#-disclaimer--intellectual-property)

---

## 🏛️ About Smart India Hackathon (SIH) 2026

**Smart India Hackathon (SIH)** is the world’s largest open-innovation digital initiative, spearheaded jointly by the **Ministry of Education's Innovation Cell (MIC)** and the **All India Council for Technical Education (AICTE)**, Government of India.

SIH is a nationwide platform designed to crowdsource innovative, out-of-the-box digital and hardware solutions from college students across India to resolve pressing challenges faced by Central Ministries, State Government Departments, Public Sector Undertakings (PSUs), and premier private enterprises.

### Core Structure of SIH 2026:
* **Two Tracks**:
  * **Software Edition**: 175 real-world problem statements requiring web applications, mobile apps, artificial intelligence, machine learning, computer vision, blockchain, GIS mapping, and cybersecurity solutions.
  * **Hardware Edition**: 54 complex problem statements involving IoT, robotics, electronics, automation, and physical engineering prototypes.
* **National Reach**: Over 5,00,000+ student applicants across 3,000+ higher educational institutions in India.
* **Evaluation Matrix**: Idea submission evaluation $\rightarrow$ Internal college SPOC shortlisting $\rightarrow$ Regional nodal center Grand Finale with live hackathons (36 straight hours of non-stop coding).

---

## 💡 Why SIH is Nationally & Academically Important

### 1. For Students & Young Technologists
* **Real-World Impact**: Solutions are not toy classroom assignments; they address real national bottlenecks in Indian Railways safety, coal logistics, agricultural price stabilization, land records digitization, and disaster management.
* **Direct Interaction with Ministry Leadership**: Finalists pitch directly to Joint Secretaries, Chief Technology Officers, and domain scientists of participating Ministries and PSUs.
* **Seed Grants & Cash Awards**: National winners receive cash prizes of **₹1,00,000 per problem statement**, incubation support, and direct fast-track pathways for government procurement and startup grants.
* **Industry & Career Launchpad**: SIH finalists are actively recruited by top technology companies and tech consultancies for high-impact software engineering roles.

### 2. For Government Ministries & Viksit Bharat @ 2047
* **High-Velocity Digital Prototyping**: Empowers government bodies to evaluate bleeding-edge tech (computer vision, satellite remote sensing, edge-AI, blockchain) without lengthy multi-year vendor procurement cycles.
* **Democratizing Innovation**: Taps into the demographic dividend of young Indian engineers across tier-1, tier-2, and rural educational institutions.
* **Cost Efficiency**: Promotes self-reliance (*Atmanirbhar Bharat*) and open-source technological sovereignty.

### 3. For Colleges, Universities & Faculty SPOCs
* **NIRF & NAAC Acceleration**: Student participation and national hackathon achievements directly enhance NIRF rankings, NBA accreditations, and NAAC institutional scores.
* **Hands-on Developer Culture**: Cultivates agile full-stack engineering practices, version control hygiene, API integration skills, and modern cloud deployment methodologies.

---

## 🚀 What This Platform Provides

This repository is an all-in-one companion built by **Flugelsoft Labs** to accelerate the development lifecycle of SIH 2026 participants:

* 🔎 **175 Software Problem Statements Explorer**: Real-time multi-facet filtering by ministry, theme, technology domain, and keywords.
* ⚡ **Live Interactive Prototypes**: In-browser working applications with visual simulations, telemetry radars, optical inspectors, and algorithmic solvers.
* 🏛️ **Government of India Navy Blue & White Theme**: Professional, high-contrast, accessible UI compliant with modern GovTech standards.
* 📦 **Individual Microservices for Problem Statements**: Complete standalone project directories containing FastAPI backends, mock datasets, requirements, and Dockerfiles.
* 📜 **Step-by-Step Setup Guides**: In-depth tutorials explaining how to run, modify, and deploy every project on $0.00 free-tier cloud infrastructure.

---

## 🌐 Live Production & Local Access

| Resource | Canonical URL | Description |
| :--- | :--- | :--- |
| **Official Production Deployment** | [https://sih2026.flugelsoft.com/](https://sih2026.flugelsoft.com/) | Live public portal with all 175 explorer views |
| **Local Development Server** | `http://localhost:5180/` | Local Vite development workspace |
| **Official SIH Portal** | [https://sih.gov.in/sih2026PS](https://sih.gov.in/sih2026PS) | National Ministry portal for team registrations |

---

## 💻 Local Computer Setup (Quickstart)

### System Prerequisites
Ensure your computer has the following installed:
* **Node.js**: v18.0.0 or v20.x+ ([Download Node.js](https://nodejs.org/))
* **npm**: v9.x+ or v10.x+
* **Python**: v3.10.x, v3.11.x, or v3.12.x ([Download Python](https://www.python.org/))
* **Git**: ([Download Git](https://git-scm.com/))

---

### 1. Frontend Explorer Setup

Clone the repository to your local machine:
```bash
# Clone the repository
git clone https://github.com/sihindia/sih2026.git

# Navigate into the project directory
cd sih2026

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will start immediately. Open your browser and navigate to:
```
http://localhost:5180/
```
*(If port 5180 is occupied, Vite will automatically select port 5173 or the next open port).*

---

### 2. Launching Working Applications

You can launch live full-stack working prototypes directly through:
1. **The Web UI**: Browse any problem statement card and click the **"⚡ Launch App"** button.
2. **Direct URL Query Parameter**:
   ```
   http://localhost:5180/?app=SIH26031
   ```
3. **Search-Friendly SEO Route**:
   ```
   http://localhost:5180/ps/sih26031-quality-assessment-and-grading-of-onions-are-often-subjective-and-vary-across-procurement-centers-resulting-in-disputes-and-inconsistencies
   ```

---

### 3. Backend Microservices Setup (FastAPI)

Every problem statement has a self-contained backend service located under the `projects/` directory.

To run an individual backend microservice (for example, **SIH26031: Onion Quality Assessment & Caliper Vision**):

```bash
# Navigate to the specific project backend folder
cd projects/SIH26031_Quality_assessment_and_grading_of_onions_are_/backend

# Create an isolated Python virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS / Linux:
source venv/bin/activate
# On Windows (Command Prompt / PowerShell):
venv\Scripts\activate

# Install Python requirements
pip install -r requirements.txt

# Start the FastAPI Uvicorn ASGI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Interactive API Documentation
Once running, open your browser to interact with the live REST APIs:
* **Interactive Swagger UI**: `http://localhost:8000/docs`
* **ReDoc Documentation**: `http://localhost:8000/redoc`

---

## 🖥️ Server Deployment Guide (Ubuntu / Linux VPS)

To deploy the SIH 2026 platform on a remote cloud server (DigitalOcean Droplet, AWS EC2, Hetzner, or Linode Ubuntu 22.04 / 24.04 LTS):

### Option A: Production Build & Nginx Reverse Proxy

#### Step 1: Install System Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx python3-pip python3-venv
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Step 2: Build the Frontend Static Assets
```bash
cd /var/www/sih2026
npm install
npm run build
# The optimized production files will be generated in /var/www/sih2026/dist
```

#### Step 3: Run the FastAPI Backend with Systemd
Create a systemd service file:
```bash
sudo nano /etc/systemd/system/sih-backend.service
```

Paste the following configuration:
```ini
[Unit]
Description=SIH 2026 FastAPI Microservice
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/var/www/sih2026/projects/SIH26031_Quality_assessment_and_grading_of_onions_are_/backend
ExecStart=/var/www/sih2026/projects/SIH26031_Quality_assessment_and_grading_of_onions_are_/backend/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable sih-backend
sudo systemctl start sih-backend
```

#### Step 4: Configure Nginx Reverse Proxy
```bash
sudo nano /etc/nginx/sites-available/sih2026
```

Paste the Nginx server block:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/sih2026/dist;
    index index.html;

    # Frontend Single Page App routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Reverse proxy API requests to FastAPI backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/sih2026 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Option B: Docker & Containerized Deployment

Each project contains a lightweight `Dockerfile` for single-command containerization:

```bash
# Build the Docker image
cd projects/SIH26031_Quality_assessment_and_grading_of_onions_are_/backend
docker build -t sih26031-backend:latest .

# Run the container in detached mode
docker run -d -p 8000:8000 --name sih-onion-api sih26031-backend:latest
```

---

## 💰 The 100% Zero-Cost ($0.00) Tech Stack Blueprint

Every architecture in this platform is intentionally designed to be run **completely free of cost**, enabling student teams to build, test, and host production-grade demos without incurring personal financial expenses:

| Layer | Recommended Free-Tier Service | Free Allowance / Quota |
| :--- | :--- | :--- |
| **Frontend Hosting** | **Vercel** / **Cloudflare Pages** | Unlimited preview deployments, global CDN, custom domains |
| **Backend API** | **Render** / **Koyeb** / **Fly.io** | Free web services (Python / Node.js / Go) |
| **Database** | **Supabase** / **Neon Serverless Postgres** | Free PostgreSQL instance with 500 MB storage & Auth |
| **Cache & Real-Time Queue**| **Upstash Redis** | 10,000 free commands/day |
| **Object & Image Storage** | **Cloudflare R2** | 10 GB storage with **$0 egress fees** |
| **AI / LLM Inferences** | **Groq Free Tier** & **Gemini 1.5 Flash** | Sub-second ultra-fast LLM inference API ($0 free tier) |
| **Computer Vision** | **Hugging Face Spaces** / **Roboflow** | Free edge-inference endpoints |

---

## 📁 Repository Architecture & Directory Structure

```
sih2026/
├── index.html                               # Root HTML with Navy Blue & SEO meta tags
├── package.json                             # Node package definitions & build scripts
├── tailwind.config.js                       # Tailwind CSS theme (Navy Blue GovTech Palette)
├── vite.config.ts                           # Vite configuration with chunk-splitting
├── projects/                                # Standalone full-stack directories for all PS
│   ├── SIH26023_Coal_Rail_Loadout_Overload/ # Coal India Rake Overload Sentinel
│   ├── SIH26024_Coal_Logistics_Optimizer/   # Multi-Modal Transport Dispatch Optimizer
│   ├── SIH26027_RailBlockAI_360/            # Indian Railways Corridor Block Gantt & KAVACH
│   ├── SIH26028_RailETA_Dynamic_360/        # RTIS Live Radar & Fog-Pilot Simulator
│   ├── SIH26031_Quality_assessment_onions/  # DoCA / NAFED Caliper Vision & Pathology
│   └── ...                                  # (Individual microservices for all PS)
├── public/                                  # Public static assets & favicon
└── src/
    ├── App.tsx                              # Main Application Layout & Controller
    ├── main.tsx                             # React 18 DOM Entry Point
    ├── index.css                            # Global styles, scrollbars, and white theme layer
    ├── components/                          # Modular UI components
    │   ├── Navbar.tsx                       # Authoritative Navy Blue Portal Header
    │   ├── Hero.tsx                         # White background hero with stats & quick filters
    │   ├── FilterBar.tsx                    # Multi-facet filters, sorting & view mode switcher
    │   ├── PSCard.tsx                       # Problem statement card with launch triggers
    │   ├── StandaloneAppView.tsx            # Standalone full-window live application wrapper
    │   ├── FullAppRunner.tsx                # Modal application runner with tutorial & codebase tabs
    │   ├── DynamicDomainApp.tsx             # Interactive domain simulation suite
    │   ├── PSDetailModal.tsx                # Problem statement deep-dive modal
    │   └── ...
    ├── data/                                # Structured problem statements & telemetry data
    │   ├── software_ps.json                 # 175 Software Category Problem Statements
    │   ├── sih26031/                        # Datasets for Onion Caliper Vision & Silo IoT
    │   ├── sih26028/                        # Datasets for RTIS Live Radar & Fog Speeds
    │   ├── sih26027/                        # Datasets for KAVACH TSR & Shadow Blocks
    │   └── ...
    └── utils/                               # Storage, SEO, file tree, and export helpers
```

---

## 🌟 Featured Government of India Live Applications

| PS ID | Organization / Ministry | Application Name | Core Innovation |
| :--- | :--- | :--- | :--- |
| **SIH26031** | **Ministry of Consumer Affairs (DoCA) / NAFED** | **PyaazParikshan AI 360** | Edge-AI crate optical caliper (sub-mm accuracy with ₹10 coin reference), multi-spectral fungal pathology detection (*Aspergillus* / *Fusarium*), Polygon PoS SHA-256 digital QAC certificate, and cold storage silo IoT microclimate sentinel. |
| **SIH26028** | **Ministry of Railways / CRIS / RTIS** | **RailETA Dynamic 360 Ultra** | Real-time Train Information System (RTIS) live radar with 30s GPS pings, kinematic dead-reckoning simulator, AI Fog-Pilot dynamic speed envelope, and guaranteed connecting train PNR safeguards. |
| **SIH26027** | **Ministry of Railways / CRIS / COIS** | **RailBlockAI 360** | Integrated rolling corridor Gantt scheduler, multi-department shadow block generator (Track, OHE, S&T), KAVACH 4.0 ATP & TSR safety portal, and Gati Shakti section capacity gains analytics. |
| **SIH26024** | **Ministry of Coal / Coal India (CIL)** | **CoalLogistics 360** | Multi-modal railway rake vs. road freight cost-matrix optimizer, first-mile rail siding dispatch engine, and real-time transit telemetry. |
| **SIH26023** | **Ministry of Coal / Indian Railways** | **Coal Rake Overload Sentinel** | Laser LiDAR profiling, conveyor weighbridge integration, axle-weight differential alerting, and automated penalty dockage calculation. |

---

## 📅 Important Hackathon Dates & Official Links

* **Official SIH Portal**: [https://sih.gov.in/](https://sih.gov.in/)
* **Problem Statements Directory**: [https://sih.gov.in/sih2026PS](https://sih.gov.in/sih2026PS)
* **Idea Submission Deadline**: **20 September 2026**
* **College SPOC Verification Deadline**: **25 September 2026**
* **Grand Finale**: Announced by AICTE / Ministry of Education Innovation Cell (MIC)

---

## ⚖️ Disclaimer & Intellectual Property

This platform is an independent innovation accelerator and reference tool developed by **Flugelsoft Labs** to assist students, participants, and academic institutions in exploring problem statements and building production-grade solutions.

All problem statement titles, problem IDs, descriptions, ministry trademarks, theme classifications, and related intellectual property belong exclusively to their respective **Government Ministries, Departments, Public Sector Undertakings (PSUs), and the Smart India Hackathon / AICTE / Ministry of Education Innovation Cell (MIC), Government of India**.

All official team registrations, college SPOC nominations, and formal idea submissions must be submitted directly through the official government portal at [sih.gov.in](https://sih.gov.in).

---

<div align="center">
  <sub>Designed &amp; Built with precision by <strong>Flugelsoft Labs</strong> • Empowering the Next Generation of Indian Technologists 🇮🇳</sub>
</div>
