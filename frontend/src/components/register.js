import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css'; 

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

    const [formErrors, setFormErrors] = useState({});

    const isValidEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        // Regular expression to validate phone number format
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validatePassword = (password) => {
        // Define password requirements
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        // Check if password meets all requirements
        if (
            password.length < minLength ||
            !hasUppercase ||
            !hasLowercase ||
            !hasNumber ||
            !hasSpecialChar
        ) {
            return 'Password must be at least 8 character long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        // Validate email format
        if (name === 'emailOrMobile' && value.trim() !== '') {
            if (!isValidEmail(value) && !isValidPhoneNumber(value)) {
                errorMessage = 'Invalid email address or phone number';
            }
        }

        // Validate password format
        if (name === 'password' && value.trim() !== '') {
            errorMessage = validatePassword(value);
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: errorMessage }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any fields are empty
        const emptyFields = Object.keys(formData).filter(key => formData[key] === '');
        if (emptyFields.length > 0) {
            const errors = {};
            emptyFields.forEach(field => {
                errors[field] = field.charAt(0).toUpperCase() + field.slice(1) + ' is required';
            });
            setFormErrors(errors);
            return;
        }

        const response = await fetch('http://localhost:8080/addCollector', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ...formData, id: Date.now() }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        console.log('Success:', await response.json());
        alert('User created successfully!');
    };

    const renderInput = (name, type, placeholder) => (
        <>
            <input type={type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} />
            {formErrors[name] && <p className="error-message">{formErrors[name]}</p>}
        </>
    );

    return (
        <div className="page-wrapper">
            <div className="register-form">
                <h1>CollectionTracker</h1>
                <form onSubmit={handleSubmit}>
                    <h2>Create a new account</h2>
                    <hr className="divider" />
                    <div className="name-fields">
                        {renderInput('firstname', 'text', 'First Name')}
                        {renderInput('lastname', 'text', 'Last Name')}
                    </div>
                    {renderInput('username', 'text', 'Username')}
                    {renderInput('emailOrMobile', 'text', 'Mobile number or email')}
                    {renderInput('password', 'password', 'New password')}
                    {renderInput('birthdate', 'date', '')}
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {formErrors.gender && <p className="error-message">{formErrors.gender}</p>}
                    <button type="submit">Sign Up</button>
                    <div className="have-account">
                        <p><Link to="/">Already have an account? </Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
