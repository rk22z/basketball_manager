import React, { useContext, useState } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';


const ViewPlayers = () => {
    const { players } = useContext(PlayerContext);
    const [crtPlayer, setCrtPlayer] = useState(0);

    const handleClick = (e) => {
        setCrtPlayer(e.target.getAttribute('data-value'));
    }

    return (
        <div className='container'>
            <div className='players-list'>
                <h1 className='players-header'>PLAYERS</h1>
                {players && players.length > 0 && players.map(player => {
                    return (
                        <div className='player-names' onClick={(e) => handleClick(e)} data-value={player.id} key={player.id}>
                            {player.firstName} {player.lastName}
                        </div>
                    )
                })}
            </div>
            <div className="players-info">
                {players && players.length > 0 && players.map(player => {
                    return (
                        player.id === parseFloat(crtPlayer) &&
                        <div className='player-info-container' key={player.id}>
                            <div className="player-info">
                                <h2 className='player-info-h'>Player info</h2>
                                <img src={player.imageUrl} className='player-picture' alt={player.lastName+'(image)'} />
                                <h3 className='player-name'>{player.firstName} {player.lastName}</h3>
                                <p className='player-stats'>
                                    Total games played:{player.noOfGames}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ViewPlayers;