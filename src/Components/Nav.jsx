export const Nav = ({setSelectedRoute, selectedRoute}) => {
    const dList = () => {
        setSelectedRoute('list')
    }

    const dMap = () => {
        setSelectedRoute('map')
    }

    return (
        <header>
            <nav className="list--switch">
                <ul>
                    <li onClick={dMap} className={`map item ${selectedRoute === "map" ? "active" : ""}`}>Map</li>
                    <li onClick={dList} className={`list item ${selectedRoute === "list" ? "active" : ""}`}>Liste</li>
                    <li id="activer" className={selectedRoute === "map" ? "map" : "list"}></li>
                </ul>
            </nav>
        </header>
    )
}