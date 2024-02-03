import { FaBell } from 'react-icons/fa'; // Importing Font Awesome Bell icon
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
            <aside style={{ width: '250px' }}> {/* Sidebar as an aside column */}

            </aside>
            <main style={{ flex: 1, padding: '20px' }}> {/* Main content area */}
                <div>
                <FaBell onClick={toggleNotifications} style={{ cursor: 'pointer' }} />
                    {showNotifications && (
                        <div>
                            {notifications.map(notification => (
                                <p key={notification.id}>{notification.message}</p>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default Dashboard;
