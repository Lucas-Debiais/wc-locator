import {createElement} from "react";

const ListWC = () => {
    const request = new XMLHttpRequest()
    request.open('GET', 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&q=&rows=137')
    request.responseType = 'text'

    request.onload = () => {
        const data = JSON.parse(request.response).records
        console.log(data)
        data.forEach(el => {
            let WC = document.createElement('div')
            WC.classList.add('WC')

            let infosWC = document.createElement('div')
            infosWC.classList.add('WC__infos')
            WC.appendChild(infosWC)

            let titleWC = document.createElement('h2')
            titleWC.classList.add('WC__title')
            infosWC.appendChild(titleWC)
            titleWC.innerText = el.fields.nom

            let distanceWC = document.createElement('span')
            distanceWC.classList.add('WC__distance')
            WC.appendChild(distanceWC)
            distanceWC.innerText = 'la distance'

            let filtersWC = document.createElement('div')
            filtersWC.classList.add('WC__filters')
            infosWC.appendChild(filtersWC)
            filtersWC.innerHTML = '<span class="WC__horaire">' + el.fields.horaire_d_ouverture + '</span><span class="WC__type">' + el.fields.complement_type + '</span><span class="WC__pmr">' + el.fields.accessible_pmr + '</span>'

            document.querySelector('.list--WC').appendChild(WC)
            console.log(el)
        })
    }
    request.send()

    return (
        <div className="list--WC">
        </div>
    )
}

export default ListWC