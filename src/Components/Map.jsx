import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {useListOfWC} from './ListWC'
import {useMyLocation} from "./GPS.jsx";

mapboxgl.accessToken = 'pk.eyJ1IjoiYmlhaXNkZSIsImEiOiJjbGRuMXRkYmkwZjU3M29td2Vud2o5dnRyIn0.Oak6nQusSTMQ6Pi7uqd6DA';

export const Map = () => {
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
    }, [])

    // add markers to map
    points?.forEach?.(point => {
// create a HTML element for each feature
        const el = document.createElement('div')
        el.className = 'marker'

// make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
            .setLngLat([point.fields.geo_shape.coordinates[0], point.fields.geo_shape.coordinates[1]])
            .setPopup(
                new mapboxgl.Popup({offset: 25}) // add popups
                    .setHTML(
                        `<h3>${point.fields.nom}</h3><p>${point.fields.horaire_d_ouverture} ${point.fields.complement_type} ${point.fields.accessible_pmr}</p>`
                    )
            )
            .addTo(map.current)
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


    return (
        <div id="map" className="d-block">
            {/*<div className="sidebar">*/}
            {/*    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}*/}
            {/*</div>*/}
            <div ref={mapContainer} className="map-container"/>
        </div>
    )
}