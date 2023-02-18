import {useMyLocation} from './GPS'
import {useEffect, useState} from "react";
import {filterMap} from "./Filters.jsx";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371 // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1)  // deg2rad below
    let dLon = deg2rad(lon2 - lon1)
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


export const useListOfWC = () => {
    const [WCs, setWCs] = useState()

    const request = new XMLHttpRequest()
    request.open('GET', 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&q=&rows=-1')
    request.setRequestHeader( "Authorization", "Apikey bb7852e64f73e9acafbbbc31b4e237fe85f8e3beb630799d27351d64")
    // request.open('GET', 'https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=bor_sigsanitaire&q=&rows=-1&facet=type&facet=handi')
    request.responseType = 'text'
    let data = null

    useEffect(() => {
        request.onload = () => {
            data = JSON.parse(request.response).records
            setWCs(data)
        }
    }, [])
    request.send()

    return (WCs)
}

export const ListWC = ({selected, filters}) => {
    const WCs = useListOfWC()
    const {latitude: latitudePerso, longitude: longitudePerso} = useMyLocation()
    const distTab = WCs?.map?.(wc => {
        const distance = getDistanceFromLatLonInKm(latitudePerso, longitudePerso, wc.fields.geo_shape.coordinates[1], wc.fields.geo_shape.coordinates[0])

        return {...wc, distance}
    }).sort((a, b) => {
        return a.distance - b.distance;
    })

    let filteredPoints = distTab
    filters.forEach((filterName) => {
        filteredPoints = filteredPoints.filter(filterMap[filterName])
    })

    return (
        <div id="list--WC" className={selected ? "d-flex" : ""}>
            {filteredPoints?.map?.(wc =>
                <a target="_blank" href={`https://www.google.fr/maps/dir/${ wc.fields.geo_shape.coordinates[1]},${wc.fields.geo_shape.coordinates[0]}/${latitudePerso},${longitudePerso}`} className="WC" key={wc.recordid}>
                    <div className="WC__infos">
                        <h2 className="WC__title">{wc.fields.nom}</h2>
                        <div className="WC__filters">
                            {wc.fields.horaire_d_ouverture ? <span className="WC__horaire">
                                    <span>{wc.fields.horaire_d_ouverture}</span>
                                </span> : ''}
                            {wc.fields.complement_type ?
                                <span className="WC__type">
                                    <span>{wc.fields.complement_type}</span>
                                </span> : ''}
                            {wc.fields.accessible_pmr === "oui" ? <span className="WC__pmr">
                            </span>
                                : ''}
                        </div>
                    </div>
                    <span className="WC__distance">
                        {Math.round(wc.distance * 100) / 100} km
                    </span>
                </a>
            )}
        </div>
    )
}
