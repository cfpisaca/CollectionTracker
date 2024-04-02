import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './createListing.css';

function CreateListing() {
  return (
    <div className="createListing">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-heading">Item for Sale</h2>
        <a href="#" className="sidebar-item active">Item Name</a>
        <a href="#" className="sidebar-item">Item Price</a>
        <a href="#" className="sidebar-item">Item Description</a>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Your form or content goes here */}
        <h1>Create Listing</h1>
        <form id="createListingForm">
          {/* Item Name input */}
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" name="itemName" required /><br /><br />

          {/* Item Price input */}
          <label htmlFor="itemPrice">Item Price:</label>
          <input type="number" id="itemPrice" name="itemPrice" min="0" step="0.01" required /><br /><br />

          {/* Item Description input */}
          <label htmlFor="itemDescription">Item Description:</label><br />
          <textarea id="itemDescription" name="itemDescription" rows="4" cols="50" required></textarea><br /><br />

          {/* Submit button */}
          <button type="submit">Create Listing</button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;



