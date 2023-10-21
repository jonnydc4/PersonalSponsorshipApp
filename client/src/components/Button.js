// client/src/components/Button.js
import React from 'react';
import './Button.css'; // Importing styles

const Button = ({ label, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;