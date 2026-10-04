# System Implementation

The implementation phase translated the design specifications into a functional platform. The following core modules have been successfully deployed.

## 6.1 Authentication & Access Control

The security module controls who can browse, engage, and administer the platform.

- **Secure Login:** Users sign in with email and password. Passwords are hashed with bcrypt before storage. A JWT (valid for 24 hours) is issued on successful login and identifies the user’s session and role.
- **Guest Access:** Visitors can browse the campus feed, view posts, and explore the tour without logging in. Likes and comments require an authenticated session.
- **Role-Based Access:** The system supports two roles:

| User Role | Key Permissions |
|-----------|-----------------|
| Visitor (Guest) | Browse feed, search/filter posts, view sentiment, campus tour |
| Student (USER) | All visitor actions + like posts, add comments |
| Administrator (ADMIN) | Create/delete posts, manage users, manage tour stops, delete comments |

- **Session Storage:** Tokens and user profiles are stored in the browser. Protected API routes validate the JWT on each request; invalid or missing tokens return clear error responses.

## 6.2 Blog Post Management

The post module is the central content hub for campus activity stories.

- **Post Structure:** Each post includes title, excerpt, body, category, campus, date, image, tags, and a featured flag.
- **Public Feed:** Posts are loaded from the REST API and filtered by campus. The feed shows a featured story plus a grid of remaining posts.
- **Search & Filter:** Users can search by title, excerpt, or tags and filter by category (Academic, Events, Sports, etc.).
- **Post Detail View:** A dedicated page shows the full article, engagement stats, sentiment snapshot, and comment thread.
- **Admin Controls:** Only administrators can create or delete posts via protected API endpoints.

## 6.3 Comment & Engagement

This module handles student interaction with campus stories.

- **Comments:** Authenticated users can add comments linked to a post and user. Each comment stores content, sentiment label, and timestamp.
- **Likes:** Students can like or unlike posts. A unique database constraint (`postId` + `userId`) prevents duplicate likes.
- **Engagement Display:** Post cards and detail pages show like counts, comment counts, and whether the current user has liked the post.
- **Admin Moderation:** Administrators can delete comments through the API when content needs to be removed.

## 6.4 Sentiment Analysis

The sentiment module provides insight into student feedback on campus activities.

- **Comment Classification:** A lightweight lexicon-based analyzer scores comment text as positive, neutral, or negative on the client before submission.
- **Persistent Labels:** The detected sentiment is saved with each comment in PostgreSQL.
- **Aggregated Insights:** The backend computes percentage breakdowns and comment counts per post, exposed in the API response.
- **Visual Dashboard:** The Sentiment Snapshot component displays positive/neutral/negative percentages with progress bars. A dedicated Comment Analysis view lists sentiment for all stories on the current campus.

## 6.5 Campus Tour

The campus tour module offers an interactive guide to MIIT locations.

- **Tour Stops:** Stops are stored per campus with name, description, duration, and optional panorama JSON configuration.
- **360° Panoramas:** Photo Sphere Viewer renders equirectangular images; iframe embeds are supported as an alternative.
- **Interactive Map:** A campus map highlights stop locations and lets users switch between tour points.
- **Graceful Fallbacks:** Missing panorama assets show a placeholder instead of breaking the page.
- **Campus Filtering:** Tour stops reload when the user changes campus in the top navigation bar.

## 6.6 User Management

Reserved for administrators, this module controls platform accounts.

- **User Directory:** Admins can list all users with name, email, and role via `GET /api/users`.
- **Account Creation:** Admins create new users with hashed passwords and assign `USER` or `ADMIN` roles.
- **Account Removal:** Admins can delete user records. Duplicate emails are rejected at the database level.

## 6.7 Frontend Shell & Navigation

The React frontend ties all modules into a single user experience.

- **Global Navigation:** Top bar with MIIT branding, campus selector, and Campus Tour toggle.
- **View Modes:** Users switch between Blog Feed, Comment Analysis, and Campus Tour without leaving the app.
- **Hero Stats:** Summary cards show story count, total comments, and read totals for the selected campus.
- **Error Handling:** Loading spinners, API error banners, and a retry button keep the UI responsive when the backend is unavailable.

## 6.8 Backend API & Database

The Express + Prisma backend serves all data and enforces business rules.

- **REST Endpoints:** `/api/login`, `/api/posts`, `/api/comments`, `/api/likes`, `/api/campus-tour`, `/api/users`
- **Middleware:** Request logging, JWT authentication (required or optional), admin role checks, and centralized error handling.
- **PostgreSQL Schema:** Models for User, Post, Comment, Like, and CampusTourStop with foreign keys, cascade deletes, and seed data for demo use.
- **Startup Health Check:** The server verifies database connectivity on launch and exits with a clear message if credentials are invalid.

## 6.9 Role-Based Access Control (RBAC)

Access is enforced at both the API and UI layers.

- **Public Routes:** Post listing, post detail, and campus tour reads require no login.
- **Authenticated Routes:** Likes and comments require a valid JWT.
- **Admin Routes:** Post creation/deletion, user management, and comment deletion require the `ADMIN` role.
- **Optional Auth:** Post endpoints accept an optional token so the UI can show personalized like status for logged-in students.
