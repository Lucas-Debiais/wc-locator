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

    return (
        <div className="App">
            <Nav setSelectedRoute={setSelectedRoute} selectedRoute={selectedRoute}/>
            <Map filters={filters} selected={selectedRoute === "map"}/>
            <ListWC filters={filters} selected={selectedRoute === "list"}/>
            <Filters setFilters={setFilters} selectedRoute={selectedRoute}/>
            {/*<Gyroscope/>*/}
        </div>
    )
}
