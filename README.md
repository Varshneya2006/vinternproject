Vintern Project — DDD Student Dashboard
This repository contains a data-driven student analytics dashboard with a React + Vite frontend and an Express + TypeScript backend using MongoDB. It’s designed to collect session analytics, authenticate users, and surface performance metrics and charts for students and administrators.

Repository: https://github.com/Varshneya2006/vinternproject

Key Features
Authentication (signup, login) with JWT-based sessions.
Role-based views: Admin/Dashboard and Student Dashboard.
Session analytics model capturing metrics used for visualization.
Charts and performance visualizations (Chart.js + react-chartjs-2).
Protected API routes and frontend routes.
Seed script to populate example data for faster local testing.

Architecture Overview
Frontend: Vite + React (TypeScript). Components under components, pages under pages.
Backend: Express + TypeScript with routes in routes, controllers in controllers, and Mongoose models in models.
Database: MongoDB (local or Atlas). Connection handled in db.ts.

Tech Stack
Frontend: React, Vite, TypeScript, react-router-dom, Chart.js
Backend: Node.js, Express, TypeScript, Mongoose, JSON Web Tokens (JWT)
Dev tools: ts-node-dev for backend dev, Vite for frontend dev


Quick Start (Local)
Clone the repo (already pushed):
git clone https://github.com/Varshneya2006/vinternproject.git
cd vinternproject

Backend setup:
Create .env in server with the following (example):
MONGO_URI=mongodb://localhost:27017/vintern
JWT_SECRET=your_jwt_secret
PORT=5000

Run backend (dev):
npm run dev

Seed the DB (optional):
npm run seed

Frontend setup:
cd ../client
npm install
npm run dev
# Open http://localhost:5173

API Endpoints (examples)
GET / — health check
POST /api/auth/signup — create account
POST /api/auth/login — login and receive JWT
GET /api/dashboard/... — protected dashboard analytics endpoints
Project Structure (high level)


client — React app
src/pages/ — Dashboard, StudentDashboard, Login, Signup
src/components/ — UI components and charts
server — Express API
src/models/ — Mongoose models (User, Student, SessionAnalytics)
src/controllers/ — route handlers
src/routes/ — route definitions
src/middleware/ — auth middleware


Deployment Notes
Build the frontend (client) and serve statically or host separately on Netlify/Vercel.
Deploy the backend to a Node host (Railway, Render, Heroku) and configure MONGO_URI and JWT_SECRET via environment variables.

Contributing
Open an issue or submit a PR. For branches, follow feature/topic naming like feature/auth.

Useful Commands
Start backend dev server:
cd server
npm run dev

Start frontend dev server:
cd client
npm run dev

LICENSE:
This project currently has no license file. Add one if you plan to open-source this project publicly.

