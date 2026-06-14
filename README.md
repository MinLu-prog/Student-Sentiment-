# Student Sentiment — MIIT Campus Activities

A React frontend for **MIIT** campus activities, blog posts, comment sentiment analysis, and 360° campus tours. Built with Vite, Tailwind CSS, and shadcn-style UI components.

**Repository:** [github.com/MinLu-prog/Student-Sentiment-](https://github.com/MinLu-prog/Student-Sentiment-)

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| [Node.js](https://nodejs.org/) | 18 or later (20+ recommended) |
| npm | Comes with Node.js |

Check your versions:

```bash
node -v
npm -v
```

---

## Quick start

### 1. Clone the repository

```bash
git clone https://github.com/MinLu-prog/Student-Sentiment-.git
cd Student-Sentiment-
```

### 2. Install dependencies

All application code lives in the `frontend/` folder:

```bash
cd frontend
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173**).

### 4. Build for production

```bash
npm run build
```

Output is written to `frontend/dist/`.

### 5. Preview the production build locally

```bash
npm run preview
```

---

## Available scripts

Run these from the `frontend/` directory:

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
├── frontend/
│   ├── public/
│   │   └── panoramas/          # Put 360° images here
│   ├── src/
│   │   ├── components/         # UI components
│   │   │   ├── panorama/       # 360° viewer
│   │   │   └── ui/             # shadcn-style primitives
│   │   ├── config/
│   │   │   └── panorama.js     # Panorama schema & docs
│   │   ├── data/
│   │   │   ├── mockDb.js       # Mock likes, comments, tour stops
│   │   │   └── posts.js        # Blog post content
│   │   ├── services/
│   │   │   └── postsApi.js     # API layer (swap for real backend)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Features

- **Blog feed** — campus stories with categories and search
- **Comment analysis** — sentiment snapshot (positive / neutral / negative)
- **Campus areas** — filter content by Main, North, South, East, West campus
- **360° campus tour** — drag-to-look-around panoramas per tour stop
- **Engagement** — likes and comments with mock data ready for a backend

---

## Adding 360° tour panoramas

1. Add equirectangular JPG/PNG files to `frontend/public/panoramas/`.
2. Edit tour stops in `frontend/src/data/mockDb.js` and add a `panorama` field:

```js
{
  id: 'stop-1',
  campus: 'main',
  name: 'Main Auditorium',
  description: '...',
  duration: '15 min',
  panorama: {
    type: 'equirectangular',
    src: '/panoramas/main-auditorium.jpg',
    caption: 'Main Auditorium entrance',
    initialView: { yaw: 0, pitch: 0, zoom: 50 },
  },
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

## Connecting a backend

Mock data is separated from the UI. Replace functions in `frontend/src/services/postsApi.js` with real API calls:

| Function | Purpose |
|----------|---------|
| `fetchPosts({ campus })` | List posts for a campus |
| `fetchPostById(id)` | Single post with likes & comments |
| `togglePostLike(postId)` | Like / unlike a post |
| `addComment(postId, content, sentiment)` | Add a comment |
| `fetchCampusTourStops(campus)` | Tour stops with optional `panorama` |

Raw mock records live in:

- `frontend/src/data/posts.js` — post content
- `frontend/src/data/mockDb.js` — users, likes, comments, tour stops

The UI expects enriched post objects with `likeCount`, `commentCount`, `comments`, `sentiment`, and `likedByCurrentUser` — see `enrichPost()` in `postsApi.js`.

---

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) + shadcn-style components
- [Lucide React](https://lucide.dev/) icons
- [@photo-sphere-viewer/core](https://photo-sphere-viewer.js.org/) for 360° views

---

## Troubleshooting

**Port already in use**  
Vite picks the next free port automatically (e.g. 5174). Check the terminal output for the correct URL.

**`npm install` fails**  
Delete `node_modules` and `package-lock.json`, then run `npm install` again.

**360° image does not load**  
- Confirm the file exists under `frontend/public/panoramas/`.
- Use a true equirectangular 360° image (2:1 aspect ratio).
- Paths must start with `/panoramas/` (served from `public/`).

**Blank page after build**  
Run `npm run preview` from `frontend/` and check the browser console for errors.

---

## License

This project is for educational use at MIIT unless otherwise specified.
