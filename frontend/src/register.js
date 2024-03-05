import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Import CSS file

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        emailOrMobile: '',
        password: '',
        birthdate: '',
        gender: '',
    });
    
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic form validation
        if (!formData.firstname || !formData.lastname || !formData.username || 
            !formData.emailOrMobile || !formData.password || !formData.birthdate || 
            !formData.gender) {
            setFormErrors({ message: 'Please fill out all fields'});
            return;
        }
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
        <div>
            <h1>Collection Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="emailOrMobile"
                    placeholder="Email or Mobile Number"
                    value={formData.emailOrMobile}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="birthdate"
                    placeholder="Birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit">Sign Up</button>
                {formErrors.message && <p>{formErrors.message}</p>}
            </form>
        </div>
    );
}

export default Register;