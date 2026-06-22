import type { CityConfig, CityKey, Toilet } from '../types'

/**
 * Each city exposes an OpenDataSoft v1 "records" API, but with different field
 * names, value conventions and (historically) coordinate shapes. The per-city
 * `normalize` functions below are the single place that knows about those
 * quirks; the rest of the app only ever sees the normalized {@link Toilet}.
 */

interface OdsRecord {
  recordid: string
  fields: Record<string, unknown>
}

interface OdsResponse {
  records?: OdsRecord[]
}

// Read-only OpenDataSoft API key for the Nantes dataset, provided via env
// (.env; see .env.example). It ships in the client bundle like any browser key.
const NANTES_API_KEY = import.meta.env.VITE_NANTES_API_KEY

function str(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null
}

/** Turn machine values such as "SANITAIRE_AUTOMATIQUE" into "sanitaire automatique". */
function humanize(value: unknown): string | null {
  const text = str(value)
  return text ? text.replace(/_/g, ' ').toLowerCase() : null
}

/** Normalize the many "yes/no" conventions ("oui", "OUI", "Oui", 1/0…). */
function parseBool(value: unknown): boolean | null {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value === 1
  const normalized = String(value).trim().toLowerCase()
  if (['oui', 'yes', 'true', '1'].includes(normalized)) return true
  if (['non', 'no', 'false', '0'].includes(normalized)) return false
  return null
}

/**
 * Extract `[longitude, latitude]` from a record. Handles a `geo_shape` Point
 * (flat `[lng, lat]`, or the legacy nested `[[lng, lat]]`) and falls back to
 * `geo_point_2d`, which OpenDataSoft stores as `[lat, lng]`.
 */
function readLngLat(fields: Record<string, unknown>): [number, number] | null {
  const shape = fields.geo_shape as { coordinates?: unknown } | undefined
  const coordinates = shape?.coordinates
  if (Array.isArray(coordinates)) {
    const point = Array.isArray(coordinates[0]) ? coordinates[0] : coordinates
    const [lng, lat] = point as unknown[]
    if (typeof lng === 'number' && typeof lat === 'number') return [lng, lat]
  }
  const point2d = fields.geo_point_2d
  if (Array.isArray(point2d) && typeof point2d[0] === 'number' && typeof point2d[1] === 'number') {
    return [point2d[1], point2d[0]]
  }
  return null
}

/** Interpret a free-text status field as "in service". */
function isInService(status: string | null): boolean | null {
  if (!status) return null
  if (/hors service|ferm/i.test(status)) return false
  if (/en service|ouvert/i.test(status)) return true
  return null
}

/** Build a {@link Toilet} from a record, or `null` when it has no usable location. */
function toToilet(
  record: OdsRecord,
  fields: Omit<Toilet, 'id' | 'longitude' | 'latitude'>,
): Toilet | null {
  const lngLat = readLngLat(record.fields)
  if (!lngLat) return null
  return { id: record.recordid, longitude: lngLat[0], latitude: lngLat[1], ...fields }
}

async function fetchOds(
  url: string,
  normalize: (record: OdsRecord) => Toilet | null,
  signal: AbortSignal,
  init?: RequestInit,
): Promise<Toilet[]> {
  const response = await fetch(url, { ...init, signal })
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`)
  }
  const data = (await response.json()) as OdsResponse
  return (data.records ?? []).map(normalize).filter((toilet): toilet is Toilet => toilet !== null)
}

export const CITIES: Record<CityKey, CityConfig> = {
  nantes: {
    name: 'Nantes',
    center: { longitude: -1.553621, latitude: 47.218371 },
    filters: ['pmr', 'open'],
    fetchToilets: (signal) =>
      fetchOds(
        'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&q=&rows=-1',
        (record) =>
          toToilet(record, {
            name: str(record.fields.nom) ?? 'Toilettes publiques',
            wheelchair: parseBool(record.fields.accessibilite_pmr),
            hours: null,
            type: str(record.fields.type_wc),
            open: isInService(str(record.fields.etat)),
          }),
        signal,
        { headers: { Authorization: `Apikey ${NANTES_API_KEY}` } },
      ),
  },
  bordeaux: {
    name: 'Bordeaux',
    center: { longitude: -0.5667, latitude: 44.8378 },
    filters: ['pmr'],
    fetchToilets: (signal) =>
      fetchOds(
        'https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=bor_sigsanitaire&q=&rows=-1&facet=type&facet=handi',
        (record) =>
          toToilet(record, {
            name: str(record.fields.adresse) ?? 'Toilettes publiques',
            wheelchair: parseBool(record.fields.handi),
            hours: null,
            type: humanize(record.fields.type),
            open: null,
          }),
        signal,
      ),
  },
  paris: {
    name: 'Paris',
    center: { longitude: 2.333333, latitude: 48.866667 },
    filters: ['pmr', 'open'],
    fetchToilets: (signal) =>
      fetchOds(
        'https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=-1&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe',
        (record) =>
          toToilet(record, {
            name: str(record.fields.adresse) ?? 'Toilettes publiques',
            wheelchair: parseBool(record.fields.acces_pmr),
            hours: str(record.fields.horaire),
            type: str(record.fields.type),
            open: isInService(str(record.fields.statut)),
          }),
        signal,
      ),
  },
  rennes: {
    name: 'Rennes',
    center: { longitude: -1.6833, latitude: 48.1025 },
    filters: ['pmr', 'open'],
    fetchToilets: (signal) =>
      fetchOds(
        'https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=toilettes_publiques_vdr&q=&rows=-1',
        (record) =>
          toToilet(record, {
            name: str(record.fields.nom) ?? 'Toilettes publiques',
            wheelchair: parseBool(record.fields.acces_pmr),
            hours: str(record.fields.horaires),
            type: str(record.fields.type_wc),
            open: isInService(str(record.fields.etat)),
          }),
        signal,
      ),
  },
}

export const CITY_KEYS = Object.keys(CITIES) as CityKey[]
