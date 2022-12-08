function GPS() {
    //https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        let crd = pos.coords;

        document.querySelector('.latitude').innerText = crd.latitude
        document.querySelector('.longitude').innerText = crd.longitude
        document.querySelector('.accuracy').innerText = `La précision est de ${crd.accuracy} mètres.`
    }

    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)

    return (
        <>
            <p>Votre position actuelle est :</p>
            <div className="latitude"></div>
            <div className="longitude"></div>
            <div className="accuracy"></div>
        </>
    )
}

export default GPS