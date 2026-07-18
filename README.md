# Student Sentiment — MIIT Campus Activities

A full-stack app for **MIIT** campus activities: a blog feed, comment sentiment analysis, an
interactive 360° campus tour, real login/signup, and an admin dashboard. React + Vite frontend,
Express + Prisma + PostgreSQL backend.

**Repository:** [github.com/MinLu-prog/Student-Sentiment-](https://github.com/MinLu-prog/Student-Sentiment-)

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| [Node.js](https://nodejs.org/) | 18 or later (20+ recommended) |
| npm | Comes with Node.js |
| [PostgreSQL](https://www.postgresql.org/download/) | 14+ (running locally, or any reachable instance) |

Check your versions:

```bash
node -v
npm -v
psql --version
```

This is a **two-server app** — the backend (API + database) and the frontend (Vite dev server)
both need to be running at the same time, in two separate terminals. Skipping the backend setup
below is the #1 cause of "database error" / blank data on a fresh clone.

---

## 1. Clone the repository

```bash
git clone https://github.com/MinLu-prog/Student-Sentiment-.git
cd Student-Sentiment-
```

## 2. Set up the database

Create an empty PostgreSQL database for the app (name it whatever you like — `student_sentiment`
is just the example used below):

```bash
createdb student_sentiment
```

(No `createdb` command? Use `psql -U postgres -c "CREATE DATABASE student_sentiment;"`, or create
it through a GUI like pgAdmin/TablePlus — any method that ends with an empty database works.)

## 3. Set up the backend

```bash
cd backend
npm install
```

Copy the environment template and fill in your own local values:

```bash
cp .env.example .env       # macOS/Linux
copy .env.example .env     # Windows
```

Edit `.env`:
- `DATABASE_URL` — point it at the database you just created (update the username/password/db
  name to match your local Postgres setup).
- `JWT_SECRET` — any long random string. Generate one with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

**`.env` is gitignored on purpose — never commit it.** Every person running this project locally
(or on a fresh machine) creates their own from `.env.example`; that's expected, not an error.

Push the schema to your new database and seed it with starter data (sample posts, users, and all
18 campus tour stops):

```bash
npx prisma db push
npx prisma generate
npx prisma db seed
```

Start the backend:

```bash
npm run dev
```

It listens on **http://localhost:5000** by default. Leave this terminal running.

### Seeded accounts (for logging in)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@miit.edu.mm` | `admin123` |
| Student | `thiri@miit.edu.mm` | `password1` |

(Five more student accounts are seeded too — see `backend/prisma/seed.ts`.) The admin account can
reach the dashboard at `/admin` (create/edit/delete posts, manage users, manage tour stops). You
can also sign up a brand-new account from the app itself.

## 4. Set up the frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173**). It talks to the backend at
`http://localhost:5000/api` by default — set `VITE_API_BASE_URL` in a `frontend/.env` file if your
backend runs somewhere else.

---

## Available scripts

**`backend/`**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the API server with hot reload (tsx watch) |
| `npm start` | Start the API server (no watch, for production) |
| `npx prisma db push` | Sync the database schema from `prisma/schema.prisma` |
| `npx prisma generate` | Regenerate the Prisma client after a schema change |
| `npx prisma db seed` | Re-run the seed script (`prisma/seed.ts`) |
| `npx prisma studio` | Browse/edit the database in a GUI |

**`frontend/`**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
Student-Sentiment-/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database models
│   │   └── seed.ts             # Starter data (users, posts, tour stops)
│   ├── src/
│   │   ├── routes/             # Express route handlers (REST API)
│   │   ├── lib/prisma.ts       # Prisma client setup
│   │   └── utils/middleware.ts # Auth (JWT), logging, error handling
│   ├── uploads/                # User-uploaded images (gitignored contents)
│   ├── .env.example            # Copy to .env and fill in
│   └── app.js / index.js
└── frontend/
    ├── public/
    │   ├── campus/              # Real campus photos used across the app
    │   └── panoramas/           # 360° images for the campus tour
    ├── src/
    │   ├── components/          # UI components (incl. ui/ shadcn-style primitives)
    │   ├── pages/                # Routed pages (incl. pages/admin/)
    │   ├── context/AuthContext.jsx
    │   ├── services/postsApi.js # All API calls to the backend
    │   └── App.jsx               # Route definitions
    └── package.json
```

---

## Features

- **Real auth** — login, signup, logout, guest browsing (guests can read everything but can't
  like or comment)
- **Admin dashboard** (`/admin`, admin accounts only) — create/edit/delete posts, manage users
  and roles, manage campus tour stops, upload images directly from your device
- **Blog feed** — campus stories with categories, search, and multi-photo carousels
- **Comment analysis dashboard** (`/sentiment`) — sentiment breakdown by topic, trend over time,
  most-discussed stories
- **360° campus tour** (`/campus-tour`) — interactive map with numbered pins, drag-to-look-around
  panoramas per stop
- **Engagement** — real likes and comments, backed by PostgreSQL

---

## Adding 360° tour panoramas

1. Add equirectangular JPG/PNG files to `frontend/public/panoramas/`.
2. Add or edit a tour stop from the admin dashboard (`/admin/tour-stops`), or directly in
   `backend/prisma/seed.ts` if you're adding to the seed data, with a `panorama` field:

```js
panorama: {
  type: 'equirectangular',
  src: '/panoramas/main-auditorium.jpg',
  caption: 'Main Auditorium entrance',
  initialView: { yaw: 0, pitch: 0, zoom: 50 },
}
```

**Supported panorama types:**

| Type | Use case |
|------|----------|
| `equirectangular` | Standard 360° photo (`/panoramas/...`) |
| `iframe` | Matterport, Kuula, Google Street View embed URL |
| `video` | 360° MP4 video file |

See `frontend/src/config/panorama.js` for full schema notes.

---

## Tech stack

**Frontend:** [React 19](https://react.dev/), [Vite 8](https://vite.dev/),
[React Router 7](https://reactrouter.com/), [Tailwind CSS 4](https://tailwindcss.com/),
[Radix UI](https://www.radix-ui.com/) + shadcn-style components, [Lucide React](https://lucide.dev/)
icons, [@photo-sphere-viewer/core](https://photo-sphere-viewer.js.org/) for 360° views, Leaflet for
the campus map.

**Backend:** [Express 5](https://expressjs.com/), [Prisma 7](https://www.prisma.io/) +
PostgreSQL, JWT auth (`jsonwebtoken` + `bcrypt`), Multer for image uploads.

---

## Troubleshooting

**"Can't reach database server" / Prisma connection errors**
- Confirm PostgreSQL is actually running.
- Confirm `backend/.env` exists (copy it from `.env.example` if not — it's gitignored, so a fresh
  clone never has one) and `DATABASE_URL` matches your real username/password/database name.
- Confirm you ran `npx prisma db push` against that database at least once.

**Posts / campus tour / login show up empty or broken on a fresh clone**
- You need to run `npx prisma db seed` after `db push` — an empty (but schema-correct) database
  has no starter data.

**Frontend loads but shows "Unable to load posts" / falls back to placeholder content**
- The backend isn't running, isn't reachable at `http://localhost:5000`, or crashed on startup —
  check the backend terminal for errors first.

**Port already in use**
- Vite picks the next free port automatically (e.g. 5174) — check the terminal output.
- The backend's port is set by `PORT` in `.env` (defaults to 5000) if 5000 is taken.

**`npm install` fails**
Delete `node_modules` and `package-lock.json` in the affected folder, then run `npm install` again.

**360° image does not load**
- Confirm the file exists under `frontend/public/panoramas/`.
- Use a true equirectangular 360° image (2:1 aspect ratio).
- Paths must start with `/panoramas/` (served from `public/`).

**Blank page after build**
Run `npm run preview` from `frontend/` and check the browser console for errors.

---

## License

This project is for educational use at MIIT unless otherwise specified.
