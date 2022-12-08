function ListWC() {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&q=&facet=pole&facet=commune&facet=type&facet=automatique')

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr)
        }
    })

    return (
        <div className="listWC"></div>
    )
}

export default ListWC