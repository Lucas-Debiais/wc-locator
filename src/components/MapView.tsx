import { useEffect, useRef, useState } from 'react'
import Map, { GeolocateControl, Marker, Popup, type MapRef } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ToiletBadges } from './ToiletBadges'
import type { LngLat, Toilet } from '../types'

// The Mapbox token is injected at build time from VITE_MAPBOX_TOKEN (.env; see
// .env.example). It is a public `pk.*` token and ships in the client bundle by
// design. The custom style is a public project style.
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN
const MAP_STYLE = 'mapbox://styles/biaisde/cldmvdrni001901lit40lmaww'
const DEFAULT_ZOOM = 12

interface MapViewProps {
  toilets: Toilet[]
  center: LngLat
  active: boolean
}

export function MapView({ toilets, center, active }: MapViewProps) {
  const mapRef = useRef<MapRef | null>(null)
  const [selected, setSelected] = useState<Toilet | null>(null)

  // Recenter on the selected city by driving the existing map, rather than
  // recreating it: a remount would reset the zoom and geolocation tracking, and
  // would re-init the GL canvas at 0x0 if the city is changed from list view
  // (where the map container is `display:none`). Also drop any popup that was
  // pinned to the previous city.
  useEffect(() => {
    setSelected(null)
    mapRef.current?.flyTo({ center: [center.longitude, center.latitude] })
  }, [center.longitude, center.latitude])

  // Mapbox caches its canvas size and only re-measures on a window resize. The
  // map lives in a `display:none` container while the list view is shown, so
  // ask it to re-measure whenever it becomes visible again.
  useEffect(() => {
    if (active) mapRef.current?.resize()
  }, [active])

  return (
    <div id="map" className={active ? 'd-block' : ''}>
      <div className="map-container">
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle={MAP_STYLE}
          initialViewState={{ ...center, zoom: DEFAULT_ZOOM }}
          style={{ width: '100%', height: '100%' }}
        >
          <GeolocateControl
            position="top-right"
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
            showUserHeading
          />
          {toilets.map((toilet) => (
            <Marker
              key={toilet.id}
              longitude={toilet.longitude}
              latitude={toilet.latitude}
              onClick={(event) => {
                event.originalEvent.stopPropagation()
                setSelected(toilet)
              }}
            >
              <div className="marker" />
            </Marker>
          ))}
          {selected && (
            <Popup
              longitude={selected.longitude}
              latitude={selected.latitude}
              offset={25}
              onClose={() => setSelected(null)}
            >
              <h3>{selected.name}</h3>
              <p className="popup-list">
                <ToiletBadges toilet={selected} />
              </p>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  )
}
