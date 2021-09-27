import React, { useContext } from 'react';
import { MatchesContext } from '../contexts/MatchesContext';
import moment from 'moment';

const ViewResults = () => {
    const { matches } = useContext(MatchesContext);
    // const [ setCrtMatch] = useState();

    // const handleClick = (e) => {
    //     setCrtMatch(e.target.getAttribute('data-value'));
    // }

    return (
        <div className='container'>
            <div className="matches-list">
                <h1 className="matches-header">Matches list</h1>
                {matches && matches.length > 0 && matches.map(match => {
                    if (moment(match.matchDate).isBefore(new Date(), 'day')) {
                        return (
                            <div className="matches" key={match.id} data-value={match.id}>
                                {match.homeTeam.name} VS. {match.awayTeam.name}<br />({match.matchDate})
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        </div>
    );
}

export default ViewResults;