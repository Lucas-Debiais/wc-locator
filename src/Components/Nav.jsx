export const Nav = () => {
    const dList = () => {
        document.getElementById('list--WC').classList.add('d-flex')
        document.querySelector('.list').classList.add('active')
        document.querySelector('.map').classList.remove('active')
    }

    const dMap = () => {
        document.getElementById('list--WC').classList.remove('d-flex')
        document.querySelector('.map').classList.add('active')
        document.querySelector('.list').classList.remove('active')
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