import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='cards'>
            <Link to="/viewplayers" className='card' style={{ textDecoration: 'none' }}>View players</Link>
            <Link to="/viewteams" className='card' style={{ textDecoration: 'none' }}>View teams</Link>
            <Link to="/manageteamplayers" className='card' style={{ textDecoration: 'none' }}>Manage teams and players</Link>
            <Link to="/managegames" className='card' style={{ textDecoration: 'none' }}>Manage games</Link>
            <Link to="/viewresults" className='card' style={{ textDecoration: 'none' }}>View results</Link>
            <Link to="/viewschedule" className='card' style={{ textDecoration: 'none' }}>View schedule</Link>
            <Link to='/admin' className='card' style={{ textDecoration: 'none' }}>Admin panel</Link>
        </div>
    );
}

export default Home;