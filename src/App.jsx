import './App.scss'

function App() {
    //https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        let crd = pos.coords;

        console.log('Votre position actuelle est :');
        document.querySelector('.latitude').innerText = crd.latitude
        document.querySelector('.longitude').innerText = crd.longitude
        document.querySelector('.accuracy').innerText =`La précision est de ${crd.accuracy} mètres.`
    }

    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

//https://developer.mozilla.org/fr/docs/Web/API/DeviceOrientationEvent
    window.addEventListener('deviceorientation', function (event) {
        document.querySelector('.orientation').innerText = "z : " + event.alpha + "\n x : " + event.beta + "\n y : " + event.gamma
    });
    return (
        <div className="App">
            <p>Votre position actuelle est :</p>
            <div className="latitude"></div>
            <div className="longitude"></div>
            <div className="accuracy"></div>
            <div className="orientation"></div>
        </div>
    )
}

export default App
