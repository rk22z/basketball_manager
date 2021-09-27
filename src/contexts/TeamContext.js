import React, { useState, createContext, useEffect } from 'react';
import { baseUrl } from '../utils/Constants';

export const TeamContext = createContext();

const TeamContextProvider = (props) => {
    const [teams, setTeams] = useState([]);

    const addTeam = async (name, country, imageUrl) => {
        let url = baseUrl + '/teams/createTeam';
        await fetch(`${url}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, country, imageUrl })
        })
            .then(() => {
                console.log('added team to api')
            })
            .catch(error => console.log('error', error))
        getTeams();
    }
    const removeTeam = async (id) => {
        setTeams(teams.filter(team => team.id !== id));
        let url = baseUrl + '/teams/deleteTeam?teamID=' + id;

        await fetch(`${url}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })

            .catch(error => console.log('error', error))
        getTeams();
    }

    const getTeams = async () => {
        var responseObject = {};
        let url = baseUrl + '/teams/getAllTeams'

        var requestOptions = {
            method: 'GET'
        }
        await fetch(`${url}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                responseObject = result
                setTeams(responseObject);
            })
            .catch(error => console.log('error', error))
        console.log('primit echipe')
    }
    useEffect(() => {
        getTeams();
    }, []);
    return (
        <TeamContext.Provider value={{ teams, addTeam, removeTeam, getTeams }} >
            {props.children}
        </TeamContext.Provider>
    );
}

export default TeamContextProvider;