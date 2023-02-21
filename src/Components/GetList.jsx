import {useEffect, useState} from "react";

export const Cities = {
    nantes: {
        name: 'Nantes',
        url: 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_toilettes-publiques-nantes-metropole&q=&rows=-1',
        apikey: {
            headers: {
                "Authorization": "Apikey bb7852e64f73e9acafbbbc31b4e237fe85f8e3beb630799d27351d64"
            }
        },
        longitude: -1.553621,
        latitude: 47.218371,
    },
    bordeaux: {
        name: 'Bordeaux',
        url: 'https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=bor_sigsanitaire&q=&rows=-1&facet=type&facet=handi',
        longitude: -0.5667,
        latitude: 44.8378,
    },
    paris: {
        name: 'Paris',
        url: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=-1&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe',
        longitude: 2.333333,
        latitude: 48.866667,
    },
    rennes: {
        name: 'Rennes',
        url: 'https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=toilettes_publiques_vdr&q=&rows=-1',
        longitude: -1.6833,
        latitude: 48.1025,
    },
    lille: {
      name: 'Lille',
      url: 'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=toilettes-publiques&q=&rows=-1&facet=access',
      longitude:  3.066667,
      latitude: 50.633333,
    },
}

export const GetList = ({selectedCity, setLng, setLat}) => {
    const [WCs, setWCs] = useState()

    useEffect(() => {
        fetch(Cities[selectedCity].url, Cities[selectedCity].apikey)
            .then(response => response.json())
            .then(data => setWCs(data.records))
            .catch(error => console.error(error))

        setLng(Cities[selectedCity].longitude)
        setLat(Cities[selectedCity].latitude)

    }, [selectedCity])

    return WCs
}

