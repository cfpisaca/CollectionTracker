import React from 'react';

const PreviewBox = ({ listing, onRemoveMedia }) => {
    if (!listing) return null;

    return (
        <div className="preview-container">
            <div className="details-preview">
                <h3>{listing.title || 'Title'}</h3>
                <p>{listing.price ? `$${listing.price}` : 'Price'}</p>
                <h3>Details</h3>
                <p>{listing.description || 'Description will appear here'}</p>
            </div>
        </div>
    );
};

export default PreviewBox;
