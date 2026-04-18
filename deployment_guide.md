# 🚀 High-Performance "Hybrid" Deployment Guide (Zero Cost)

This guide uses the **Industry Standard Hybrid Approach**. We use **Vercel** for the frontend to ensure your portfolio loads **instantly** (zero cold starts), and **Render + Neon** for the backend to handle your professional Docker logic and data.

---

## Phase 1: Managed Database (Neon.tech)
*Companies use managed databases for high availability and automatic backups.*

1.  Go to [Neon.tech](https://neon.tech/) and create a free account.
2.  Create a project named `portfolio` and copy your **Connection String**.
3.  **Save this URL**; you'll need it for the Backend setup.

---

## Phase 2: GitHub & CI (Continuous Integration)
*Your code is automatically checked for errors on every push.*

1.  Push your latest changes to GitHub.
2.  In GitHub Repo > **Settings** > **Secrets and variables** > **Actions**, add your Firebase secrets (API keys, project IDs) so the CI pipeline can validate your code.

---

## Phase 3: Deployment (The "Hybrid" Stack)

### A. The Backend (Render.com • Docker)
*We use Render to host your Dockerized FastAPI app.*

1.  On [Render.com](https://render.com/), create a **New Web Service**.
2.  Set **Root Directory** to `backend` and runtime to **Docker**.
3.  **Environment Variables**:
    - `DATABASE_URL`: (Your Neon URL)
    - `FIREBASE_SERVICE_ACCOUNT_JSON`: (Paste the entire JSON content)
    - `ADMIN_API_KEY`: (Your secret key)
    - `CORS_ORIGINS`: `https://your-portfolio.vercel.app` (The URL Vercel gives you below).

### B. The Frontend (Vercel.com • Instant Load)
*Vercel is optimized for React/Vite. It ensures your UI loads in <1s for recruiters.*

1.  Go to [Vercel.com](https://vercel.com/) and connect your GitHub.
2.  Import your project and set the **Root Directory** to `frontend`.
3.  **Environment Variables**:
    - `VITE_API_URL`: (Your Backend Render URL, e.g., `https://backend.onrender.com`)
    - `VITE_USE_MOCK`: `false`
    - (Include your `VITE_FIREBASE_*` keys)
4.  **Wait for Build**: Vercel will build your site and give you a production URL.

---

## Phase 4: Final Security Sync
1.  **Authorize Domain**: Copy your Vercel URL and add it to **Firebase Console** > **Authentication** > **Settings** > **Authorized Domains**.
2.  **Unlock CORS**: Update the `CORS_ORIGINS` in your **Render** settings to match your live Vercel URL.

### ✅ Success! 
Recruiters will now see your site **instantly**. Even if the backend takes a few seconds to "wake up" the first time, your portfolio UI is already visible and impressive.
