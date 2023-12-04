import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContest } from '../hooks/useAuthContext';


const Navbar = () => {
    const {logout} = useLogout();
    const {user} = useAuthContest();

    const handleOnClick = () => {
        logout()
    }
    return(
        <>
            <div className="navbar_cont">
                <ul className="navbar d-flex justify-content-end">
                    {user && (<div>
                        <li style={{color:"white",fontFamily: "Montserrat"}}>Welcome {user.name}!</li>
                        <li><Link to="/home">Home</Link></li>
                        <li><button onClick={handleOnClick} style={{padding:"8px 16px", border:"none",backgroundColor:"#e5e5e5"}}>Logout</button></li>

                    </div>)}
                    {!user && (
                        <div>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/">Get Started</Link></li>
                        </div>
                    )}
                    
                </ul>
            </div>
        </>
    )
}

export default Navbar;
