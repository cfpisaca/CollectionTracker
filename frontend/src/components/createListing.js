import React, { useState, useRef } from 'react';
import './createListing.css';

function CreateListing() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState([]);
    const photoInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const handleBack = () => {
        window.history.back();
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;
        const pattern = /^\d{1,8}(\.\d{0,2})?$/;
        if (pattern.test(inputValue)) {
            setPrice(inputValue);
        }
    };

    const handleDescriptionChange = (e) => {
        const words = e.target.value.split(/\s+/);
        if (words.length <= 150) {
            setDescription(e.target.value);
        } else {
            alert("Description cannot exceed 300 words.");
        }
    };

    const handleMediaChange = (event) => {
        const files = event.target.files;
        const newMediaItems = Array.from(files).map(file => ({
            type: file.type.startsWith('image') ? 'image' : 'video',
            url: URL.createObjectURL(file)
        }));
        setMedia(prev => [...prev, ...newMediaItems]);
    };

    const triggerPhotoUpload = () => photoInputRef.current.click();
    const triggerVideoUpload = () => videoInputRef.current.click();

    const formatPriceForDisplay = (price) => {
        const priceAsNumber = Number(price);
        if (priceAsNumber > 100) {
            return priceAsNumber.toLocaleString();
        }
        return price;
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
                        <input type="file" multiple ref={photoInputRef} style={{display: 'none'}} accept="image/*" onChange={handleMediaChange} />
                        <button className="button-style" onClick={triggerPhotoUpload}>Add Photos</button>
                        <input type="file" multiple ref={videoInputRef} style={{display: 'none'}} accept="video/*" onChange={handleMediaChange} />
                        <button className="button-style" onClick={triggerVideoUpload}>Add Video</button>
                    </div>
                    <h3>Required</h3>
                    <input type="text" placeholder="Title" className="input-box" value={title} onChange={handleTitleChange} />
                    <input type="number" placeholder="Price" className="input-box" value={price} onChange={handlePriceChange} />
                    <textarea placeholder="Description" className="input-box" value={description} onChange={handleDescriptionChange}></textarea>
                </aside>
                <section id="background">
                    <div className="preview-box">
                        <h2>Preview</h2>
                        <div className="preview-container">
                            <div className="media-preview">
                                {media.map((item, index) => (
                                    item.type === 'image' ? <img key={index} src={item.url} alt="Upload" style={{maxWidth: '100%', maxHeight: '100px'}} /> :
                                    <video key={index} src={item.url} controls style={{maxWidth: '100%', maxHeight: '100px'}} />
                                ))}
                            </div>
                            <div className="details-preview">
                                <h3>{title || 'Title'}</h3>
                                <p>{price ? `$${formatPriceForDisplay(price)}` : 'Price'}</p>
                                <h3>Details</h3>
                                <p>{description || 'Description will appear here.'}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default CreateListing;
