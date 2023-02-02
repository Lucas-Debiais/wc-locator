import './App.scss'
import {Header} from './Components/Header'
import {Gyroscope} from './Components/Gyroscope'
import {ListWC} from './Components/ListWC'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Map} from './Components/Map'
import {Filters} from "./Components/Filters.jsx";

export const App = () => {
    return (
        <div className="App">
            <Header />
            <Map />
            <ListWC/>
            <Filters/>
            {/*<Gyroscope/>*/}
        </div>
    )
}
