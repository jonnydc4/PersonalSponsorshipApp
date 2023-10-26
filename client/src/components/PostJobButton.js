// client/src/components/PostJobButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css'; // Import the styles

const PostJobButton = () => {
    const navigate = useNavigate();

    const handlePostJobClick = () => {
        navigate('/post-job');
    };

    return (
        <button className="custom-button" onClick={handlePostJobClick}>
            Post Job
        </button>
    );
};

export default PostJobButton;
