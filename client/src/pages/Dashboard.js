import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Importing Font Awesome Bell icon
import PageContainer from '../components/PageContainer';
const Dashboard = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        // Sample notifications data
        { id: 1, message: 'New follower on Twitter' },
        { id: 2, message: 'New comment on your post' },
    ]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div style={{ display: 'flex' }}>
            <PageContainer/>

        </div>
    );
};

export default Dashboard;
