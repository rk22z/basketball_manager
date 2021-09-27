import React, { useState, useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import { TeamContext } from '../contexts/TeamContext';
import { TeamPlayersContext } from '../contexts/TeamPlayersContext';

const ManageTeamPlayers = () => {
    const { players, addPlayer, removePlayer } = useContext(PlayerContext);
    const { teams, addTeam, removeTeam } = useContext(TeamContext);
    const { teamPlayers, getTeamPlayers, assignPlayer } = useContext(TeamPlayersContext);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [imageUrlT, setImageUrlT] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [teamName, setTeamName] = useState('');
    const [p, setP] = useState(0);
    const [t, setT] = useState(0);



    const handleSubmitTeam = (e) => {
        e.preventDefault();
        addTeam(name, country, imageUrlT);
        setName('');
        setCountry('');
        setImageUrlT('');
    }
    const handleSubmitPlayer = (e) => {
        e.preventDefault();
        addPlayer(firstName, lastName, identityNumber, teamName);
        setFirstName('');
        setLastName('');
        setIdentityNumber('');
        setTeamName('')
    }
    const handleAssign = () => {
        var assigned = false;
        teamPlayers && teamPlayers.map(teamPlayer => {
            return (
                parseFloat(teamPlayer.player.id) === parseFloat(p) ? assigned = true : assigned
            )
        })
        assigned === true ?
            (alert('Player already on this team')) :
            (assignPlayer(p, t));
        console.log('sent ', p, ' and team ', t, ' to context');

    }
    // const handleUnassign=()=>{
    //     unassignPlayer(p,t);
    //     console.log('unassigned ', p, ' from team ', t);
    //     alert ('Unassigned '+p+' from team '+t);
    // }
    const handlePlayerSelect = (e) => {
        setP(e.target.value);
        console.log(e.target.value, 'selected');
    }
    const handleTeamSelect = (e) => {
        setT(e.target.value);
        getTeamPlayers(e.target.value);
        console.log(e.target.value, 'team selected');
    }
    const deletePlayer = () => {
        removePlayer(p);
    }
    const deleteTeam = () => {
        removeTeam(t);
    }

    return (
        <div>
            <h1 className='mgmt-h'>MANAGE TEAMS AND PLAYERS</h1>
            {/* add team form */}
            <form className="add-team" onSubmit={handleSubmitTeam}>
                Add a team:
                <input type='text' placeholder='Team name' value={name}
                    onChange={(e) => setName(e.target.value)} required />
                <input type='text' placeholder='Team country' value={country}
                    onChange={(e) => setCountry(e.target.value)} required />
                <input type='text' placeholder='Team logo url' value={imageUrlT}
                    onChange={(e) => setImageUrlT(e.target.value)} />
                <input type='submit' className='add' value='Add' />
            </form><br />
            {/* add player form */}
            <form className="add-player" onSubmit={handleSubmitPlayer}>
                Add a player:
                <input type='text' placeholder='First name' value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} required />
                <input type='text' placeholder='Last name' value={lastName}
                    onChange={(e) => setLastName(e.target.value)} required />
                <input type='text' placeholder='Identity number' value={identityNumber}
                    onChange={(e) => setIdentityNumber(e.target.value)} required />
                <input type='submit' value='Add' className='add' />
            </form><br />
            {/* assign player to team form */}
            <div className="assign-team">
                Select the player you wish to assign to a team.<br />
                <select name={lastName} className='player-select' onChange={handlePlayerSelect} defaultValue={'default'}>
                    <option value='default' disabled hidden>Select player</option>
                    {players && players.map(player => {
                        return (
                            <option value={player.id} key={player.id}>{player.firstName} {player.lastName}</option>
                        )
                    })}
                </select>
                <select name={name} className='team-select' onChange={handleTeamSelect} defaultValue={'default'}>
                    <option value='default' disabled hidden>Select team</option>
                    {teams && teams.map(team => {
                        return (
                            <option value={team.id} key={team.id}>{team.name} ({team.country})</option>
                        )
                    })}
                </select>
                <button className="assign" onClick={() => handleAssign()}>Assign player</button>
                {/* <button className='assign' onClick={()=>handleUnassign()}>Unassign player</button> */}
            </div><br />
            {/* delete player or team */}
            <div className="delete-player-or-team">
                Select the player you wish to delete.<br />
                <select name={lastName} className='player-select' onChange={handlePlayerSelect} defaultValue={'default'}>
                    <option value='default' disabled hidden>Select player</option>
                    {players && players.map(player => {
                        return (
                            <option value={player.id} key={player.id}>{player.firstName} {player.lastName}</option>
                        )
                    })}
                </select>
                <button className="delete-player" onClick={(e) => {
                    window.confirm('Are you sure you want to delete this player?') &&
                        deletePlayer(e)
                }}>Delete player</button><br />

                Select the team you wish to delete.<br />
                <select name={teamName} className='team-select' onChange={handleTeamSelect} defaultValue={'default'}>
                    <option value='default' disabled hidden>Select team</option>
                    {teams && teams.map(team => {
                        return (
                            <option value={team.id} key={team.id}>{team.name} ({team.country})</option>
                        )
                    })}
                </select>
                <button className="delete-team" onClick={(e) => {
                    window.confirm('Are you sure you want to delete this team?') &&
                        deleteTeam(e)
                }}>Delete team</button>
            </div>
        </div>
    );
}

export default ManageTeamPlayers;