import type { FilterKey, Toilet } from '../types'

export interface FilterDefinition {
  label: string
  predicate: (toilet: Toilet) => boolean
}

export const FILTERS: Record<FilterKey, FilterDefinition> = {
  pmr: { label: 'Accessible PMR', predicate: (toilet) => toilet.wheelchair === true },
  open: { label: 'En service', predicate: (toilet) => toilet.open === true },
}

/** Keep only the toilets matching every active filter. */
export function applyFilters(toilets: Toilet[], active: FilterKey[]): Toilet[] {
  if (active.length === 0) return toilets
  return toilets.filter((toilet) => active.every((key) => FILTERS[key].predicate(toilet)))
}
