import { useGeolocation } from '../hooks/useGeolocation'
import { distanceInKm } from '../lib/distance'
import { ToiletBadges } from './ToiletBadges'
import type { Toilet } from '../types'

interface ToiletListProps {
  toilets: Toilet[]
  active: boolean
}

/** Google Maps directions from the user (when known) to a toilet. */
function directionsUrl(toilet: Toilet, latitude: number | null, longitude: number | null): string {
  const destination = `${toilet.latitude},${toilet.longitude}`
  const origin = latitude !== null && longitude !== null ? `${latitude},${longitude}` : ''
  return `https://www.google.fr/maps/dir/${destination}/${origin}`
}

export function ToiletList({ toilets, active }: ToiletListProps) {
  const { latitude, longitude } = useGeolocation()
  const hasLocation = latitude !== null && longitude !== null

  // Sort nearest-first once we know where the user is; otherwise keep API order.
  const rows = toilets
    .map((toilet) => ({
      toilet,
      distance: hasLocation
        ? distanceInKm(latitude, longitude, toilet.latitude, toilet.longitude)
        : null,
    }))
    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))

  return (
    <div id="list--WC" className={active ? 'd-flex' : ''}>
      {rows.map(({ toilet, distance }) => (
        <a
          key={toilet.id}
          className="WC"
          target="_blank"
          rel="noreferrer"
          href={directionsUrl(toilet, latitude, longitude)}
        >
          <div className="WC__infos">
            <h2 className="WC__title">{toilet.name}</h2>
            <div className="WC__filters">
              <ToiletBadges toilet={toilet} />
            </div>
          </div>
          {distance !== null && (
            <span className="WC__distance">{Math.round(distance * 100) / 100} km</span>
          )}
        </a>
      ))}
    </div>
  )
}
