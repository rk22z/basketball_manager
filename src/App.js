import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import ViewPlayers from "./pages/ViewPlayers";
import ViewTeams from "./pages/ViewTeams";
import ManageTeamPlayers from "./pages/ManageTeamPlayers";
import ManageGames from "./pages/ManageGames";
import ViewResults from "./pages/ViewResults";
import ViewSchedule from "./pages/ViewSchedule";
import Admin from './pages/Admin';
import PlayerContextProvider from "./contexts/PlayerContext";
import TeamContextProvider from "./contexts/TeamContext";
import TeamPlayersContextProvider from "./contexts/TeamPlayersContext";
import MatchesContextProvider from './contexts/MatchesContext';



function App() {
  return (
    <TeamContextProvider>
      <PlayerContextProvider>
        <TeamPlayersContextProvider>
          <MatchesContextProvider>
            <Router>
              <div className="App">
                <Navbar />
                <div className="content">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/viewplayers" component={ViewPlayers} />
                    <Route exact path='/viewteams' component={ViewTeams} />
                    <Route exact path='/manageteamplayers' component={ManageTeamPlayers} />
                    <Route exact path='/managegames' component={ManageGames} />
                    <Route exact path='/viewresults' component={ViewResults} />
                    <Route exact path='/viewschedule' component={ViewSchedule} />
                    <Route exact path='/admin' component={Admin} />
                  </Switch>
                </div>
              </div>
            </Router>
          </MatchesContextProvider>
        </TeamPlayersContextProvider>
      </PlayerContextProvider>
    </TeamContextProvider>
  );
}

export default App;
