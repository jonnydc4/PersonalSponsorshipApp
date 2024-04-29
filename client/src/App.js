// <--------------- App.js - Contains all routes used within react enviroment --------------->
// App.js is the main file that contains all the routes used within the react enviroment.
// It is responsible for handling the different routes and rendering the appropriate components.
// Important Note: Any new pages or components that are created must be added to the routes in order to be used.
// For further details, see the routes below.

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";
import ProfilePage from "./components/profile_page";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import { Box } from "@mui/material";
import LandingPage from "./components/landing_page/LandingPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JobManagerPage from "./pages/job-manager/JobManagerPage";
import JobOffersPage from "./components/JobOffersPage";
import JobEditForm from "./pages/job-manager/components/EditJobForm"







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
            element: <LandingPage />,
        },
        // {
        //     path: "*",
        //     element: <Home/>,
        // },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "/profile_page",
            element: <ProfilePage />,
        },
        {
            path: "/job-manager/components",
            element: <JobManagerPage />,
        },
        {
            path: "/jobofferspage",
            element: <JobOffersPage />
        },
        {
            path: "/job-manager/components/EditJobForm",
            element: <JobEditForm />
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