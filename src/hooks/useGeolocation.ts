import { useEffect, useState } from 'react'

export interface Coordinates {
  latitude: number | null
  longitude: number | null
}

/** Tracks the device location via `watchPosition`, cleaning up on unmount. */
export function useGeolocation(): Coordinates {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  })

  useEffect(() => {
    if (!('geolocation' in navigator)) return

    const watchId = navigator.geolocation.watchPosition(
      (position) =>
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => console.warn(`Geolocation error (${error.code}): ${error.message}`),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return coordinates
}
