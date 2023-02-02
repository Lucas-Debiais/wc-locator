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

        // document.querySelector('.latitude').innerText = crd.latitude
        // document.querySelector('.longitude').innerText = crd.longitude
        // document.querySelector('.accuracy').innerText = `La précision est de ${crd.accuracy} mètres.`
    }

    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, options)
    }, [])


    return ({
        latitude, longitude
    })
}