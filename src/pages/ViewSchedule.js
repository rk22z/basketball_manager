import React, { useContext, useState } from 'react';
import { MatchesContext } from '../contexts/MatchesContext';
import moment from 'moment';


const ViewSchedule = () => {
    const { matches } = useContext(MatchesContext);
    const [crtMatch, setCrtMatch] = useState();

    const handleClick = (e) => {
        setCrtMatch(e.target.getAttribute('data-value'));
    }

    return (
        <div className='container'>
            <div className="matches-list">
                <h1 className="matches-header">Matches list</h1>
                {matches && matches.length > 0 && matches.map(match => {
                    if (moment(match.matchDate).isSameOrAfter(new Date(), 'day')) {
                        return (
                            <div className="matches" key={match.id} onClick={(e) => handleClick(e)} data-value={match.id}>
                                {match.homeTeam.name} VS. {match.awayTeam.name}<br />({match.matchDate})
                            </div>
                        )
                    }
                    return null
                })}
            </div>
            <div className="match-info">
                {matches && matches.length > 0 && matches.map(match => {
                    return (
                        match.id === parseFloat(crtMatch) &&
                        <div className="teams-details" key={match.id}>
                            <p className="match-date">{match.matchDate}</p>
                            <div className="home-team">
                                <h2>{match.homeTeam.name}({match.homeTeam.country})</h2>
                                Games played:{match.homeTeam.noOfGames}<br />
                                Games won:{match.homeTeam.noOfWins}<br />
                                Games lost:{match.homeTeam.noOfLoses}
                            </div>
                            <div className="away-team">
                                <h2>{match.awayTeam.name}({match.awayTeam.country})</h2>
                                Games played:{match.awayTeam.noOfGames}<br />
                                Games won:{match.awayTeam.noOfWins}<br />
                                Games lost:{match.awayTeam.noOfLoses}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ViewSchedule;