import React, { useState, useRef, useEffect } from 'react';
import './createListing.css';

function CreateListing() {
    const [formState, setFormState] = useState({ title: '', price: '', description: '', media: [] });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const refs = {
        photo: useRef(null),
        video: useRef(null),
        previewContainer: useRef(null)
    };

    useEffect(() => {
        const updatePreviewSize = () => {
            const { previewContainer } = refs;
            const aspectRatio = formState.media.length > 0 ? 16 / 12 : 16 / 12;
            const width = previewContainer.current.offsetWidth;
            previewContainer.current.style.height = `${width / aspectRatio}px`;
        };

        updatePreviewSize();
        window.addEventListener('resize', updatePreviewSize);
        return () => window.removeEventListener('resize', updatePreviewSize);
    }, [formState.media, currentImageIndex]);

    const handleChange = (key) => (e) => {
        if (key === 'price') {
            const pattern = /^\d{1,8}(\.\d{0,2})?$/;
            if (pattern.test(e.target.value)) setFormState(prev => ({ ...prev, [key]: e.target.value }));
        } else if (key === 'description') {
            const words = e.target.value.split(/\s+/);
            if (words.length <= 150) setFormState(prev => ({ ...prev, [key]: e.target.value }));
            else alert("Description cannot exceed 150 words.");
        } else {
            setFormState(prev => ({ ...prev, [key]: e.target.value }));
        }
    };

    const handleMediaChange = (type) => (event) => {
        const files = event.target.files;
        const newMediaItems = Array.from(files).map(file => ({
            type: file.type.startsWith('image') ? 'image' : 'video',
            url: URL.createObjectURL(file),
            aspectRatio: 16 / 12,
        }));

        setFormState(prev => {
            const updatedMedia = prev.media.concat(newMediaItems);
            return updatedMedia.length <= 10 ? { ...prev, media: updatedMedia } : prev;
        });
    };

    const navigateMedia = (direction) => () => {
        setCurrentImageIndex(prev => (prev + direction + formState.media.length) % formState.media.length);
    };

    const handleRemoveImage = () => {
        setFormState(prev => {
            const updatedMedia = prev.media.filter((_, i) => i !== currentImageIndex);
            return { ...prev, media: updatedMedia };
        });
        setCurrentImageIndex(0);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const listing = { id: Date.now(), ...formState };

        try {
            const response = await fetch('http://localhost:8080/addListing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(listing),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            alert('Listing created successfully!');
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create listing');
        }
    };

    return (
        <div className="CreateListing">
            <header className="header">
                <button onClick={() => window.history.back()} className="back-button">X</button>
                <h1>CollectionTracker</h1>
            </header>
            <main className="main-content">
                <aside className="sidebar">
                    <h2>Item for Sale</h2>
                    <div className="buttons-container">
                        {['photo', 'video'].map(type => (
                            <React.Fragment key={type}>
                                <input type="file" multiple ref={refs[type]} style={{ display: 'none' }} accept={type === 'photo' ? "image/*" : "video/*"} onChange={handleMediaChange(type)} />
                                <button className="button-style" onClick={() => refs[type].current.click()}>
                                    Add {type === 'photo' ? 'Photos' : 'Videos'}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                    <h3>Required</h3>
                    <input type="text" placeholder="Title" className="input-box" value={formState.title} onChange={handleChange('title')} />
                    <input type="number" placeholder="Price" className="input-box" value={formState.price} onChange={handleChange('price')} />
                    <textarea placeholder="Description" className="input-box" value={formState.description} onChange={handleChange('description')} />
                    <button type="submit" className="button-style" onClick={handleSubmit}>Create Listing</button>
                </aside>
                <section id="background">
                    <div className="preview-box">
                        <h2>Preview</h2>
                        <div className="preview-container" ref={refs.previewContainer}>
                            <div className="media-preview" style={{ position: 'relative' }}>
                                {formState.media.map((item, index) => index === currentImageIndex && (
                                    item.type === 'image' ? (
                                        <img key={index} src={item.url} alt="Upload" className="media-item" />
                                    ) : (
                                        <video key={index} src={item.url} controls className="media-item" />
                                    )
                                ))}
                                <div className="image-navigation" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    {formState.media.length > 1 && (
                                        <>
                                            <button onClick={navigateMedia(-1)} style={{ position: 'absolute', left: '10px' }}>&lt;</button>
                                            <button onClick={navigateMedia(1)} style={{ position: 'absolute', right: '10px' }}>&gt;</button>
                                        </>
                                    )}
                                    {formState.media.length > 0 && (
                                        <button className="remove-button" style={{ position: 'absolute', right: '10px', top: '-335px' }} onClick={handleRemoveImage}>X</button>
                                    )}
                                </div>
                            </div>
                            <div className="details-preview">
                                <h3>{formState.title || 'Title'}</h3>
                                <p>{formState.price ? `$${formState.price}` : 'Price'}</p>
                                <h3>Details</h3>
                                <p>{formState.description || 'Description will appear here.'}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default CreateListing;
