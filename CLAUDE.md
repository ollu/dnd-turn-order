# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

D&D Turn Order Tracker - A Nuxt 3 / Vue 3 Progressive Web App for managing combat encounters in tabletop RPGs. Features real-time synchronization across multiple users via Supabase.

## Development Commands

```bash
yarn install      # Install dependencies
yarn dev          # Start dev server at http://localhost:3000
yarn build        # Build for production
yarn generate     # Generate static site
yarn preview      # Preview production build
```

## Architecture

**Stack:** Nuxt 3, Vue 3, Pinia (state), Supabase (backend/auth/realtime), Tailwind CSS, Vite PWA

**Key configuration:**
- SSR disabled (`ssr: false` in nuxt.config.ts) - runs as client-side SPA
- Auto-imports enabled for components, stores, and composables
- PWA with service worker and offline support

### State Management

Single Pinia store at `stores/supabase.ts` manages all application state:
- Player/monster CRUD operations
- Game session management
- Real-time subscriptions via Supabase PostgreSQL change notifications
- Sorting logic (by initiative, last-in-turn status)

### Real-time Sync Pattern

Uses Supabase's `.subscribe()` for live updates:
```typescript
subscribeToPlayersChanges()  // Listens for player/monster changes
subscribeToGameChanges()     // Listens for game updates
```
When any client modifies data, all connected clients receive updates automatically.

### Authentication

- Supabase Auth with email/password
- Route protection via `middleware/auth.js`
- Unauthenticated pages use `NoAccess` layout

### Component Patterns

- Modal components use `ModalWrapper.vue` with named slots (#title, #body, #footer)
- Icons via `OIcon.vue` component using SVG paths from `assets/icons.js`
- Custom button styling via `OButton.vue`

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `pages/` | Auto-routed pages (index, login, fumble-charts) |
| `components/` | Vue components (PlayersList, modals, forms) |
| `stores/` | Pinia store (supabase.ts - main state) |
| `layouts/` | Page layouts (default, NoAccess, FumbleChart) |
| `middleware/` | Route middleware (auth protection) |
| `assets/` | Icons, CSS, fumble chart JSON data |

## Database Tables (Supabase)

- `games` - Game sessions (uuid, turnCounter, fumble)
- `players` - Characters/monsters (id, name, initiative, conditions, isHero, lastInTurn)
- `conditions` - Available status conditions

## Tailwind Theme

Custom extensions in `tailwind.config.js`:
- Color: `blood` (#D80000) for error/important states
- Animations: `grow`, `rise` for D&D theming
