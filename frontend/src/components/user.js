import React, { useState } from 'react';
import profileIcon from '../icons/profileIcon.webp';
import searchIcon from '../icons/searchIcon.svg';
import arrowIcon from '../icons/arrowIcon.png';
import './user.css'; 

function User() {
    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleMarketplaceProfileClick = () => {
        setShowProfileModal(true);
    };

    const handleCloseModal = () => {
        setShowProfileModal(false);
    };

    const handleManageListingsClick = () => {
        // Handle Manage listings button click
    };

    const handleCreateListingClick = () => {
        window.location.href = "/createListing"; // Redirect to create listing page
    };

    const handleGoToHomePage = () => {
        window.location.href = "/"; // Redirect to home page
    };

    return (
        <div className="User">
            <header className="header">
                <div className="title-section">
                    <h1>CollectionTracker</h1>
                </div>
            </header>
            <main className="main-content">
                <aside className="sidebar-user">
                    <div className="sidebar-section">
                        <button className="go-back-button" onClick={handleGoToHomePage}>
                            <img src={arrowIcon} className="arrow-icon" alt="Arrow Icon" />
                        </button>
                        <h2>Marketplace</h2>
                    </div>
                    <div className="create-listing">
                        <button className="create-listing-button" onClick={handleCreateListingClick}>
                            + Create New Listing
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
                        <div className="sidebar3-header">
                            <h2>Your listings</h2>
                        </div>
                        <div className="search-bar-user">
                            <input type="text" placeholder="Search listings" className="search-input" />
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
                            <button className="create-listing-button" onClick={handleCreateListingClick}>
                                + Create New Listing
                            </button>
                            <button className="see-marketplace-button" onClick={handleMarketplaceProfileClick}>
                                See Marketplace Profile
                            </button>
                        </div>
                    </div>
                </aside>
            </main>

            {showProfileModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-modal" onClick={handleCloseModal}>×</span>
                        <h2>Marketplace Profile</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
