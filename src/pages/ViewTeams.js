import React, { useContext, useState } from 'react';
import { TeamContext } from '../contexts/TeamContext';
import { TeamPlayersContext } from '../contexts/TeamPlayersContext';

const ViewTeams = () => {
    const { teams } = useContext(TeamContext);
    const { teamPlayers, getTeamPlayers, unassignPlayer } = useContext(TeamPlayersContext);
    const [crtTeamId, setCrtTeamId] = useState();

    const handleClick = (e) => {
        setCrtTeamId(e.target.getAttribute('data-value'));
        getTeamPlayers(e.target.getAttribute('data-value'));
    }

    const handleUnassign = (e) => {
        unassignPlayer(e.target.getAttribute('data-value'), crtTeamId);
    }

    return (
        <div className='container'>
            <div className='teams-list'>
                <h1 className='teams-header'>TEAMS</h1>
                {teams && teams.length > 0 && teams.map(team => {
                    return (
                        <div className="team-names" onClick={(e) => handleClick(e)} data-value={team.id} key={team.id}>
                            {team.name} ({team.country})
                        </div>
                    )
                })}
            </div>
            <div className="teams-info">
                {teams && teams.length > 0 && teams.map(team => {
                    return (
                        parseFloat(team.id) === parseFloat(crtTeamId) &&
                        <div className='team-info-container' key={team.id}>
                            <div className="team-info">
                                <h2 className='teams-h'>Team info</h2>
                                <img src={team.imageUrl} className='team-logo' alt={team.name+'(logo)'} />
                                <h3 className='team-name'>{team.name} ({team.country})</h3>
                                <p className='team-stats'>
                                    Total games:{team.noOfGames} <br />
                                    Wins:{team.noOfWins}<br />
                                    Loses:{team.noOfLoses}<br />
                                    No. of players: {teamPlayers.length}
                                </p>
                            </div>
                            <div className="team-players">
                                <h2 className='teams-h'>Players</h2>
                                {teamPlayers && teamPlayers.length > 0 && teamPlayers.map(teamPlayer => {
                                    return (
                                        <p className='team-player' key={teamPlayer.player.id} >{teamPlayer.player.firstName} {teamPlayer.player.lastName} &emsp;&emsp;
                                            <span className="material-icons" data-value={teamPlayer.player.id} onClick={(e) => handleUnassign(e)} >person_remove</span></p>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>);
}

export default ViewTeams;