import React, { useState, useEffect } from 'react';
import './user.css';
import profileIcon from '../icons/profileIcon.webp';
import searchIcon from '../icons/searchIcon.svg';
import arrowIcon from '../icons/arrowIcon.png';
import { fetchListings } from '../services/api'; 
import PreviewBox from './previewBox';

function User() {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    useEffect(() => {
        const loadListings = async () => {
            const listingsFromServer = await fetchListings();
            setListings(listingsFromServer);
        };
        loadListings();
    }, []);

    const handleListingClick = (listing) => {
        setSelectedListing(listing);
        setShowPreviewModal(true);
    };

    const handleCloseModal = () => {
        setShowProfileModal(false);
        setShowPreviewModal(false);
    };

    const handleCreateListingClick = () => {
        window.location.href = "/createListing";
    };

    const handleGoToHomePage = () => {
        window.location.href = "/";
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
                                <button className="your-marketplace-button" onClick={() => setShowProfileModal(true)}>
                                    <img src={profileIcon} className="profile-icon" alt="Profile Icon" />
                                    Marketplace Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="manage-listings">
                        <button className="manage-listings-button">
                            Manage Listings
                        </button>
                    </div>
                </aside>
                <section id="listings">
                    <div className="sidebar3-section">
                        <h2>Your Listings</h2>
                    </div>
                    <div className="listings-container">
                        <div className="search-bar-user">
                            <input type="text" placeholder="Search listings" className="search-input" />
                            <img src={searchIcon} className="search-icon" alt="Search Icon" />
                        </div>
                    </div>
                    {listings.map(listing => (
                            <div key={listing.id} className="listing-entry" onClick={() => handleListingClick(listing)}>
                                <button>{listing.title}</button>
                            </div>
                        ))}
                </section>
                
            </main>

            {showProfileModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-modal" onClick={handleCloseModal}>×</span>
                        <h2>Marketplace Profile</h2>
                    </div>
                </div>
            )}

            {showPreviewModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-modal" onClick={handleCloseModal}>×</span>
                        <PreviewBox listing={selectedListing} onRemoveMedia={() => setSelectedListing({...selectedListing, media: null})} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
