import './App.scss'
import {Header} from './Components/Header'
import {Gyroscope} from './Components/Gyroscope'
import {ListWC} from './Components/ListWC'

export const App = () => {
    return (
        <div className="App">
            <Header />
            <ListWC/>
            <Gyroscope/>
        </div>
    )
}
