import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

const Button = ({ label }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (label === "Log in") {
            navigate('/login');
        }

        if (label === "ExamplePage") {
            navigate('/example');
        }
        if (label === "InfluencerSearch") { //Will remove later once we connect components
            navigate('/influencer-search')
        }
        if (label === "JobManagerPage") { // Will remove later once we connect components
            navigate('/manage-jobs')
        }
        if (label === "JobOffersPage") {
            navigate('/job-offers')
        }
    };

    return (
        <button className="custom-button" onClick={handleClick}>
            {label}
        </button>
    );
};

export default Button;

