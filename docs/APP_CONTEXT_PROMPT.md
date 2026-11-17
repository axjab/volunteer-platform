# Full application context prompt

Use this prompt when starting a new AI-assisted development session in this repository. Its purpose is to produce a reliable, high-level and implementation-level understanding of the application before code changes are proposed.

---

## Prompt

You are joining an existing application as a senior product-minded frontend engineer. Your first task is to build a complete, evidence-based understanding of this repository so that future implementation work fits its existing product model, architecture, conventions, and user experience.

**Repository:** `axjab/volunteer-platform`  
**Product name shown in the UI:** VolunteerOS — STEM Impact Hub

Do not assume that the README is fully current or that an apparent feature is fully implemented. Treat the checked-out source as authoritative. Inspect the repository before recommending or changing anything. Do not edit files during this discovery task.

### 1. Establish the repository baseline

1. Inspect the complete repository tree, excluding generated dependencies and build output such as `node_modules/` and `dist/`.
2. Read the README, package manifest and lockfile metadata, TypeScript/Vite/Tailwind/ESLint configuration, entry points, routing, domain definitions, mock data, page components, feature components, shared UI components, and utility modules.
3. Identify the active branch and working-tree state when those are available.
4. Identify scripts for development, production builds, linting, tests, formatting, and deployment. Do not claim a check exists unless it is configured.
5. Report important files by path. Follow imports and data usage rather than inferring responsibility from filenames alone.

### 2. Explain the product at a high level

Describe:
- The product's intended users, primary purpose, and main user journeys.
- What the employee-volunteering / youth-STEM domain means in this application.
- How opportunities connect to volunteering, progress tracking, recognition, and organisational reporting.
- Any company, programme, or partner assumptions visible in the UI and data.
- Which parts are demonstrable proof-of-concept behavior and which parts are production-ready integrations.

The current product is a frontend proof of concept for an employee-volunteering platform focused on STEM opportunities for young people. The visible sections include a dashboard, opportunity catalogue, progress, rewards, leaderboard, and user profile. Validate this description against the current code and note any changes.

### 3. Map navigation and features

Trace the route definitions and explain each page:
- `/dashboard`: programme and volunteer metrics, department charts, recent activity, ROI/partnership/engagement summaries, export affordance, and growth simulation.
- `/catalogue`: opportunity search and filters, opportunity cards, opportunity details, sign-up interaction, and opportunity-notification preferences.
- `/progress`: monthly volunteer-hours chart, next milestone, rewards status, and completed activities.
- `/rewards`: reward cards and current/next recognition summaries.
- `/leaderboard`: department selection, timeframe control, ranking table, and sorting/filtering behavior.
- `/profile`: volunteer summary, milestones, reward history, recent activities, and notification preferences.

For each page, distinguish what the interface displays from what its handlers actually do. Trace every important button and form far enough to determine whether it updates local state, browser storage, a mock service, or a backend.

### 4. Reconstruct the architecture and data flow

Describe the responsibilities and dependencies of the main source areas:

- `src/main.tsx`, `src/app/App.tsx`, and `src/app/router.tsx`: application bootstrap, router, and route composition.
- `src/components/layout/`: shared desktop sidebar, top bar, mobile navigation, and application shell.
- `src/pages/`: route-level composition.
- `src/components/<feature>/`: feature-specific UI for catalogue, leaderboard, progress, profile, rewards, and notifications.
- `src/components/ui/`: reusable presentation primitives.
- `src/domain/constants.ts` and `src/domain/models.ts`: canonical literal options and TypeScript domain contracts.
- `src/data/mockData.ts`: seeded users, activities, rewards, leaderboard entries, and opportunities.
- `src/lib/`: filtering, sorting, formatting, notification, export, and class-name helpers.
- `src/utils/`: mock activity and time-series simulation helpers.
- `src/config/appConfig.ts`: application-level feature/data configuration.

Trace the actual imports and data flow. Explain where state lives, how props cross component boundaries, how derived lists are computed, and which components own dialogs or transient interactions. Identify duplicated types or constants rather than silently treating them as canonical.

### 5. Catalogue and domain details

Read the full `Opportunity`, `OpportunityFiltersState`, and related domain definitions. Document every field, its type, optionality, and where it is consumed. Explain:
- Which category, format, and location options are available.
- How search matching works and which opportunity fields are searched.
- How each filter is combined with the others.
- How opportunity details and sign-up are presented.
- Whether sign-up is persisted or submitted anywhere.
- How an opportunity is added safely without breaking dashboard metrics or other consumers of the seed data.

Also inspect the other domain entities (`UserProfile`, `Activity`, `ProgressEntry`, `Reward`, `LeaderboardUser`) and their relationships to pages and utilities.

### 6. State, persistence, and integrations

For every stateful feature, document:
- State owner and initial value.
- State transitions and event handlers.
- Derived values and memoization.
- Persistence mechanism and storage key, where applicable.
- Any polling, timers, browser APIs, or external services.

In particular, verify the boundary between mock and real data. The current configuration has `AppConfig.USE_MOCK_DATA` set to `true`; inspect whether the alternate path is a real API or only illustrative sample data. Do not describe localStorage as a backend. Do not imply notifications, registrations, email, exports, or analytics are delivered externally unless the code proves it.

### 7. UI system and accessibility

Describe the visual conventions from the actual source:
- Dark application background and card surfaces.
- Typography, border, spacing, and accent-color patterns.
- Tailwind utility conventions and the `cn` helper.
- Shared component APIs and when to reuse them.
- Desktop sidebar versus mobile bottom navigation behavior.
- Responsive layout patterns.

Inspect semantic HTML and accessibility behavior for labels, form controls, dialogs, buttons, navigation, and charts. Record missing labels, keyboard/focus issues, or controls that look interactive but are not wired.

### 8. Technical constraints and quality checks

Summarize:
- Runtime, framework, router, UI/styling, charting, icon, and TypeScript versions from `package.json`.
- TypeScript strictness and relevant compiler settings.
- ESLint configuration and enabled React Hooks/refresh rules.
- Exact configured npm scripts.
- Existing automated tests and CI workflows, if any.
- Current build/lint status only when you have actually run those commands; otherwise say they were not run.

Do not add dependencies for simple UI changes. Preserve the current React + TypeScript + Tailwind approach unless there is a strong, evidenced reason not to.

### 9. Identify implementation gaps and risks

Create a clearly separated list of:
- Confirmed bugs or mismatches between UI and implementation.
- Features that are visual placeholders or mocked.
- Data inconsistencies or duplicated sources of truth.
- Missing validation, empty states, responsiveness, or accessibility.
- Potential regression points when extending shared models or seed data.

For every finding, give the exact file path and explain its practical impact. Separate confirmed issues from hypotheses and avoid expanding the task into unrelated refactoring.

### 10. Deliver the context report

Return a compact but comprehensive engineering handoff using these headings:

1. **Product and users** — purpose, audiences, key journeys.
2. **Feature and route map** — each route, visible behavior, and actual behavior.
3. **Architecture map** — major folders, important files, and dependencies.
4. **Domain model** — entities, fields, types, and relationships.
5. **Data and state flow** — state ownership, filtering, derived data, persistence.
6. **UI system** — styling, reusable components, responsive and accessibility patterns.
7. **Runtime and developer workflow** — dependencies, scripts, compiler/linter, tests and CI.
8. **Known limitations and risks** — evidence-backed findings with file paths.
9. **Safe extension guide** — where to implement common changes and which consumers to check.
10. **Open questions** — anything that cannot be established from repository evidence.

Be specific. Prefer tables for routes, entities, and important files. Reference source paths for every implementation-level claim. Mark each capability as **implemented**, **mocked/demo-only**, **placeholder**, or **not present** where that distinction matters. Do not fabricate infrastructure, business rules, product requirements, test results, or deployment details.

Finish with a short reusable context summary that another engineer or AI assistant can use to begin a later task without re-reading your entire report.