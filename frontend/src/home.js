import React, { useState, useEffect } from 'react';
import profileIcon from './icons/profileIcon.webp';
import searchIcon from './icons/searchIcon.svg';
import './home.css';

function Home() {
    const [credentials, setCredentials] = useState({
        email: localStorage.getItem('email') || '',
        password: ''
    });

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn);
        if (loggedIn) {
            localStorage.setItem('email', credentials.email);
        } else {
            localStorage.removeItem('email');
        }
    }, [loggedIn, credentials.email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: credentials.email, password: credentials.password }), 
            });
    
            const data = await response.json();
            if (response.ok) {
                setLoggedIn(true);
                alert(data.message);
            } else {
                throw new Error(data.message || 'Failed to log in');
            }
        } catch (error) {
            alert(error.message); 
        }
    };
    
    
    const handleLogout = () => {
        setLoggedIn(false);
        window.location.href = "/";
    };

    const handleRegisterClick = () => {
        window.location.href = "/register";
    };

    const handleYourAccountClick = () => {
        if (loggedIn) {
            window.location.href = "/user";
        } else {
            window.location.href = "/register";
        }
    };

    const handleYourCreateNewListing = () => {
        if (loggedIn) {
            window.location.href = "/createListing";
        } else {
            window.location.href = "/register";
        }
    };

    return (
        <div className="Home">
            <header className="header">
                <div className="title-section">
                    <h1>CollectionTracker</h1>
                </div>
                <div className="user-actions">
                    {loggedIn ? (
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    ) : (
                        <div className="user-login">
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={credentials.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleLogin}>Log In</button>
                            <button className="register-button" onClick={handleRegisterClick}>
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h2>Marketplace</h2>
                    </div>
                    <div className="sidebar-section search-bar">
                        <div className="search-bar">
                            <input type="text" placeholder="Search Marketplace" className="search-input" />
                            <img src={searchIcon} className="search-icon" alt="Search Icon" />
                        </div>
                    </div>
                    <div className="your-account">
                        <button className="your-account-button" onClick={handleYourAccountClick}>
                            <img src={profileIcon} className="profile-icon" alt="Profile Icon" />
                            Your Account
                        </button>
                    </div>
                    <div className="create-listing">
                        <button className="create-listing" onClick={handleYourCreateNewListing}>
                            + Create New Listing
                        </button>
                    </div>
                </aside>
                <section id="listings">
                    <h2>Listings</h2>
                </section>
            </main>
        </div>
    );
}

export default Home;
