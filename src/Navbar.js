import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <header onClick={()=>window.location.reload(false)}>Basketball manager</header>
            <div className="home-link">
                <Link to="/" style={{color:'#141036'}}><span className="material-icons" style={{fontSize:'36px'}}>home</span></Link>
                
            </div>
        </nav>
     );
}
 
export default Navbar;