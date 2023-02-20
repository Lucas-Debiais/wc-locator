import {useState} from "react";
import {Cities} from "./GetList.jsx";

export const filterMap = {
    hours: (point) => point.fields.horaire_d_ouverture === '24/24',
    seat: (point) => point.fields.complement_type === 'WC siège',
    pmr: (point) => point.fields.accessible_pmr === 'oui'
}

export const Filters = ({selectedRoute, setFilters, setSelectedCity}) => {
    const [selectedFilter, setSelectedFilter] = useState()

    const open = () => {
        setSelectedFilter('active')
    }

    const close = event => {
        event.stopPropagation()
        setSelectedFilter('test')
    }

    return (
        <div onClick={open} id="filters"
             className={`filters ${selectedRoute === "list" ? "scale-up" : ""} ${selectedFilter === "active" ? "active scale-up" : ""}`}>
            <div className="filters__popup">
                <div className="filters__header">
                    <span className="filters__title">Filtres</span>
                    <span onClick={close} className="filters__close">
                        <svg className="filters__cross" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z"/>
                        </svg>
                    </span>
                </div>
                <div className="filters__body">
                    <select className="filters__cities" onChange={event => {
                        setSelectedCity(event.target.value)
                    }}>
                        {Object.entries(Cities).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="filters__hours">Disponible la nuit
                        <input id="filters__hours" type="checkbox" onChange={event => {
                            if (event.target.checked) {
                                setFilters(previousValue => [...previousValue, "hours"])
                            } else {
                                setFilters(previousValue => previousValue.filter((value) => value !== "hours"))
                            }
                        }}/>
                    </label>
                    <label htmlFor="filters__seat">Sièges WC
                        <input id="filters__seat" type="checkbox"
                               onChange={(event) => {
                                   if (event.target.checked) {
                                       setFilters(previousValue => [...previousValue, "seat"])
                                   } else {
                                       setFilters(previousValue => previousValue.filter((value) => value !== "seat"))
                                   }
                               }}/>
                    </label>
                    <label htmlFor="filters__pmr">Accès PMR
                        <input id="filters__pmr" type="checkbox"
                               onChange={(event) => {
                                   if (event.target.checked) {
                                       setFilters(previousValue => [...previousValue, "pmr"])
                                   } else {
                                       setFilters(previousValue => previousValue.filter((value) => value !== "pmr"))
                                   }
                               }}/>
                    </label>
                </div>
            </div>
        </div>
    )
}