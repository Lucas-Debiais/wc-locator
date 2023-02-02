export const Nav = () => {
    const dList = () => {
        document.getElementById('list--WC').classList.add('d-flex')
        document.querySelector('.list').classList.add('active')
        document.querySelector('.map').classList.remove('active')
        document.getElementById('map').classList.remove('d-block')
    }

    const dMap = () => {
        document.getElementById('list--WC').classList.remove('d-flex')
        document.querySelector('.list').classList.remove('active')
        document.querySelector('.map').classList.add('active')
        document.getElementById('map').classList.add('d-block')
    }

    return (
        <nav className="list--switch">
            <ul>
                <li onClick={dMap} className="map active">Map</li>
                <li onClick={dList} className="list">Liste</li>
            </ul>
        </nav>
    )
}