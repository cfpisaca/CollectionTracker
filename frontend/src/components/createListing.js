import React from 'react';
import './createListing.css';

function CreateListing() {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="CreateListing">
            <header className="header">
                <button onClick={handleBack} className="back-button">X</button>
                <h1>CollectionTracker</h1>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    <h2>Item for Sale</h2>
                    <div className="buttons-container">
                        <button className="button-style">Add Photos</button>
                        <button className="button-style">Add Video</button>
                    </div>
                    <h3>Required</h3>
                    <input type="text" placeholder="Title" className="input-box" />
                    <input type="number" placeholder="Price" className="input-box" />
                    <textarea placeholder="Description" className="input-box"></textarea>
                </aside>
                <section id="background">
                </section>
            </main>
        </div>
    );
}

export default CreateListing;
