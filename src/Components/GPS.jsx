import {useEffect, useState} from "react";

export const useMyLocation = () => {
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        let crd = pos.coords;

        setLatitude(crd.latitude)
        setLongitude(crd.longitude)
    }

    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`)
    }

    useEffect(() => {
        navigator.geolocation.watchPosition(success, error, options)
    }, [])


    return ({
        latitude, longitude
    })
}