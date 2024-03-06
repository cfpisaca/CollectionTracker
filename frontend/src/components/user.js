import React, { useState } from 'react';
import './user.css';

function App() {
  // // Sample data for listed items
  // const [items, setItems] = useState([
  //   { id: 1, title: 'Item 1', description: 'Description of item 1', price: '$50' },
  //   { id: 2, title: 'Item 2', description: 'Description of item 2', price: '$80' },
  //   // Add more items here
  // ]);

  return (
    <div className="App">
      <div className="body">
      {/* Sidebar */}
      <div className="sidebar1">
        <a href="#" className="sidebar1-button">Create Listing</a>
        <a href="#" className="sidebar1-button">Your Listings</a>
      </div>
      
      {/* Main content */}
      <div className="main1-content">
        <header className="App1-header">
          <h1>Your Listings</h1>
          <div className="search1-bar">
            <input type="text" placeholder="Search items..." />
            <button>Search</button>
          </div>
        </header>
        {/* <div className="items-list">
          {items.map(item => (
            <div key={item.id} className="item">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p className="price">{item.price}</p>
            </div>
          ))} */}
        </div>
      </div>
    // </div>
  );
}

export default App;
