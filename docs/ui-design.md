# UI Design

This chapter describes the main user interfaces of the **MIIT Student Sentiment** platform. Each screen is designed for clarity, accessibility, and a consistent campus-brand experience using React, Tailwind CSS, and shadcn-style components.

> **Note:** Insert screenshots beside each figure caption when preparing the final report (e.g. `Fig 7.1 Home Page.png`).

---

## Fig 7.1 Home Page — Blog Feed

This is the main landing screen after opening the application. It displays campus activity stories for the selected campus area. The page includes a hero banner with university branding, live stats (Stories, Comments, Reads), a search bar, category filters, a featured post, and a grid of additional story cards. Guests and logged-in users can browse content without signing in.

**Key UI elements:** Global navigation bar, campus selector, Blog Feed / Comment Analysis tabs, search input, category pills, featured story card, post grid.

---

## Fig 7.2 Post Detail Page

This screen opens when a user selects a story from the feed. It shows the full article with image, category badge, date, title, body text, and tags. Below the content, an engagement bar displays like and comment counts with a like button. A sentiment snapshot summarizes comment tone, followed by a threaded comments list with author name, role, sentiment badge, and timestamp.

**Key UI elements:** Back navigation, hero image, engagement bar (likes/comments), sentiment snapshot, comments list.

---

## Fig 7.3 Comment Analysis View

This view lets users review sentiment across all posts on the current campus. Each story title links to its detail page, and a sentiment snapshot card shows the percentage breakdown of positive, neutral, and negative comments with color-coded progress bars and comment counts.

**Key UI elements:** View toggle (Blog Feed / Comment Analysis), per-post sentiment cards, positive/neutral/negative indicators.

---

## Fig 7.4 Campus Tour — Map View

The virtual campus tour opens from the top navigation bar. In map mode, numbered pins mark tour stop locations on an interactive campus map. Users tap a pin to select a location and switch to the immersive 360° view. A Map / 360° toggle lets users move between overview and detail modes.

**Key UI elements:** Campus Tour button, map with stop pins, mode toggle (Map / 360° View), stop list sidebar.

---

## Fig 7.5 Campus Tour — 360° Panorama View

In immersive mode, the selected tour stop displays a drag-to-look-around panorama using Photo Sphere Viewer. Users can zoom, move, and enter fullscreen. The sidebar lists all tour stops with active-state highlighting, duration, description, and optional photo gallery. Stops without panorama assets show a placeholder with setup instructions.

**Key UI elements:** Panorama viewer, Back to map button, active stop badge, tour stop navigation, photo gallery, placeholder for missing 360° assets.

---

## Fig 7.6 Global Navigation Bar

The top bar is persistent across all views. It shows the MIIT logo, app title (“Campus Activities”), a campus area dropdown (Main, North, South, East, West), a Campus Tour shortcut, and action buttons. The layout is responsive — labels shorten on smaller screens while core navigation remains accessible.

**Key UI elements:** Logo, campus selector, Campus Tour toggle, share/action buttons.

---

## Fig 7.7 Category Filter & Search

Below the hero section, horizontal category filters (All, Academic, Events, Sports, etc.) let users narrow the feed. The search bar filters posts by title, excerpt, or tags in real time. Both controls reset when the user changes campus to avoid showing mismatched results.

**Key UI elements:** Category pill buttons, search input with icon, active category highlight.

---

## Fig 7.8 Loading & Error States

When data is loading from the API, a centered loading message appears. If the backend is unavailable, an error banner explains the connection failure, suggests starting the server on port 5000, and provides a Retry button. This ensures users receive feedback instead of a blank screen.

**Key UI elements:** Loading spinner text, error card, retry action, helper message for developers.

---

# Project Roadmap & Conclusion

This final chapter outlines the path to completion, summarizing remaining features and the project's overall status.

## 8.1 Remaining Features (Phase 2)

Development is currently focused on finalizing the following modules:

- **Login & Registration UI:** Building dedicated screens for sign-in, sign-up, and logout so users are not limited to demo auto-login.
- **Admin Dashboard:** A web interface for administrators to create/delete posts, manage users, moderate comments, and update campus tour stops.
- **Comment Submission Form:** An in-app form on the post detail page so students can add comments with automatic sentiment detection before posting.
- **Enhanced Sentiment Analysis:** Evaluating a stronger NLP model or API to improve accuracy beyond the current lexicon-based approach.
- **Production Deployment:** Hosting the frontend and backend with environment-based configuration for live campus use.

## 8.2 Quality & Documentation (Phase 3)

Before the final release, the team will focus on system stability and support:

- **Testing & QA:** Unit and integration tests for API routes, authentication, likes, comments, and sentiment aggregation; end-to-end tests for critical user flows.
- **Documentation:** User guides for students and administrators, plus technical setup notes for developers (already started in `docs/` and README files).

## 8.3 Project Timeline

| Phase | Status | Key Milestones |
|-------|--------|----------------|
| Phase 1 | Completed | Core UI: blog feed, post detail, sentiment view, campus tour, backend API, PostgreSQL schema, seed data |
| Phase 2 | In Progress | Login/registration UI, admin dashboard, comment form, deployment |
| Phase 3 | Upcoming | Full testing, user manuals, performance tuning |

## Conclusion

The MIIT Student Sentiment platform has a working foundation: a responsive React frontend, Express + Prisma backend, PostgreSQL database, JWT authentication, sentiment insights, and an interactive campus tour. Core browsing, analysis, and tour features are operational. Remaining work — admin tooling, full auth UI, and production deployment — is clearly defined and on track. The project meets the goal of giving students and visitors a single place to explore campus activities and understand community feedback through sentiment analysis.

---

## References

- React Documentation — https://react.dev
- Vite Documentation — https://vite.dev
- Express.js Guide — https://expressjs.com
- Prisma Documentation — https://www.prisma.io/docs
- PostgreSQL Documentation — https://www.postgresql.org/docs
- Tailwind CSS Documentation — https://tailwindcss.com/docs
- Photo Sphere Viewer — https://photo-sphere-viewer.js.org
