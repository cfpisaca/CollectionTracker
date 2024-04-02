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
        setFormErrors({ ...formErrors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic form validation
        const errors = [];
        if (!formData.firstname) {
            errors.firstname = 'First name is required';
        }
        if (!formData.lastname) {
            errors.lastname = 'Last name is required';
        }
        if (!formData.username) {
            errors.username = 'Username is required';
        }
        if (!formData.emailOrMobile) {
            errors.emailOrMobile = 'Email or Mobile number is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        if (!formData.birthdate) {
            errors.birthdate = 'Date of birth is required';
        }
        if (!formData.gender) {
            errors.gender = 'Gender is required';
        }
        setFormErrors(errors);

        // Check if there are any errors
        if (Object.keys(errors).length === 0) {

        // Send registration to the backend
        axios
            .post('http://localhost:3000/register', formData)
            .then((response) => {
                console.log(response.data);
                setFormErrors([]); // Clears previous error messages
                setFormData({
                        firstname: '',
                        lastname: '',
                        username: '', 
                        emailOrMobile: '',
                        password: '', 
                        birthdate: '', 
                        gender: '', 
                });
                // Redirect or show success message
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                // Display error message to the user
                setFormErrors({ registration: 'Registration failed. Please try again later.'});
            });
        }
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
                        {formErrors.firstname && <p className="error-message">
                            {formErrors.firstname}</p>}
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                        {formErrors.lastname && <p className="error-message">
                            {formErrors.lastname}</p>}
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {formErrors.username && <p className="error-message">
                            {formErrors.username}</p>}
                    <input
                        type="text"
                        name="emailOrMobile"
                        placeholder="Mobile number or email"
                        value={formData.emailOrMobile}
                        onChange={handleChange}
                    />
                    {formErrors.emailOrMobile && <p className="error-message">
                            {formErrors.emailOrMobile}</p>}
                    <input
                        type="password"
                        name="password"
                        placeholder="New password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {formErrors.password && <p className="error-message">
                            {formErrors.password}</p>}
                    <label htmlFor="birthdate">Date of Birth</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />
                    {formErrors.birthdate && <p className="error-message">
                            {formErrors.birthdate}</p>}
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {formErrors.gender && <p className="error-message">
                            {formErrors.gender}</p>}
                    <button type="submit">Sign Up</button>
                    {/* Already have an account link */}
                    <div className="have-account">
                        <p><Link to="/">Already have an account? </Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
