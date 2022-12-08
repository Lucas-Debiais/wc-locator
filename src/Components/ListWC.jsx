function ListWC() {
    const request = new XMLHttpRequest()
    request.open('GET', 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&q=&rows=137')
    request.responseType = 'text'

    request.onload = () => {
        console.log(JSON.parse(request.response).records)
        document.querySelector('.listWC').innerText = request.response
    }

    request.send()

    return (
        <div className="listWC"></div>
    )
}

export default ListWC