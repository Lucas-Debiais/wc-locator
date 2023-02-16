import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {useListOfWC} from './ListWC.jsx'
import {filterMap} from "./Filters.jsx";

mapboxgl.accessToken = 'pk.eyJ1IjoiYmlhaXNkZSIsImEiOiJjbGRuMXRkYmkwZjU3M29td2Vud2o5dnRyIn0.Oak6nQusSTMQ6Pi7uqd6DA';

export const Map = ({selected, filters}) => {
    const points = useListOfWC()
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-1.553621);
    const [lat, setLat] = useState(47.218371);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/biaisde/cldmvdrni001901lit40lmaww',
            center: [lng, lat],
            zoom: zoom,
        })

        map.current?.addControl?.(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
// When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
// Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            })
        )
    }, [])

    // point.fields.accessible_pmr === 'oui' && point.fields.horaire_d_ouverture === '24/24' && point.fields.complement_type === 'WC Siège'
    useEffect(() => {

        let filteredPoints = points
        filters.forEach((filterName) => {
            filteredPoints = filteredPoints.filter(filterMap[filterName])
        })

        // add markers to map
        filteredPoints?.forEach?.(point => {
            // create a HTML element for each feature
            const el = document.createElement('div')
            el.classList.add(
                'marker',
                'horaire-' + point.fields.horaire_d_ouverture?.split(' ').join(''),
                'siege-' + point.fields.complement_type?.split(' ').join(''),
                'pmr-' + point.fields.accessible_pmr?.split(' ').join('')
            )

            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
                .setLngLat([point.fields.geo_shape.coordinates[0], point.fields.geo_shape.coordinates[1]])
                .setPopup(
                    new mapboxgl.Popup({offset: 25}) // add popups
                        .setHTML(
                            `<h3>${point.fields.nom}</h3>
                        <p class="popup-list">
                        ${point.fields.horaire_d_ouverture ? '<span class="WC__horaire">' + point.fields.horaire_d_ouverture + '</span>' : ''} 
                        ${point.fields.complement_type ? '<span class="WC__type">' + point.fields.complement_type + '</span>' : ''} 
                        ${point.fields.accessible_pmr === "oui" ? '<span class="WC__pmr"></span>' : ''}
                        </p>`
                        )
                )
                .addTo(map.current)
        })
        return () => {
            document.querySelectorAll('.marker').forEach(el => {
                el.remove()
            })
        }
    }, [points, filters])


    return (
        <div id="map" className={selected ? "d-block" : ""}>
            <div ref={mapContainer} className="map-container"/>
        </div>
    )
}