// Home.js

import React, { useState } from 'react';
import './Home.css';

function Home() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = () => {
        alert(`Log in with Username: ${credentials.username} and Password: ${credentials.password}`);
    };

    const handleRegister = () => {
        alert('Redirect to Register Page');
    };

    return (
        <div className="Home">
            <header className="header">
                <div className="title-section">
                    <h1>CollectionTracker</h1>
                </div>
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
                    <button className="register-button" onClick={handleRegister}>Register</button>
                </div>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h2>Marketplace</h2>
                    </div>
                    <div className="sidebar-section search-bar">
                        <input type="text" placeholder="Search Marketplace" />
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
