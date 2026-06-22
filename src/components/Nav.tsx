export type View = 'map' | 'list'

interface NavProps {
  view: View
  onChange: (view: View) => void
}

export function Nav({ view, onChange }: NavProps) {
  return (
    <header>
      <nav className="list--switch">
        <ul>
          <li
            className={`map item ${view === 'map' ? 'active' : ''}`}
            onClick={() => onChange('map')}
          >
            Map
          </li>
          <li
            className={`list item ${view === 'list' ? 'active' : ''}`}
            onClick={() => onChange('list')}
          >
            Liste
          </li>
          <li id="activer" className={view === 'map' ? 'map' : 'list'} />
        </ul>
      </nav>
    </header>
  )
}
