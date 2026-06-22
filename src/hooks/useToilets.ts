import { useEffect, useState } from 'react'
import { CITIES } from '../data/cities'
import type { CityKey, Toilet } from '../types'

export interface ToiletsState {
  toilets: Toilet[]
  loading: boolean
  error: Error | null
}

/** Fetches and normalizes the toilets for a city, re-running when it changes. */
export function useToilets(city: CityKey): ToiletsState {
  const [state, setState] = useState<ToiletsState>({
    toilets: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    setState({ toilets: [], loading: true, error: null })

    CITIES[city]
      .fetchToilets(controller.signal)
      .then((toilets) => setState({ toilets, loading: false, error: null }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          toilets: [],
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        })
      })

    return () => controller.abort()
  }, [city])

  return state
}
