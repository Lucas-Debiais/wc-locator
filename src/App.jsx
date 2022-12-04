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
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude : ${crd.longitude}`);
        console.log(`La précision est de ${crd.accuracy} mètres.`);
    }

    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

//https://developer.mozilla.org/fr/docs/Web/API/DeviceOrientationEvent
    window.addEventListener('deviceorientation', function (event) {
        console.log("z : " + event.alpha + "\n x : " + event.beta + "\n y : " + event.gamma);
    });
    return (
        <div className="App">
            test
        </div>
    )
}

export default App
