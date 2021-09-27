import React, { useContext, useState } from 'react';
import { TeamContext } from '../contexts/TeamContext';
import { MatchesContext } from '../contexts/MatchesContext';
import DatePicker from 'react-date-picker';
import moment from 'moment';

const ManageGames = () => {
    const { matches, createMatch, deleteMatch } = useContext(MatchesContext);
    const { teams } = useContext(TeamContext);
    const [day, setDay] = useState(new Date());
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    // const [selectedHomeTeam, setSelectedHomeTeam] = useState('');
    // const [selectedAwayTeam, setSelectedAwayTeam] = useState('');
    // const [selectedDate, setSelectedDate] = useState('');

    let date = (day + '').toString();
    date = date.slice(0, 16);

    const dateFormat = (date) => {
        let parts = date.split(" ");
        let months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        };
        let fDate = parts[3] + "/" + months[parts[1]] + "/" + parts[2];
        return fDate;
    }



    const handleHomeTeam = (e) => {
        setHomeTeam(e.target.value);
        console.log(homeTeam);
    }

    const handleAwayTeam = (e) => {
        setAwayTeam(e.target.value);
        console.log(awayTeam);
    }

    const handleGameRegister = () => {
        // setSelectedHomeTeam(homeTeam);
        // setSelectedAwayTeam(awayTeam);
        let fDate = dateFormat(date);
        // setSelectedDate(fDate);
        createMatch(awayTeam, homeTeam, fDate)
    }
    const deleteGame = (e) => {
        deleteMatch(e.target.getAttribute('data-value'))
        console.log('match deleted')
    }

    return (
        <div>
            <h1 className='mgmt-h'>GAMES MANAGEMENT</h1>
            <div className="gmanager-container">
                <div className="tselect">
                    <div className="teamselection">
                        <select name="teamselect" defaultValue={'default'} className='team-select' onChange={handleHomeTeam}>
                            <option value='default' disabled hidden>Select team</option>
                            {teams && teams.map(team => {
                                return (
                                    team.noOfPLayers >= 0 && <option value={team.id} key={team.id}>{team.name}({team.country})</option>
                                )
                            })}
                        </select>
                        VS.
                        <select name="teamselect" defaultValue={'default'} className='team-select' onChange={handleAwayTeam}>
                            <option value='default' disabled hidden>Select team</option>
                            {teams && teams.map(team => {
                                return (
                                    team.noOfPLayers >= 0 && <option value={team.id} key={team.id}>{team.name}({team.country})</option>
                                )
                            })}
                        </select>
                    </div>

                    <DatePicker onChange={setDay} value={day} />
                    <button className="register-game" onClick={() => handleGameRegister()}>Register game</button>

                </div>
                <div className="gdisplay">Schedule preview <br />
                    {matches && matches.length > 0 && matches.map(match => {
                        if (moment(match.matchDate).isSameOrAfter(new Date(), 'day')) {
                            return (
                                <div className="matches" key={match.id} data-value={match.id} onClick={(e) => window.confirm('Are you sure you want to delete this game?') &&
                                    deleteGame(e)}>
                                    {match.homeTeam.name} VS. {match.awayTeam.name}<br />({match.matchDate})
                                </div>
                            )
                        }
                        return null
                    })}
                </div>
            </div>
        </div>
    );
}

export default ManageGames;