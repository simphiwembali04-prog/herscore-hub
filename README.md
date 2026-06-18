# HerScore

**The leading destination for women's sports — live scores, athlete profiles, and storytelling, built women's-first.**

HerScore is a next-generation sports platform inspired by the speed of Flashscore, the breadth of ESPN, and the storytelling of The Athletic. This repository contains the **visual MVP**: a fast, mobile-first web experience covering live scores, athletes, news, and rankings across football, tennis, rugby, and cricket.

---

## ✨ What is HerScore?

Women's sports deserve a dedicated home. HerScore puts women's competitions first in every list, every ranking, and every headline. The MVP showcases the core fan experience with sample data while the backend and data integrations are staged for future phases.

### MVP Features

- **Live Scores** — real-time-style match cards for football, tennis, rugby, and cricket, with status-aware filters (Live / Upcoming / Finished).
- **Athletes** — rich athlete profiles with stats, bio, achievements, recent form, and AI-generated-style spotlight summaries.
- **News** — categorized, women's-first sports feed with featured stories and read-time estimates.
- **Rankings** — FIFA-style women's national rankings with movement indicators.
- **Trust & Privacy** — a dedicated `/trust` page covering shared responsibility, data collection, cookies, and security reporting.
- **Mobile-first Navigation** — bottom tab bar optimized for phones, with responsive desktop support.
- **Premium Design** — custom OKLCH color palette (brand pink, deep purple, soft gold), `Outfit` display typography, and Tailwind v4 theming.

---

## 🚀 Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + file-based routing + Vite 7)
- **Styling:** Tailwind CSS v4 with native CSS `@theme` variables
- **UI Primitives:** shadcn/ui components (Radix UI + `class-variance-authority`)
- **Fonts:** Outfit (display), Inter (body)
- **Icons:** Lucide React
- **Charts:** Recharts (ready for premium analytics phase)
- **State:** TanStack Query (data fetching patterns staged)
- **Validation:** Zod
- **Package Manager:** Bun

---

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- Node.js-compatible environment (local dev runs on Vite; SSR targets Cloudflare Workers via Lovable Cloud)

### Install & Run

```bash
bun install
bun run dev
```

Open `http://localhost:3000` to view the app.

### Build

```bash
bun run build
```

### Lint & Format

```bash
bun run lint
bun run format
```

---

## 📁 Project Structure

```text
src/
  components/       Reusable UI components (BottomNav, MatchCard, AthleteCard, NewsCard, TopBar, etc.)
  components/ui/    shadcn/ui primitive components
  hooks/            Custom React hooks (e.g., use-mobile)
  lib/              Utilities, mock data, and helper functions
  routes/           TanStack Start file-based routes
  styles.css        Global theme, fonts, and custom utilities
  router.tsx        Router configuration
  start.ts          TanStack Start entry configuration
  server.ts         Server entry
```

Key routes:

- `/` — Home dashboard with live matches, featured athletes, and rankings
- `/scores` — Match center with sport and status filters
- `/athletes` — Athlete directory
- `/athletes/:id` — Athlete detail page
- `/news` — News feed
- `/profile` — User profile / settings dashboard
- `/trust` — Trust, privacy, and security information

---

## 🎨 Design System

The visual identity is built around a premium women's-sports-first palette:

- **Primary Pink:** `#FF4FA3` — energy, passion, action
- **Deep Purple:** `#5B2C83` — premium, authoritative
- **Soft Gold:** `#D4AF37` — excellence, achievement

Custom utilities include:

- `.gradient-brand` — pink-to-purple brand gradient
- `.shadow-brand` — colored drop shadow for cards
- `.pulse-live` — live-indicator animation

---

## 📱 Current Scope

This is a **visual MVP** with sample data, built to validate the user experience and design direction before adding:

- Lovable Cloud authentication
- Real-time data feeds / third-party sports APIs
- Followed athletes, teams, and competitions
- AI-powered athlete spotlights and insights
- Premium subscription tiers
- Fantasy leagues, highlights, ticketing, and merchandise

---

## 🤝 Contributing

This is an early-stage project. Feedback on the design, routes, and component structure is welcome. Please keep changes aligned with the women's-first design philosophy and the TanStack Start conventions documented in `src/routes/README.md`.

---

## 📄 License

Proprietary — HerScore. All rights reserved.

---

Built with care in Lovable using TanStack Start.
