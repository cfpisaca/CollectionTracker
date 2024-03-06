import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        const errors = [];
        if (
            !formData.firstname ||
            !formData.lastname ||
            !formData.username ||
            !formData.emailOrMobile ||
            !formData.password ||
            !formData.birthdate ||
            !formData.gender
        ) {
            errors.push('Please fill out all fields');
        }
        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }
        // Send registration to the backend
        axios
            .post('/api/register', formData)
            .then((response) => {
                console.log(response.data);
                // Redirect or show success message
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                // Display error message to the user
                setFormErrors('Registration failed. Please try again later.');
            });
    };

    const handleDismissError = () => {
        setFormErrors([]);
    };

    return (
        <div className="page-wrapper">
            <div className="register-form">
                <h1>CollectionTracker</h1>
                <form onSubmit={handleSubmit}>
                <h2>Create a new account</h2>
                <hr className="divider" />
                    <div className="name-fields">
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
                    </div>
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
                        placeholder="Mobile number or email"
                        value={formData.emailOrMobile}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="New password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="birthdate">Date of Birth</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="submit">Sign Up</button>
                    {/* Already have an account link */}
                    <div className="have-account">
                        <p><Link to="/">Already have an account? </Link></p>
                    </div>
                </form>
                {/* Error message */}
                {formErrors.length > 0 && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>{formErrors[0]}</p>
                            <button onClick={handleDismissError}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
