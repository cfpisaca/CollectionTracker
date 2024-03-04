import React, { useState } from 'react';
import axios from 'axios';

function createAcc() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send registration to the backend
        axios.post('/api/register', formData)
            .then((response) => {
                console.log(response.data);
                // Redirect or show success message
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                // Display error message to the user
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default createAcc;