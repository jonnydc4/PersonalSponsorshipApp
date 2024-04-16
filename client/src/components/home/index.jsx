import React, {useEffect, useState} from 'react';
import {useAuth} from '../../contexts/authContext';
import {Toolbar, Typography, Button, Box, Drawer} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Person2Icon from '@mui/icons-material/Person2';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';
import CustomStepper from "../newUserProcess/CustomStepper";

const Home = () => {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const [userType, setUserType] = useState('')
    const [userData, setUserData] = useState({})


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
        }
        handleRender()
    }, [currentUser]);

    return (
        userType === null ? (
            <>
                <Box sx={{
                    alignItems: 'center', // Center children horizontally in the container
                    justifyContent: 'center', // Center children vertically in the container
                    minHeight: '100vh', // Full viewport height, remove if not needed
                }}>
                    <Typography variant="h3" fontWeight="fontWeightLight" textAlign="center">
                        Let's setup your account.
                    </Typography>
                    <Box sx={{
                        boxShadow: 'xl',
                    }}>
                        <CustomStepper setUserType={setUserType}/>
                    </Box>
                </Box>
            </>
        ) : (
            // Box is layed to the left side of the screen
            <Box sx={{display: 'flex'}}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {width: 240, boxSizing: 'border-box'},
                    }}
                >
                    <Box
                        // Used to add padding to the drawer and stop content from touching header.
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            pt: 6,
                            // Use marginTop or paddingTop to ensure content is visible below AppBar
                            // Adjust the value according to your AppBar's height
                            mt: 8,
                        }}
                    >
                        <Button
                            startIcon={<SpaceDashboardIcon/>}
                            onClick={() => navigate('/home')}
                            sx={{
                                pl: 3,
                                pb: 2,
                                display: 'flex',
                                flexDirection: 'row', // Explicitly set the flex direction
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                textAlign: 'left',
                                width: '100%' // Ensure the button takes the full width for alignment
                            }}
                        >
                            Dashboard
                        </Button>

                        <Button startIcon={<LocalShippingIcon/>} component={RouterLink} to="/job-manager/components"
                                sx={{
                                    pl: 3,
                                    pb: 2,
                                    display: 'flex',
                                    flexDirection: 'row', // Explicitly set the flex direction
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textAlign: 'left',
                                    width: '100%' // Ensure the button takes the full width for alignment
                                }}>
                            Post Job
                        </Button>
                        <Button startIcon={<InventoryIcon/>} component={RouterLink} to="/job-manager/components" sx={{
                            pl: 3,
                            pb: 2,
                            display: 'flex',
                            flexDirection: 'row', // Explicitly set the flex direction
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            textAlign: 'left',
                            width: '100%' // Ensure the button takes the full width for alignment
                        }}>
                            Job Listings
                        </Button>
                        <Button startIcon={<InventoryIcon/>} component={RouterLink} to="/jobofferspage" sx={{
                            pl: 3,
                            pb: 2,
                            display: 'flex',
                            flexDirection: 'row', // Explicitly set the flex direction
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            textAlign: 'left',
                            width: '100%' // Ensure the button takes the full width for alignment
                        }}>
                            Job Offers
                        </Button>
                        <Button startIcon={<MessageIcon/>} component={RouterLink} to="/messages" sx={{
                            pl: 3,
                            pb: 2,
                            display: 'flex',
                            flexDirection: 'row', // Explicitly set the flex direction
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            textAlign: 'left',
                            width: '100%' // Ensure the button takes the full width for alignment
                        }}>
                            Messages
                        </Button>
                        <Button startIcon={<Person2Icon/>} color="primary" onClick={() => navigate('/profile_page')}
                                sx={{
                                    pl: 3,
                                    pb: 2,
                                    display: 'flex',
                                    flexDirection: 'row', // Explicitly set the flex direction
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textAlign: 'left',
                                    width: '100%' // Ensure the button takes the full width for alignment
                                }}>
                            Profile
                        </Button>
                    </Box>
                </Drawer>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                        Welcome, {currentUser.displayName || currentUser.email}
                    </Typography>
                    {/* Rest of page content goes here */}
                </Box>
            </Box>
        )
    );
};

export default Home;
