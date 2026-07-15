# API Connection Fix — Session Notes

This document describes the work done to diagnose and fix the frontend error:

> **Could not connect to the API** — Request failed with status 500

Date: June 2025

---

## Problem

The React frontend (`frontend/`) could not load posts or authenticate. Requests to `/api/posts`, `/api/login`, and related endpoints returned **HTTP 500**.

The backend server appeared to be running on port 5000, but every database-backed route failed.

---

## Diagnosis

### 1. Verified the database credentials

A direct Prisma test against `backend/.env` succeeded:

- Connection to PostgreSQL worked
- **3 posts** were found for `campus=main`
- Sample post: *"Annual Science Fair 2025 Showcases Student Innovation"*

This confirmed that `DATABASE_URL` in `backend/.env` was correct and the database was seeded.

### 2. Tested the running API server

Requests to the live server on port 5000 still returned 500 with:

```
Authentication failed against the database server,
the provided database credentials for `postgres` are not valid
```

So the database was fine, but the **running server process** was using stale credentials.

### 3. Found a stale backend process

An old Node process was still listening on **port 5000**. It had been started **before** `backend/.env` was updated with the correct PostgreSQL password. Node/Express does not reload environment variables automatically when `.env` changes — only when the process is restarted.

---

## Root cause

| Item | Detail |
|------|--------|
| Symptom | Frontend 500 errors on all API calls |
| Actual issue | Stale backend process with outdated `DATABASE_URL` |
| Not the issue | Wrong frontend proxy, missing seed data, or broken Prisma schema |

---

## Actions taken

### Restarted the backend

1. Stopped the old process on port 5000
2. Started a fresh server: `npm run dev` in `backend/`
3. Confirmed startup output:

   ```
   Database connected
   Server is running on port 5000
   ```

### Verified all endpoints

| Endpoint | Result |
|----------|--------|
| `GET /api` | Health check OK |
| `GET /api/posts?campus=main` | 3 posts |
| `POST /api/login` | Login OK for `thiri@miit.edu.mm` |
| `GET /api/campus-tour?campus=main` | 2 tour stops |
| Frontend proxy `http://localhost:5173/api/posts` | 3 posts via Vite proxy |

### Added startup database check

**File:** `backend/index.js`

Before listening on port 5000, the server now runs `SELECT 1` against the database. If the connection fails, it logs a clear message and exits instead of returning 500 on every request.

```js
await prisma.$queryRaw`SELECT 1`
console.log('Database connected')
```

On failure:

```
Database connection failed: <message>
Check DATABASE_URL in backend/.env, then restart the server.
```

### Removed temporary debug script

Deleted `backend/scripts/test-db.js` — it was only used during diagnosis.

### Prior changes (from frontend–backend integration)

These were already in place before this fix session:

- **`frontend/src/App.jsx`** — Auth runs in the background; posts and campus tour load without login
- **`frontend/vite.config.js`** — Proxies `/api` → `http://localhost:5000`
- **`backend/app.js`** — Health route at `GET /api`
- **`backend/src/routes/login.ts`** — try/catch with error logging
- **`backend/src/routes/posts.ts`** — try/catch with error logging

---

## How to run the app

**Terminal 1 — backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 — frontend:**

```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** and refresh the page.

---

## If the error happens again

1. **Restart the backend** after any change to `backend/.env`
2. Check that only **one** process is using port 5000
3. Confirm startup shows `Database connected`
4. Test directly: `curl http://localhost:5000/api/posts?campus=main`
5. Ensure PostgreSQL is running and `DATABASE_URL` uses your actual postgres password

Demo login (for likes and authenticated actions):

- Email: `thiri@miit.edu.mm`
- Password: `password1`
