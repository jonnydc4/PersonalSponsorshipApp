import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Toolbar, Typography, Box, Drawer, Tabs, Tab, Badge, Skeleton } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CustomStepper from "../newUserProcess/CustomStepper";
import DashboardPage from "../JobOffersPage.js";
import PostJobPage from "../JobPostingForm.js";
import JobOffersPage from "../JobOffersPage.js";
import MessagesPage from "../JobOffersPage.js";
import ProfilePage from "../profile_page/index";
import TaskList from './TaskList';
import BrandDealTableInfluencer from './BrandDealTableInfluencer.jsx';
import BrandDealTableCompany from './BrandDealTableCompany.jsx';
import InfluencerTrends from './InfluencerTrends.jsx';
import ComapnyTrends from './CompanyTrends.jsx';
import InfluencerChart from './InfluencerChart.jsx';

const Home = () => {
    const {currentUser} = useAuth();
    const [userType, setUserType] = useState('');
    const [userData, setUserData] = useState({});
    const [selectedTab, setSelectedTab] = useState(0);

    // Used in populating datafields on Dashboard
    const [data, setData] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleRender = async () => {
            try {
                localStorage.setItem("userId", currentUser.uid)
                const response = await fetch(`api/getUserTypeByID?id=${encodeURIComponent(currentUser.uid)}`)
                const data = await response.json()
                setUserType(data.userType)
                setUserData(data.userData)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error)
            }
        };
        handleRender();
    }, [currentUser]);

    useEffect(() => {
        // This is used to fetch all the jobs for a company, and display them on the dashboard 
        // (within the BrandDealTableCompany component).
        const fetchData = async () => {
            setLoading(true);
            try {
                localStorage.setItem('userId', currentUser.uid);
                // console.log(currentUser.uid);
                if (!currentUser.uid) {
                    throw new Error("Company ID is not available in local storage.");
                }
                const response = await fetch(`/api/jobs/${currentUser.uid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fetchedData = await response.json();
                console.log(fetchedData);
                setData({
                    field1: fetchedData.field1,
                    field2: fetchedData.field2,
                    field3: fetchedData.field3,
                    field4: fetchedData.field4,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally update state to show an error message in the UI
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []); // Include an empty dependency array if this should only run once on component mount
    

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Welcome, {currentUser.displayName || currentUser.email} <Badge color="primary">
                        <WavingHandIcon color="action" fontSize="large" />
                    </Badge>

                    <InfluencerTrends   />
                    <ComapnyTrends />
                    {/* <InfluencerChart /> */}
                    <BrandDealTableInfluencer />
                    <BrandDealTableCompany />
                    {/* Call TaskList to allow user creation of task */}
                    <TaskList />
                </Typography>
            case 1:
                return <PostJobPage />;
            case 2:
                return <JobOffersPage />;
            case 3:
                return <MessagesPage />;
            case 4:
                return <ProfilePage />;
            default:
                return <Typography variant="h5">Select a tab</Typography>;
        }
    };

    return (
        userType === null ? (
            <Box sx={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}>
                <Typography variant="h3" fontWeight="fontWeightLight" textAlign="center">
                    Let's setup your account.
                </Typography>
                <CustomStepper setUserType={setUserType} />
            </Box>
        ) : (
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                    }}
                >
                    <Box sx={{ flexGrow: 1, p: 3, ptl: 6, mt: 8 }}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={selectedTab}
                            onChange={handleTabChange}
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab icon={<SpaceDashboardIcon />} label="Dashboard" />
                            <Tab icon={<LocalShippingIcon />} label="Post Job" />
                            <Tab icon={<InventoryIcon />} label="Job Offers" />
                            <Tab icon={<MessageIcon />} label="Messages" />
                            <Tab icon={<Person2Icon />} label="Profile" />
                        </Tabs>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />

                    {renderTabContent()}
                </Box>
            </Box>
        )
    );
};

export default Home;
