import React, { useState, createContext } from 'react';
import { baseUrl } from '../utils/Constants';

export const TeamPlayersContext = createContext();

const TeamPlayersContextProvider = (props) => {
    const [teamPlayers, setTeamPlayers] = useState('');

    const getTeamPlayers = async (id) => {
        var responseObject = {};
        let url = baseUrl + '/teams/getTeamPlayers?teamID=' + id;

        await fetch(`${url}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(result => {
                responseObject = result
                setTeamPlayers(responseObject);
            })
            .catch(error => console.log('error', error))


    }
    const assignPlayer = async (playerId, teamId) => {
        let url = baseUrl + '/teams/assignPlayerToTeam?playerID=' + playerId + '&teamID=' + teamId;


        (await fetch(`${url}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                console.log('assigned player to team- from context')
            })
            .catch(error => console.log('error', error)))

        getTeamPlayers(teamId);

    }
    const unassignPlayer = async (playerId, teamId) => {
        let url = baseUrl + '/teams/unAssignPlayerToTeam?playerID=' + playerId + '&teamID=' + teamId;
        await fetch(`${url}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                console.log('unassigned player from team')
            })
            .catch(error => console.log('error', error))
        getTeamPlayers(teamId);

    }

    return (
        <TeamPlayersContext.Provider value={{ teamPlayers, getTeamPlayers, assignPlayer, unassignPlayer }}>
            {props.children}
        </TeamPlayersContext.Provider>
    );
}

export default TeamPlayersContextProvider;