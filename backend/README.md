# Student Sentiment — Backend API

Express + Prisma REST API for the MIIT campus activities and student sentiment platform. Serves blog posts, comments, likes, campus tour stops, and user authentication.

---

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| [Node.js](https://nodejs.org/) | 18+ (20+ recommended) |
| [PostgreSQL](https://www.postgresql.org/) | Running locally or remote |
| npm | Included with Node.js |

---

## Quick start

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Copy the example file and edit it with your database credentials:

```bash
cp .env.example .env
```

`.env` example:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/student_sentiment?schema=public"
JWT_SECRET="change-this-to-a-long-random-secret"
PORT=5000
```

Create the PostgreSQL database if it does not exist:

```sql
CREATE DATABASE student_sentiment;
```

### 3. Set up the database

Generate the Prisma client, run migrations, and seed sample data:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Start the server

**Development** (auto-restart on file changes):

```bash
npm run dev
```

**Production-style:**

```bash
npm start
```

The API runs at **http://localhost:5000** by default.

Health check:

```bash
curl http://localhost:5000/api
```

---

## npm scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload (`tsx watch`) |
| `npm start` | Start the server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed sample users, posts, comments, and tour stops |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

---

## Project structure

```
backend/
├── app.js                 # Express app & route mounting
├── index.js               # Server entry point
├── prisma/
│   ├── schema.prisma      # Database models
│   ├── seed.ts            # Sample data
│   └── migrations/        # Migration history
├── src/
│   ├── lib/prisma.ts      # Prisma client (PostgreSQL adapter)
│   ├── routes/            # API route handlers
│   └── utils/             # Middleware & logging
├── generated/prisma/      # Generated Prisma client (after db:generate)
├── .env.example           # Environment variable template
└── package.json
```

---

## API endpoints

Base URL: `http://localhost:5000`

### General

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api` | No | Health check |

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/login` | No | Login with email & password, returns JWT |

**Login body:**

```json
{
  "email": "admin@miit.edu.mm",
  "password": "admin123"
}
```

**Response:**

```json
{
  "token": "...",
  "name": "Admin",
  "email": "admin@miit.edu.mm",
  "role": "ADMIN"
}
```

Send the token on protected routes:

```
Authorization: Bearer <token>
```

### Posts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/posts` | No | List posts (`?campus=main` optional) |
| GET | `/api/posts/:id` | No | Get post with comments, likes, sentiment |
| POST | `/api/posts` | Admin | Create post |
| DELETE | `/api/posts/:id` | Admin | Delete post |

### Comments

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/comments` | No | List all comments |
| GET | `/api/comments/:id` | No | Get comment by ID |
| POST | `/api/comments` | No | Create comment |
| DELETE | `/api/comments/:id` | No | Delete comment |

### Likes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/likes` | No | List all likes |
| GET | `/api/likes/:id` | No | Get like by ID |
| POST | `/api/likes` | No | Create like |
| DELETE | `/api/likes/:id` | No | Delete like |

### Campus tour

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/campus-tour` | No | List all tour stops |
| GET | `/api/campus-tour/:id` | No | Get tour stop by ID |
| POST | `/api/campus-tour` | No | Create tour stop |
| PUT | `/api/campus-tour/:id` | No | Update tour stop |
| DELETE | `/api/campus-tour/:id` | No | Delete tour stop |

Tour stops support an optional `panorama` JSON field for 360° content (equirectangular, iframe, or video config).

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/users` | Admin | List users |
| GET | `/api/users/:id` | User | Get user by ID |
| POST | `/api/users` | Admin | Create user |
| DELETE | `/api/users/:id` | Admin | Delete user |

---

## Seed accounts

After running `npm run db:seed`:

| Email | Password | Role |
|-------|----------|------|
| `admin@miit.edu.mm` | `admin123` | ADMIN |
| `thiri@miit.edu.mm` | `password1` | USER |
| `kyaw@miit.edu.mm` | `password2` | USER |

Additional demo users are created — see `prisma/seed.ts`.

---

## Tech stack

- [Express 5](https://expressjs.com/)
- [Prisma 7](https://www.prisma.io/) + PostgreSQL
- [tsx](https://github.com/privatenumber/tsx) — run TypeScript routes without a separate build step
- [bcrypt](https://www.npmjs.com/package/bcrypt) — password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — JWT auth

---

## Connecting the frontend

Point the frontend API layer (`frontend/src/services/postsApi.js`) at this backend:

```env
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

Replace mock functions with `fetch()` calls to the endpoints above.

---

## Troubleshooting

**`PrismaClient` / generated client errors**  
Run `npm run db:generate` after cloning or changing `schema.prisma`.

**Database connection refused**  
- Confirm PostgreSQL is running.
- Check `DATABASE_URL` in `.env`.
- Ensure the database `student_sentiment` exists.

**Port 5000 already in use**  
Set a different port in `.env`:

```env
PORT=5001
```

**`npm start` fails on TypeScript routes**  
Routes are written in TypeScript (`.ts`). Use `npm start` or `npm run dev` — both run via `tsx`, not plain `node`.

**Migration conflicts**  
If the database is fresh, run:

```bash
npm run db:migrate
npm run db:seed
```

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `PORT` | No | Server port (default: `5000`) |

Never commit `.env` to git. Use `.env.example` as a template.
