import React from 'react';
import './createListing.css'; 
const PreviewBox = ({ listing, onRemoveMedia }) => {
    if (!listing) return null; 

    return (
        <div className="preview-box">
            <div className="preview-container">
                {listing.media && (
                    <img src={listing.media.url} alt="Upload Preview" className="media-item" />
                )}
                {listing.media && (
                    <button onClick={onRemoveMedia} className="remove-button">Remove Image</button>
                )}
                <div className="details-preview">
                    <h3>{listing.title || 'Title'}</h3>
                    <p>{listing.price ? `$${listing.price}` : 'Price'}</p>
                    <p>{listing.description || 'Description will appear here'}</p>
                </div>
            </div>
        </div>
    );
};

export default PreviewBox;
