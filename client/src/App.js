// // <--------------- App.js - Contains all routes used within react enviroment --------------->
// // App.js is the main file that contains all the routes used within the react enviroment.
// // It is responsible for handling the different routes and rendering the appropriate components.
// // Important Note: Any new pages or components that are created must be added to the routes in order to be used.
// // For further details, see the routes below.
//
// import React from 'react';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Button from './components/Button';
// import Jobs from './components/Jobs';
// import JobPostingForm from './components/JobPostingForm';
// import LoginPage from './pages/LoginPage'
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import SignUpInfluencer from "./pages/SignUpInfluencer";
// import {createTheme} from "@mui/material/styles";
// import ExamplePage from './components/ExamplePage'; // Example Page can be removed!
// import JobOffersPage from "./components/JobOffersPage";
// import JobManagerPage from './pages/job-manager/JobManagerPage';
// import "./reset.css";
// import "./App.css"
// import InfluencerSearch from './InfluencerSearch';
// import LandingPage from "./pages/SignUpLanding";
// import SignUpCompany from "./pages/SignUpCompany";
//
//
// const theme = createTheme();
//
// function App() {
//
//
//     return (
//         // Use the Router component to handle different routes in the app
//         <Router>
//             <Routes>
//                 <Route path="/post-job" element={<JobPostingForm />} />
//                 <Route path="/jobs" element={<Jobs />} />
//                 <Route path="/example" element={<ExamplePage />} /> // Example Page can be removed!
//                 <Route path="/influencer-search" element={<InfluencerSearch />} /> //remove later
//                 <Route path="/job-offers" element={<JobOffersPage />} />
//                 <Route path="/" element={<div><Button label="Log in"/><br/><Button label="ExamplePage"/>
//                     <br/><Button label ="InfluencerSearch"/>
//                     <br/><Button label = "JobManagerPage"/>
//                     <br/><Button label = "JobOffersPage"/>
//                     <br/>
//                 </div>}/>
//                 <Route path="/manage-jobs" element={<JobManagerPage />} />
//
//                 <Route path="/job/:jobId/influencer-search" element={<InfluencerSearch />} />
//
//                 <Route path="/login" element={<LoginPage theme={theme}/>}/>
//                 <Route path="/devLogin" element={<Button label="Log in"/>}/>
//                 <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
//                 <Route path="/forgotpassword" element={<ForgotPassword theme={theme}/>}/>
//                 <Route path="/resetpassword" element={<ResetPassword theme={theme}/>}/>
//                 <Route path="/signup-influencer" element={<SignUpInfluencer theme={theme}/>}/>
//                 <Route path="/signup-company" element={<SignUpCompany theme={theme}/>}/>
//                 <Route path="/signup-landing" element={<LandingPage theme={theme}/>}/>
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;


import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";
import ProfilePage from "./components/profile_page";

import {AuthProvider} from "./contexts/authContext";
import {useRoutes} from "react-router-dom";
import {Box} from "@mui/material";
import LandingPage from "./components/landing_page/LandingPage";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import JobManagerPage from "./pages/job-manager/JobManagerPage";
import JobOffersPage from "./components/JobOffersPage";

function App() {
    const theme = createTheme({
        palette: {
            // Base colors
            background: {
                default: '#f5f5f5', // A light, neutral background
            },
            primary: {
                main: '#8e44ad', // A bold, distinctive purple for accents
            },
            secondary: {
                main: '#34495e', // A deep, rich blue for contrasting elements
            },
            // Additional colors as needed
        },
        typography: {
            // Custom typography for that unique hipster feel
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeightLight: 400,
            fontWeightRegular: 500,
            fontWeightMedium: 600,
            fontWeightBold: 700

            // Add more styles as needed
        },
        // Additional theming options as needed
    });

    const routesArray = [
        {
            path: "*",
            element: <LandingPage/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/home",
            element: <Home/>,
        },
        {
            path: "/profile_page",
            element: <ProfilePage/>,
        },
        {
            path: "/job-manager/components",
            element: <JobManagerPage/>,
        },
        {
            path: "/jobofferspage",
            element: <JobOffersPage/>
        }
    ];

    let routesElement = useRoutes(routesArray);

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Header />
                <Box
                    sx={{
                        width: '100%', // Full width
                        height: '100vh', // Full viewport height
                        display: 'flex', // Use flexbox
                        flexDirection: 'column', // Column direction
                        paddingTop: "150px"
                    }}
                >
                    {routesElement}
                </Box>
            </AuthProvider>
        </ThemeProvider>

    );
}

export default App;
