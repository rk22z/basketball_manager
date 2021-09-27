import { useContext, useState } from 'react';
import { baseUrl } from '../utils/Constants';
import { PlayerContext } from '../contexts/PlayerContext';
import { TeamContext } from '../contexts/TeamContext';
import { MatchesContext } from '../contexts/MatchesContext'

const Admin = () => {
    const { players, getPlayers } = useContext(PlayerContext);
    const { teams, getTeams } = useContext(TeamContext);
    const { getMatches } = useContext(MatchesContext);
    const username = 'admin';
    const password = 'admin';
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [adminPanel, setAdminPanel] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        username === inputUsername && password === inputPassword ? setAdminPanel(true) : setAdminPanel(false);
        setInputUsername('');
        setInputPassword('');
    }
    const handleDeleteAllPlayers = async () => {
        let url = baseUrl + '/players/deleteAllPlayers';

        await fetch(`${url}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .catch(error => console.log('error', error))
        getPlayers();
        players.length === 0 ? alert('Deleted all players!') : alert('Could not delete all players!')
    }
    const handleDeleteAllTeams = async () => {
        let url = baseUrl + '/teams/deleteAllTeams';
        await fetch(`${url}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .catch(error => console.log('error', error))
        getTeams();
        teams.length === 0 ? alert('Deleted all teams!') : alert('Could not delete all teams!')
    }
    const handleUnassignAllPlayers = async () => {
        let url = baseUrl + '/teams/unassignAllPlayers';
        await fetch(`${url}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                alert('Unassigned all players!');
            })
            .catch(error => console.log('error', error))
    }
    const handleDeleteAll = async () => {
        let url = baseUrl + '/flushDatabase';
        await fetch(`${url}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                alert('Database Cleared!');
            })
            .catch(error => console.log('error', error))
        getPlayers();
        getTeams();
        getMatches();

    }
    return (
        <div>
            <div className="admin-login">
                <form className="admin-login" onSubmit={handleLogin}>
                    Admin login:
                    <input type='text' placeholder='Username' value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)} required />
                    <input type='password' placeholder='Password' value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)} required />
                    <input type='submit' value='Log in' />
                </form>
            </div>
            {adminPanel ?
                <div className="admin-panel">
                    <h1>Admin panel</h1>
                    <button className="admin-btns" onClick={handleDeleteAllPlayers}>Delete all players</button>
                    <button className="admin-btns" onClick={handleDeleteAllTeams}>Delete all teams</button>
                    <button className="admin-btns" onClick={handleUnassignAllPlayers}>Unassign all players</button>
                    <button className="admin-btns" onClick={handleDeleteAll}>Clear database</button>
                </div> :
                null}
        </div>
    );
}

export default Admin;