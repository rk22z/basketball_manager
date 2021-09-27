import React, { useState, createContext, useEffect } from 'react';
import { baseUrl } from '../utils/Constants';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const [players, setPlayers] = useState('');

    const addPlayer = async (firstName, lastName, identityNumber) => {
        let url = baseUrl + '/players/createPlayer';
        await fetch(`${url}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, identityNumber })
        })
            .then(() => {
                console.log('added player to api')
            })
            .catch(error => console.log('error', error))
        getPlayers();
    }

    const removePlayer = async (id) => {
        let url = baseUrl + '/players/deletePlayer?playerID=' + id;

        await fetch(`${url}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
            .then(() => {
                console.log('removed player from api')
            })
            .catch(error => alert('error', error))
        getPlayers();
    }


    const getPlayers = async () => {
        var responseObject = {};
        let url = baseUrl + '/players/getAllPlayers';

        await fetch(`${url}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(result => {
                responseObject = result
                setPlayers(responseObject);
            })
            .catch(error => console.log('error', error))
        console.log('primit jucatori')
    }

    useEffect(() => {
        getPlayers();
    }, []);

    return (
        <PlayerContext.Provider value={{ players, addPlayer, removePlayer, getPlayers }}>
            {props.children}
        </PlayerContext.Provider>

    );
}

export default PlayerContextProvider;