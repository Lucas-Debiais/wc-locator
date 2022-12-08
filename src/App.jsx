import './App.scss'
import GPS from './Components/GPS'
import Gyroscope from './Components/Gyroscope'
import ListWC from './Components/ListWC'

function App() {
    return (
        <div className="App">
            <GPS/>
            <Gyroscope/>
            <ListWC/>
        </div>
    )
}

export default App
