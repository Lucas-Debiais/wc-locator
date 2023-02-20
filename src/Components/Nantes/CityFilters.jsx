export const CityFiltersNantes = ({setFilters}) => {
    return (
        <>
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
        </>
    )
}