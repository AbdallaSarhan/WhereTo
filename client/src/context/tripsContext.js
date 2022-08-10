import React, { useState, createContext} from 'react';

export const TripsContext = createContext();

export const TripsContextProvider = (props) => {
    const [trips, setTrips] = useState(["hi"]);
    const addTrips = (trip) => {
        setTrips([...trips, trip])
    }
    return (
        <TripsContext.Provider value={{trips, setTrips, addTrips}}>
            {props.children}
        </TripsContext.Provider>
    )
}