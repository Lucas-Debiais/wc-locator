import { useState } from 'react'
import { Nav, type View } from './components/Nav'
import { MapView } from './components/MapView'
import { ToiletList } from './components/ToiletList'
import { Filters } from './components/Filters'
import { CITIES } from './data/cities'
import { applyFilters } from './lib/filters'
import { useToilets } from './hooks/useToilets'
import type { CityKey, FilterKey } from './types'

export function App() {
  const [view, setView] = useState<View>('map')
  const [city, setCity] = useState<CityKey>('nantes')
  const [filters, setFilters] = useState<FilterKey[]>([])

  const { toilets } = useToilets(city)
  const visibleToilets = applyFilters(toilets, filters)

  function handleCityChange(next: CityKey) {
    setCity(next)
    // Drop filters the new city does not support so the UI can't get stuck.
    setFilters((current) => current.filter((key) => CITIES[next].filters.includes(key)))
  }

  return (
    <div className="App">
      <Nav view={view} onChange={setView} />
      <MapView toilets={visibleToilets} center={CITIES[city].center} active={view === 'map'} />
      <ToiletList toilets={visibleToilets} active={view === 'list'} />
      <Filters
        city={city}
        onCityChange={handleCityChange}
        filters={filters}
        onFiltersChange={setFilters}
        view={view}
      />
    </div>
  )
}
