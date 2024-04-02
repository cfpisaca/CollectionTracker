import React, { useState } from 'react';
import './createListing.css';

function CreateListing() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
   
  };

  return (
    
    <div className="CreateListing">
      <form id="createListingForm">
        <h1>Create Listing</h1> {/* Moved inside the form */}
        {/* Item Name input */}
        <label htmlFor="itemName">Item Name:</label>
        <input type="text" id="itemName" name="itemName" required /><br /><br />

        {/* Item Price input */}
        <label htmlFor="itemPrice">Item Price:</label>
        <input type="number" id="itemPrice" name="itemPrice" min="0" step="0.01" required /><br /><br />

        {/* Item Description input */}
        <label htmlFor="itemDescription">Item Description:</label><br />
        <input type="text" id="itemDescription" name="itemDescription" required/><br /><br />

        {/* File Upload input for Item Picture */}
        <label htmlFor="itemPicture">Item Picture:</label><br />
        <input type="file" id="itemPicture" name="itemPicture" accept="image/*" onChange={handleFileUpload} required /><br /><br />

        {/* Submit button */}
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default CreateListing;
