# AYT Grup – Corporate Website

Professional multi-lingual corporate website for **AYT Grup**, an Ankara-based construction and contracting company. Built with React, Firebase, and Tailwind CSS.

🌐 **Domain:** [aytgrup.com](https://aytgrup.com)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 (Create React App) |
| Styling | Tailwind CSS v3 + custom design system |
| Animation | Framer Motion |
| Routing | React Router v6 |
| i18n | react-i18next (TR / EN / DE) |
| Backend | Firebase (Firestore + Storage) |
| SEO | react-helmet-async |
| Gallery | Swiper.js |
| Deployment | Docker + Nginx |

---

## Features

- **Multi-lingual** — Turkish (primary), English, German with automatic language detection and persistence
- **Dark Mode** — System-preference aware, togglable, no FOUC
- **Mobile-First** — Responsive design with sticky contact bar on mobile
- **Project Gallery** — Interactive filter by category (Residential / Commercial / Industrial) and status (Completed / Ongoing)
- **Project Detail Pages** — Gallery slider, progress timeline for ongoing projects, downloadable brochure support
- **SEO Ready** — Unique meta tags per page, Open Graph, Twitter Card, hreflang, canonical URLs
- **Performance** — Code splitting, lazy loading, WebP-friendly (no format enforcement, use WebP images in Firebase Storage)
- **Firebase Integration** — Firestore for project data, Storage for images, graceful fallback to seed data when unconfigured
- **Blueprint Aesthetic** — Construction-industry visual identity with architectural grid lines and gold accents

---

## Quick Start

```bash
# Clone
git clone https://github.com/your-org/aytgrup.com.git
cd aytgrup.com

# Install
npm install --legacy-peer-deps

# Configure
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Develop
npm start
```

> The app runs without Firebase — it uses built-in seed projects as fallback data.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server at `localhost:3000` |
| `npm run build` | Production build to `/build` |
| `npm test` | Run tests |

---

## Project Structure

```
src/
  components/     # Reusable UI + layout + section components
  config/         # Firebase initialisation
  constants/      # ← All design tokens, nav, static data (start here)
  context/        # Theme (dark/light) context
  hooks/          # Custom React hooks
  i18n.js         # Internationalisation setup
  locales/        # tr / en / de JSON translation files
  pages/          # Full page components
  services/       # Firebase CRUD services
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Firebase project values. See `.env.example` for documentation on each variable.

---

## Deployment

### Docker (recommended for VPS)

```bash
docker build \
  --build-arg REACT_APP_FIREBASE_PROJECT_ID=your_id \
  # ... other Firebase args \
  -t aytgrup-web .

docker run -d -p 80:80 --restart unless-stopped --name aytgrup-web aytgrup-web
```

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

---

## Contributing

Internal project. For issues or questions, contact the development team.

---

## License

Private — all rights reserved © AYT Grup.
