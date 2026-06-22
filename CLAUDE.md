# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

WC Locator — a mobile-first PWA that maps public toilets ("toilettes publiques") across French cities (Nantes, Bordeaux, Paris, Rennes). Each city's data is fetched live from its public open-data API; there is no backend of our own. UI is in French.

## Commands

```bash
npm run dev        # Vite dev server over HTTPS (vite-plugin-mkcert)
npm run build      # tsc -b (type-check) then vite build -> dist/
npm run preview    # serve the production build
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc -b, no emit
npm run format     # Prettier write
```

Copy `.env.example` to `.env` and set `VITE_MAPBOX_TOKEN` (a public Mapbox `pk.*` token) before running — the map is blank without it.

No test runner is configured. The dev server runs over **HTTPS by design**: the Geolocation/DeviceOrientation APIs the app relies on need a secure context, so plain HTTP breaks the GPS/distance features.

Stack: Vite 8, React 19, TypeScript 6 (project-reference tsconfig: `tsconfig.app.json` for `src`, `tsconfig.node.json` for `vite.config.ts`), react-map-gl 8 + mapbox-gl 3, Sass (`@use`).

## Architecture

Entry chain: `index.html` → `src/main.tsx` → `src/App.tsx`. `src/` is organized in layers:

- `types.ts` — the shared `Toilet` model, `CityKey`, `CityConfig`, `FilterKey`.
- `data/cities.ts` — the `CITIES` config and the **only place that knows per-city quirks**.
- `hooks/` — `useToilets` (data fetching), `useGeolocation`.
- `lib/` — pure helpers: `distance.ts` (Haversine), `filters.ts` (filter registry).
- `components/` — `Nav`, `MapView`, `ToiletList`, `Filters`, `ToiletBadges`.

### State lives in `App.tsx`

`App` owns `view` (`"map" | "list"`), `city` (`CityKey`), and `filters` (`FilterKey[]`). It calls `useToilets(city)` **once** and passes the filtered list to both views (the two views no longer fetch independently). Both views stay mounted and are toggled with CSS classes (`d-block` / `d-flex`). Changing city prunes any active filters the new city doesn't support.

### The data layer is the heart of the app (`data/cities.ts`)

Every city exposes an **OpenDataSoft v1** `records/1.0/search` API, but with different field names, value conventions, and (historically) coordinate shapes. Each `CITIES[key].fetchToilets(signal)` fetches that city's records and maps them to the normalized `Toilet` shape via a per-city `normalize` function. The rest of the app only ever sees `Toilet` — it is city-agnostic.

Shared normalization helpers (also in `cities.ts`):

- `readLngLat` — handles a `geo_shape` Point (flat `[lng,lat]`, or legacy nested `[[lng,lat]]`) and falls back to `geo_point_2d` (`[lat,lng]`).
- `parseBool` — collapses the many PMR conventions (`"oui"/"non"`, `"OUI"/"NON"`, `"Oui"/"Non"`, `1/0`) into a boolean.
- `isInService` — interprets a free-text status field (`etat`/`statut`) as open/closed.

**Open-data schemas drift over time.** When a city looks broken, probe its live API first (`curl '<url>&rows=1'` and inspect `records[0].fields`) and fix only that city's `normalize` — never special-case fields in the components. The v1 endpoints are deprecated upstream (OpenDataSoft pushes Explore v2.1); a future migration may be needed.

### Adding (or fixing) a city

Add an entry to `CITIES` with `name`, `center`, the supported `filters`, and a `fetchToilets` that calls `fetchOds(url, normalize, signal, init?)`. Add the key to the `CityKey` union in `types.ts`. Nothing else needs to change — the selector, map, list and filters are all driven by `CITIES`.

> Lille was removed: its open-data was dropped during a platform migration and has no JSON replacement. Re-add it here if a source reappears.

### Map (`components/MapView.tsx`)

Declarative react-map-gl (imported from `react-map-gl/mapbox`). `<Map>` has no `className`, so it's wrapped in `div.map-container` and sized to fill it — that keeps the existing `_map.scss` selectors (`.map-container .marker`, `.mapboxgl-popup-content .popup-list`, `.mapboxgl-ctrl-*`) matching. A single map instance is kept and driven through a ref: it `flyTo`s the new center on city change (clearing the popup) and `resize()`s whenever the map view becomes visible again (it lives in a `display:none` container in list view, where mapbox would otherwise keep a stale/zero size). Markers render a `<div className="marker">`; clicking one opens a `<Popup>`. The Mapbox token comes from `import.meta.env.VITE_MAPBOX_TOKEN` (`.env`, documented in `.env.example`); the custom style URL is hardcoded. The Nantes API key remains hardcoded in `cities.ts`.

### Filters are data-driven

`CityConfig.filters` lists which `FilterKey`s are meaningful for a city; `lib/filters.ts` maps each key to a label + predicate over a `Toilet`. `Filters.tsx` renders a checkbox per supported filter, so there is no per-city UI branching.

## Styling

Sass with `@use`. `style/main.scss` is the single entry (imported once from `main.tsx`) and `@use`s the partials; each partial pulls variables with `@use 'variables' as *`. Google Fonts is loaded via `<link>` in `index.html`. View visibility is driven by class toggles set from `view`.

## PWA

Configured in `vite.config.ts` via `vite-plugin-pwa` (`registerType: 'autoUpdate'`). Manifest and icons live in `public/`.
