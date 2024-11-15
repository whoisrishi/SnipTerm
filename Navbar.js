// src/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ username }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (username) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [username]); 

    return (
        <nav className="navbar">
            <div className="navbar-title">Code Snippets</div>
            {username ? (
                <div className="navbar-username">Welcome, {username}</div>
            ) : (
                <Link to="/login">Login/Signup</Link>
            )}
            {isLoggedIn && <Link to="/create">Create Snippet</Link>}
        </nav>
    );
};

export default Navbar;
