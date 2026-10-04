# Challenges & Solutions

We successfully navigated several technical and organizational hurdles while building the MIIT Student Sentiment platform. Below is a summary of the key challenges and the strategies used to overcome them.

## 5.1 Technical & Development Challenges

- **Learning Curve:** Adopting React with Vite, Express with TypeScript, Prisma ORM, and PostgreSQL required significant study. The team overcame this through official documentation, tutorials, and internal knowledge-sharing sessions during integration.

- **Frontend–Backend Integration:** Replacing static mock data with a live REST API was a primary hurdle. The team built a centralized API client, configured a Vite development proxy (`/api` → port 5000), and aligned response shapes so posts, comments, likes, and campus tour data loaded consistently in the UI.

- **Authentication & Role-Based Access:** Supporting guest browsing while restricting likes, comments, and admin actions required careful middleware design. A hybrid approach was developed: public routes use optional JWT validation, protected routes require a valid token, and admin-only operations are guarded by role checks (`USER` vs `ADMIN`).

- **Database Design & Relationships:** Modelling posts, comments, likes, users, and campus tour stops with correct foreign keys and cascade rules was challenging. The team used Prisma migrations and enforced a unique constraint on likes (`postId` + `userId`) to prevent duplicate engagement records.

- **Sentiment Analysis Pipeline:** Classifying comment tone accurately without a heavy ML stack was difficult. The team implemented a lightweight lexicon-based analyzer on the client, persisted the sentiment label with each comment, and aggregated positive/neutral/negative percentages on the server when enriching post responses.

## 5.2 Operational & Performance Challenges

- **API Reliability & Environment Sync:** After updating database credentials, the frontend still returned HTTP 500 because a stale backend process held an outdated `DATABASE_URL`. The team diagnosed the issue, restarted the server, and added a startup database health check that fails fast with a clear error message.

- **Seed Data & Database Reset:** Re-running the seed script failed when demo users and posts already existed (`Unique constraint failed on id`). The team made seeding idempotent with `skipDuplicates: true` and documented a full reset workflow for development.

- **Dual-Server Development Workflow:** Because frontend and backend live in separate folders, both servers must run together during development. The team standardized npm scripts, environment templates (`.env.example`), and README instructions to reduce setup friction.

- **360° Campus Tour Integration:** Loading panoramic images from flexible JSON configs while handling missing assets and campus switches was challenging. The team integrated Photo Sphere Viewer with placeholder fallbacks and reset tour state when the campus filter changed.

- **Consistent User Experience Under Load Errors:** Network or server failures could leave the feed blank without explanation. The team added loading states, error banners, and retry logic in the main app shell so users receive actionable feedback instead of silent failures.

## Summary Table: Problem & Solution

| Challenge | Solution |
|-----------|----------|
| Frontend–backend connection | Centralized API client + Vite proxy + enriched API responses |
| Stale database credentials | Process restart + startup `SELECT 1` health check |
| Guest vs authenticated access | Optional JWT middleware for public routes; strict auth for engagement |
| Duplicate likes / seed errors | Prisma unique constraints + idempotent seed with `skipDuplicates` |
| Sentiment insights | Client-side lexicon analysis + server-side aggregation per post |
| Campus tour asset gaps | JSON panorama config + viewer library + placeholder UI |
| Role-based admin control | JWT role claims + `requireAdmin` middleware on protected routes |
