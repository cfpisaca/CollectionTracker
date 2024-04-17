import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './register.css';

function Register() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/addCollector', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ ...formData, id: Date.now() }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const user = await response.json();
            console.log('Account created:', user);

            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', formData.username); 

            alert('User created successfully!');
            navigate('/'); 
        } catch (error) {
            alert(error.message);
        }
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
                    {renderInput('email', 'text', 'Email')}
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
                        <p><Link to="/">Already have an account?</Link></p> 
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
