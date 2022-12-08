const Gyroscope = () => {
    //https://developer.mozilla.org/fr/docs/Web/API/DeviceOrientationEvent
    window.addEventListener('deviceorientation', function (event) {
        document.querySelector('.orientation').innerText = "z : " + Math.round(event.alpha) + "\n x : " + Math.round(event.beta) + "\n y : " + Math.round(event.gamma)
    })

    return (
        <div className="orientation"></div>
    )
}

export default Gyroscope