import React, { useState } from 'react';
import searchIcon from './searchIcon.svg';
import profileIcon from './profileIcon.webp';
import './home.css';

function Home() {
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: '' 
    });

    const [loggedIn, setLoggedIn] = useState(false); // Track login status

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = () => {
        setLoggedIn(true); // Set login status to true
        alert(`Log in with Username: ${credentials.username} and Password: ${credentials.password}`);
    };

    const handleLogout = () => {
        setLoggedIn(false); // Set login status to false
        // Redirect to home or login page
        window.location.href = "/";
    };

    const handleRegisterClick = () => {
        window.location.href = "/register";
    };

    const handleYourAccountClick = () => {
        if (loggedIn) {
            // Redirect to user page if logged in
            window.location.href = "/user";
        } else {
            // Redirect to register page if not logged in
            window.location.href = "/register";
        }
    };

    const handleYourCreateNewListing = () => {
        if (loggedIn) {
            // Redirect to create listing page if logged in
            window.location.href = "/createListing";
        } else {
            // Redirect to register page if not logged in
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
                                name="username"
                                value={credentials.username}
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
