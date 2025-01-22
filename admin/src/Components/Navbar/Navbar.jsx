import React from 'react';
import './Navbar.css';
// import navlogo from '../../assets/logo.png';
// import navProfile from '../../assets/nav_dropdown.png';

const Navbar = () => { // mount the component in app.jsx
    return (
        <div className='navbar'>
            <img src={navlogo} alt="" className="nav-logo" />
            <img src={navProfile} className='nav-profile' alt="" />
        </div>
    )
}

export default Navbar
 className='navbar'