import { useState } from 'react'
import { CITIES, CITY_KEYS } from '../data/cities'
import { FILTERS } from '../lib/filters'
import type { CityKey, FilterKey } from '../types'
import type { View } from './Nav'

interface FiltersProps {
  city: CityKey
  onCityChange: (city: CityKey) => void
  filters: FilterKey[]
  onFiltersChange: (filters: FilterKey[]) => void
  view: View
}

export function Filters({ city, onCityChange, filters, onFiltersChange, view }: FiltersProps) {
  const [open, setOpen] = useState(false)
  const availableFilters = CITIES[city].filters

  function toggleFilter(key: FilterKey, checked: boolean) {
    onFiltersChange(checked ? [...filters, key] : filters.filter((value) => value !== key))
  }

  return (
    <div
      id="filters"
      className={`filters ${view === 'list' ? 'scale-up' : ''} ${open ? 'active scale-up' : ''}`}
      onClick={() => setOpen(true)}
    >
      <div className="filters__popup">
        <div className="filters__header">
          <span className="filters__title">Filtres</span>
          <span
            className="filters__close"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(false)
            }}
          >
            <svg
              className="filters__cross"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z" />
            </svg>
          </span>
        </div>
        <div className="filters__body">
          <select
            className="filters__cities"
            value={city}
            onChange={(event) => onCityChange(event.target.value as CityKey)}
          >
            {CITY_KEYS.map((key) => (
              <option key={key} value={key}>
                {CITIES[key].name}
              </option>
            ))}
          </select>
          {availableFilters.map((key) => (
            <label key={key} htmlFor={`filter-${key}`}>
              {FILTERS[key].label}
              <input
                id={`filter-${key}`}
                type="checkbox"
                checked={filters.includes(key)}
                onChange={(event) => toggleFilter(key, event.target.checked)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
