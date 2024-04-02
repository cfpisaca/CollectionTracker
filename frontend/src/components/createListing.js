import React from 'react';
import './createListing.css';

function CreateListing() {
    return (
        <div className="CreateListing">
            <header className="header">
                <div className="title-section">
                    <h1>CollectionTracker</h1>
                </div>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    {/* Keep the sidebar empty */}
                </aside>
                <section id="background">
                    {/* Content for Create Listing */}
                </section>
            </main>
        </div>
    );
}

export default CreateListing;
