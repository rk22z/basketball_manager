import React, { createContext, useState, useEffect } from 'react';
import { baseUrl } from '../utils/Constants';


export const MatchesContext = createContext();

const MatchesContextProvider = (props) => {
    const [matches, setMatches] = useState('');


    const createMatch = async (sAT, sHT, sD) => {
        let url = baseUrl + '/matches/createMatch?awayTeamID=' + sAT + '&homeTeamID=' + sHT + '&matchDate=' + sD;
        await fetch(`${url}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        })
            .then(() => {
                console.log('sent match to api')
            })
            .catch(error => console.log('error', error))
        getMatches();
    }

    const deleteMatch = async (matchId) => {
        let url = baseUrl + '/matches/deleteMatch?matchID=' + matchId;
        await fetch(`${url}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => {
                console.log('deleted game from api')
            })
            .catch(error => console.log('error', error))
        getMatches();
    }

    const getMatches = async () => {
        var responseObject = {};
        let url = baseUrl + '/matches/getAllMatches';

        await fetch(`${url}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(result => {
                responseObject = result
                setMatches(responseObject);
            })
            .catch(error => console.log('error', error))
        console.log('primit meciuri')
    }

    useEffect(() => {
        getMatches();
    }, [])

    return (
        <MatchesContext.Provider value={{ matches, createMatch, deleteMatch, getMatches }}>
            {props.children}
        </MatchesContext.Provider>

    );
}

export default MatchesContextProvider;