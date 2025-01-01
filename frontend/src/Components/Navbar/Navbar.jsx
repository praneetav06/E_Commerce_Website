import React from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
function Navbar() {
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo"/>
                <p>SHOPPER</p>
            </div>
        </div>
    );
}

export default Navbar;
