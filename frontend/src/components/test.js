import React, { useState } from 'react';
import './createListing.css';

function CreateListing() {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPicture, setItemPicture] = useState(null); // Store file data

    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
    setItemPicture(file);
   
  };

    const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Create FormData object to send form data including files
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemPrice', itemPrice);
    formData.append('itemDescription', itemDescription);
    formData.append('itemPicture', itemPicture);

    // try {
    //   const response = await fetch('https://your-backend-api-url.com/your-endpoint', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     console.log('Item information sent successfully.');
    //     // Reset form fields after successful submission
    //     setItemName('');
    //     setItemPrice('');
    //     setItemDescription('');
    //     setItemPicture(null);
    //   } else {
    //     console.error('Failed to send item information.');
    //   }
    // } catch (error) {
    //   console.error('Error sending item information:', error);
    // }
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
        <input type="file" id="itemPictures" name="itemPictures" accept="image/*" multiple onChange={handleFileUpload} required /><br /><br />
        {/* Submit button */}
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default CreateListing;
