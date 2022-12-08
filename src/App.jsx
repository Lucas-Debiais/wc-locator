import './App.scss'
import Header from './Components/Header'
import GPS from './Components/GPS'
import Gyroscope from './Components/Gyroscope'
import ListWC from './Components/ListWC'

const App = () => {
    return (
        <div className="App">
            <Header />
            <GPS/>
            <Gyroscope/>
            <ListWC/>
        </div>
    )
}

export default App
