import './App.scss'
import {useState} from "react";
import {Nav} from './Components/Nav'
import {ListWC} from './Components/ListWC'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Map} from './Components/Map'
import {Filters} from "./Components/Filters.jsx";
import {Gyroscope} from './Components/Gyroscope'

export const App = () => {
    const [selectedRoute, setSelectedRoute] = useState("map")
    const [filters, setFilters] = useState([])
    const [selectedCity, setSelectedCity] = useState('nantes')
    const [lng, setLng] = useState(-1.553621);
    const [lat, setLat] = useState(47.218371);

    return (
        <div className="App">
            <Nav setSelectedRoute={setSelectedRoute} selectedRoute={selectedRoute}/>
            <Map setLng={setLng} setLat={setLat} lng={lng} lat={lat} selectedCity={selectedCity} filters={filters} selected={selectedRoute === "map"}/>
            <ListWC setLng={setLng} setLat={setLat} selectedCity={selectedCity} filters={filters} selected={selectedRoute === "list"}/>
            <Filters setSelectedCity={setSelectedCity} setFilters={setFilters} selectedRoute={selectedRoute}/>
            {/*<Gyroscope/>*/}
        </div>
    )
}
