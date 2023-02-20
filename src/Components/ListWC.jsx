import {useMyLocation} from './GPS.jsx'
import {useEffect, useState} from "react";
import {filterMap} from "./Filters.jsx";
import {GetList} from "./GetList.jsx";

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

export const ListWC = ({selected, filters, selectedCity, setLng, setLat}) => {
    const WCs = GetList({selectedCity, setLng, setLat})
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
                <a target="_blank"
                   href={`https://www.google.fr/maps/dir/${wc.fields.geo_shape.coordinates[1]},${wc.fields.geo_shape.coordinates[0]}/${latitudePerso},${longitudePerso}`}
                   className="WC" key={wc.recordid}>
                    <div className="WC__infos">
                        <h2 className="WC__title">
                            {selectedCity === 'nantes' && (wc.fields.nom)}
                            {selectedCity === 'bordeaux' && (wc.fields.adresse)}
                            {selectedCity === 'rennes' && (wc.fields.noms)}
                            {selectedCity === 'lille' && (wc.fields.name)}
                        </h2>
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
