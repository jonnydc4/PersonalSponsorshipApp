// client/src/components/PostJobButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const PostJobButton = () => {
    const navigate = useNavigate();

    const handlePostJobClick = () => {
        navigate('/post-job');
    };

    return <Button label="Post Job" onClick={handlePostJobClick} />;
};

export default PostJobButton;
