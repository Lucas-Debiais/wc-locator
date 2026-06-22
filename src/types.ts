/** A city for which a public-toilets open-data source is configured. */
export type CityKey = 'nantes' | 'bordeaux' | 'paris' | 'rennes'

/** A public toilet, normalized to a single shape across every city source. */
export interface Toilet {
  id: string
  name: string
  longitude: number
  latitude: number
  /** Wheelchair accessible (PMR). `null` when the source says nothing. */
  wheelchair: boolean | null
  /** Free-text opening hours, when the source provides them. */
  hours: string | null
  /** Free-text kind of installation (e.g. "Automatique"). */
  type: string | null
  /** In service / open. `null` when the source has no status field. */
  open: boolean | null
}

/** Filters the user can toggle. Each city advertises the ones it supports. */
export type FilterKey = 'pmr' | 'open'

export interface LngLat {
  longitude: number
  latitude: number
}

export interface CityConfig {
  /** Display name shown in the city selector. */
  name: string
  /** Default map center for the city. */
  center: LngLat
  /** Filters that are meaningful for this city's data. */
  filters: FilterKey[]
  /** Fetches and normalizes the city's toilets. */
  fetchToilets: (signal: AbortSignal) => Promise<Toilet[]>
}
