import type { Toilet } from '../types'

/**
 * The opening-hours / type / wheelchair pills shown for a toilet, shared by the
 * list rows and the map popup. Each pill only renders when its data exists.
 */
export function ToiletBadges({ toilet }: { toilet: Toilet }) {
  return (
    <>
      {toilet.hours && (
        <span className="WC__horaire">
          <span>{toilet.hours}</span>
        </span>
      )}
      {toilet.type && (
        <span className="WC__type">
          <span>{toilet.type}</span>
        </span>
      )}
      {toilet.wheelchair && <span className="WC__pmr" />}
    </>
  )
}
