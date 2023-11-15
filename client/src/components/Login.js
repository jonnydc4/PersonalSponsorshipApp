// client/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // State to hold the email input value and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make an asynchronous POST request to the backend to verify the email
            const response = await fetch('/verifyEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the email as JSON in the request body
                body: JSON.stringify({ email }),
            });

            // Parse the JSON response from the server
            const data = await response.json();

            // If the email is valid, navigate to the jobs page
            if (data.isValid) {
                navigate('/jobs');
            } else {
                setError(data.message || 'Email not found');
            }
        } catch (err) {
            setError('Network or server error');
        }
    };

    // Render the login form
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
