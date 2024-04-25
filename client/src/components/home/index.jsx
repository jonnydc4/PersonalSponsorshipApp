import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Toolbar, Typography, Box, Drawer, Tabs, Tab, Badge, Skeleton } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';
import CustomStepper from "../newUserProcess/CustomStepper";

import DashboardPage from "../JobOffersPage.js";
import PostJobPage from "../../pages/job-manager/JobManagerPage";

import JobOffersPage from "../JobOffersPage.js";
import MessagesPage from "../JobOffersPage.js";
import ProfilePage from "../profile_page/index";
import Messenger from "../messenger/messenger";
import BrandDealTableInfluencer from './BrandDealTableInfluencer.jsx';
import BrandDealTableCompany from './BrandDealTableCompany.jsx';
import InfluencerTrends from './InfluencerTrends.jsx';
import CompanyTrends from './CompanyTrends.jsx'; 
import WelcomeBoard from './WelcomeBoard.jsx';



const Home = () => {
    const { currentUser } = useAuth();
    const [userType, setUserType] = useState('');
    const [userData, setUserData] = useState({});
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const handleRender = async () => {
            try {
                localStorage.setItem("userId", currentUser.uid)
                // console.log("Current User ID", currentUser.uid)
                const response = await fetch(`api/getUserTypeByID?id=${encodeURIComponent(currentUser.uid)}`)
                const data = await response.json()
                setUserType(data.userType)
                setUserData(data.userData)
                localStorage.setItem("userType",  data.userType)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error)
            }
        };
        handleRender();
    }, [currentUser]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    <WelcomeBoard userName={currentUser.displayName || currentUser.email} />
                    {/* Depending on usertype, certain screens will be hidden and shown to user */}
                    {userType === 'influencer' && (
                        <>
                            <InfluencerTrends />
                            <BrandDealTableInfluencer id={currentUser.uId} />
                            {/* <BarChartInfluencer /> */}
                        </>
                    )}
                    {userType === 'company' && (
                        <>
                            <CompanyTrends />
                            <BrandDealTableCompany id={currentUser.uId}/>
                        </>
                    )}


                </Typography>;
            case 1:
                return <PostJobPage />;
            case 2:
                return <JobOffersPage />;
            case 3:
                return <Messenger />;
            case 4:
                return <ProfilePage />;
            default:
                return <Typography variant="h5">Select a tab</Typography>;
        }
    };

    return (
        // If the user type is null, show the stepper to setup the account (new account setup)
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
                    {/* <Toolbar /> */} {/* This is used to add padding to the top - commented out as it gives too much white space*/}

                    {renderTabContent()}
                </Box>
            </Box>
        )
    );
};

export default Home;
