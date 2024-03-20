import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from './profileIcon.webp';
import searchIcon from './searchIcon.svg';
import './user.css'; // Import CSS file


function User() {
    const handleMarketplaceProfileClick = () => {
        // Handle Marketplace profile button click
    };

    const handleManageListingsClick = () => {
        // Handle Manage listings button click
    };

    return (
        <div className="User">
            <header className="header">
                <div className="title-section">
                    <h1>Collection Tracker</h1>
                </div>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h2>Marketplace</h2>
                    </div>
                    <div className="create-listing">
                        <button className="create-listing-button">
                            <Link to="/create-listing" className="create-listing-link">+ Create New Listing</Link>
                        </button>
                        <div className="user-actions">
                            <div className="your-marketplace">
                                <button className="your-marketplace-button" onClick={handleMarketplaceProfileClick}>
                                    <img src={profileIcon} className="profile-icon" alt="Profile Icon" />
                                    Marketplace Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="manage-listings">
                        <button className="manage-listings-button" onClick={handleManageListingsClick}>
                            Manage Listings
                        </button>
                    </div>
                </aside>
                <section id="listings">
                  <div className="sidebar3-section">
                        <h2>Your listings</h2>
                        <div className="search-bar">
                            <input type="text" placeholder="Search Marketplace" className="search-input" />
                            <img src={searchIcon} className="search-icon" alt="Search Icon" />
                        </div>
                    </div>
                  </section>
                <aside className="sidebar2">
                    <div className="sidebar2-section">
                        <h3>Marketplace Profile</h3>
                        <div className="your-marketplace">
                            <div className="user-profile">
                                <img src={profileIcon} className="profile-icon" alt="Profile Icon" />
                                <span className="user-name">USERNAME HERE</span>
                            </div>
                            <button className="create-listing-button">
                                <Link to="/create-listing" className="create-listing-link">+ Create New Listing</Link>
                            </button>
                            <button className="see-marketplace-button" onClick={handleMarketplaceProfileClick}>
                                See Marketplace Profile
                            </button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default User;
