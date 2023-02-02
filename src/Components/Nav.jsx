export const Nav = () => {
    const dList = () => {
        document.getElementById('list--WC').classList.add('d-flex')
        document.querySelector('.list').classList.add('active')
        document.querySelector('.map').classList.remove('active')
        document.getElementById('map').classList.remove('d-block')
        document.getElementById('activer').classList.add('list')
        document.getElementById('activer').classList.remove('map')
        document.getElementById('filters').classList.add('list')
    }

    const dMap = () => {
        document.getElementById('list--WC').classList.remove('d-flex')
        document.querySelector('.list').classList.remove('active')
        document.querySelector('.map').classList.add('active')
        document.getElementById('map').classList.add('d-block')
        document.getElementById('activer').classList.remove('list')
        document.getElementById('activer').classList.add('map')
        document.getElementById('filters').classList.remove('list')

    }

    return (
        <nav className="list--switch">
            <ul>
                <li onClick={dMap} className="item map active">Map</li>
                <li onClick={dList} className="item list">Liste</li>
                <li id="activer" className="map"></li>
            </ul>
        </nav>
    )
}