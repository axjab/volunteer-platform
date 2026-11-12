# VolunteerOS STEM Impact Hub — Advanced TypeScript POC

This project is a **frontend proof of concept** for an employee volunteering platform where users can:

- Browse **STEM youth volunteering opportunities**
- Track **volunteer hours & progress**
- View **reward tiers and milestones**
- Compare performance on a **leaderboard**
- Navigate with a **responsive sidebar + mobile bottom nav**

It uses an **advanced TypeScript architecture** with stricter domain models, typed filters, reusable UI components, and clean separation of concerns.

---

## Tech Stack

- **React** + **TypeScript**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **Recharts** (progress chart)
- **lucide-react** (icons)

---

## Features

### Catalogue (Opportunities)
- Search + filter by:
  - category
  - format (Virtual / In-person / Hybrid)
  - location
- Strong typing for filter state and option lists
- Reusable `OpportunityCard` + `OpportunityFilters` components

### Progress
- Displays:
  - chart of volunteer hours over time
  - completed activities list
  - milestone / reward panel
- Typed chart data via `ProgressEntry`

### Rewards
- Shows:
  - reward cards (unlocked/locked styles)
  - reward snapshot summary
- Typed reward model with milestone metadata

### Leaderboard
- Filters by:
  - department
  - timeframe
- Includes ranking-ready utilities (sorting/filtering helpers)

### Profile
- Shows user summary:
  - hours, activities, points, badges
  - reward history

### Navigation / Layout
- **Desktop:** left sidebar
- **Mobile:** sticky **bottom navigation**
- Shared app shell with typed `children`

---

## Architecture (Advanced TypeScript)

The project is organized to emphasize maintainability and type safety:

```
src/
  app/          # app shell + routing
  components/   # feature components grouped by area
  data/         # mock data
  domain/       # domain models + constants
  lib/          # typed utilities (filter/sort/format)
  pages/        # screen-level composition
  types/        # (optional) shared/global TS helpers
  ui/           # reusable UI primitives
```

### Highlights
- **Strict domain modeling**
  - `domain/models.ts` defines entity types like `Opportunity`, `UserProfile`, `Reward`, etc.
  - `domain/constants.ts` defines literal unions derived from arrays (`as const`)
- **Typed filter state**
  - Filters are typed and validated by TS unions (e.g., `Department | "All"`)
- **Reusable filter/sort utilities**
  - `lib/opportunities.ts`, `lib/leaderboard.ts`, `lib/rewards.ts`
- **Clean component boundaries**
  - UI components are focused and reusable
  - Pages compose feature components (presentation-first POC)

---

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run the dev server
```bash
npm run dev
```

### 3) Build (typecheck + bundle)
```bash
npm run build
```

---

## Folder Explanation

- **`src/domain/`**
  - Central definitions for categories, formats, departments, and entities.
- **`src/lib/`**
  - Filtering/sorting/formatting logic with strong input/output types.
- **`src/components/`**
  - Feature-level widgets (catalogue, leaderboard, progress, rewards, profile).
- **`src/components/ui/`**
  - Small reusable primitives like `Card`, `Button`, `BadgePill`, `ProgressBar`.
- **`src/app/`**
  - `router.tsx` defines routes, `AppShell.tsx` defines layout.

---

## Notes / Customization

- The project currently uses **mock data** (`src/data/mockData.ts`).
- To connect it to a backend later, add a typed API layer:
  - `src/services/api.ts` (fetch functions)
  - `src/services/types.ts` (DTOs -> map to domain models)

---
