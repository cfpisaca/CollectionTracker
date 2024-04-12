import React, { useState, useRef, useEffect } from 'react';
import './createListing.css';

function CreateListing() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const photoInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const previewContainerRef = useRef(null);

    useEffect(() => {
        const updatePreviewContainerSize = () => {
            let aspectRatio;
            if (media.length > 0) {
                if (media[currentImageIndex].type === 'image') {
                    aspectRatio = media[currentImageIndex].aspectRatio;
                } else {
                    aspectRatio = 16 / 12;
                }
            } else {
                aspectRatio = 16 / 12;
            }

            const previewContainer = previewContainerRef.current;
            if (previewContainer) {
                const width = previewContainer.offsetWidth;
                const height = width / aspectRatio;
                previewContainer.style.height = `${height}px`;
            }
        };

        updatePreviewContainerSize();
        window.addEventListener('resize', updatePreviewContainerSize);
        return () => window.removeEventListener('resize', updatePreviewContainerSize);
    }, [media, currentImageIndex]);

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
            alert("Description cannot exceed 150 words.");
        }
    };

    const handleMediaChange = (event) => {
        const files = event.target.files;
        const totalMediaCount = media.length + files.length;
    
        if (totalMediaCount > 10) {
            alert("You can only upload a maximum of 10 photos and videos.");
            return;
        }
    
        const newMediaItems = Array.from(files).map((file) => ({
            type: file.type.startsWith('image') ? 'image' : 'video',
            url: URL.createObjectURL(file),
            aspectRatio: file.type.startsWith('image') ? 16 / 12 : 16 / 12,
        }));
    
        setMedia((prev) => [...prev, ...newMediaItems]);
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

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % media.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
    };

    const handleRemoveImage = () => {
        setMedia((prevMedia) => prevMedia.filter((_, index) => index !== currentImageIndex));
        setCurrentImageIndex(0);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const listing = {
            id: Date.now(),
            title: title,
            price: parseFloat(price),
            description: description
        };

        try {
            const response = await fetch('http://localhost:8080/addListing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(listing),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);
            alert('Listing created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create listing');
        }
    };   
    
    return (
        <div className="CreateListing">
            <header className="header">
                <button onClick={handleBack} className="back-button">
                    X
                </button>
                <h1>CollectionTracker</h1>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    <h2>Item for Sale</h2>
                    <div className="buttons-container">
                        <input type="file" multiple ref={photoInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleMediaChange} />
                        <button className="button-style" onClick={triggerPhotoUpload}>
                            Add Photos
                        </button>
                        <input type="file" multiple ref={videoInputRef} style={{ display: 'none' }} accept="video/*" onChange={handleMediaChange} />
                        <button className="button-style" onClick={triggerVideoUpload}>
                            Add Videos
                        </button>
                    </div>
                    <h3>Required</h3>
                    <input type="text" placeholder="Title" className="input-box" value={title} onChange={handleTitleChange} />
                    <input type="number" placeholder="Price" className="input-box" value={price} onChange={handlePriceChange} />
                    <textarea placeholder="Description" className="input-box" value={description} onChange={handleDescriptionChange}></textarea>
                    <button type="submit" className="button-style" onClick={handleSubmit}>
                        Create Listing
                    </button>
                </aside>
                <section id="background">
                    <div className="preview-box">
                        <h2>Preview</h2>
                        <div className="preview-container" ref={previewContainerRef}>
                            <div className="media-preview" style={{ position: 'relative' }}>
                                {media.map((item, index) => (
                                    index === currentImageIndex && (
                                        item.type === 'image' ? (
                                            <img key={index} src={item.url} alt="Upload" className={item.aspectRatio < 1 ? "vertical" : ""} />
                                        ) : (
                                            <video key={index} src={item.url} controls style={{ zIndex: '1' }} />
                                        )
                                    )
                                ))}
                                <div className="image-navigation" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                                    {media.length > 1 && (
                                        <>
                                            <button style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, zIndex: '2' }} onClick={handlePreviousImage}>&lt;</button>
                                            <button style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 0, zIndex: '2' }} onClick={handleNextImage}>&gt;</button>
                                        </>
                                    )}
                                    {media.length > 0 && (
                                        <button className="remove-button" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '2' }} onClick={handleRemoveImage}>X</button>
                                    )}
                                </div>
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
