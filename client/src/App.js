// <--------------- App.js - Contains all routes used within react enviroment --------------->
// App.js is the main file that contains all the routes used within the react enviroment.
// It is responsible for handling the different routes and rendering the appropriate components.
// Important Note: Any new pages or components that are created must be added to the routes in order to be used.
// For further details, see the routes below.

// import React from 'react';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Button from './components/Button';
// import Jobs from './components/Jobs';
// import JobPostingForm from './components/JobPostingForm';
// import LoginPage from './pages/LoginPage'
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import SignUpInfluencer from "./pages/SignUpInfluencer";
// import ExamplePage from './components/ExamplePage'; // Example Page can be removed!
// import JobOffersPage from "./components/JobOffersPage";
// import JobManagerPage from './pages/job-manager/JobManagerPage';
// import "./reset.css";
// import "./App.css"
// import InfluencerSearch from './InfluencerSearch';
// import LandingPage from "./pages/SignUpLanding";
// import SignUpCompany from "./pages/SignUpCompany";
// import {createTheme} from "@mui/material/styles";
import Messenger from "./components/messenger";


// const theme = createTheme();

function App() {


    return (
        <Messenger/>
        // Use the Router component to handle different routes in the app

        // <Router>
        //     <Routes>
        //         <Route path="/post-job" element={<JobPostingForm />} />
        //         <Route path="/jobs" element={<Jobs />} />
        //         <Route path="/example" element={<ExamplePage />} /> // Example Page can be removed!
        //         <Route path="/influencer-search" element={<InfluencerSearch />} /> //remove later
        //         <Route path="/job-offers" element={<JobOffersPage />} />
        //         <Route path="/" element={<div><Button label="Log in"/><br/><Button label="ExamplePage"/>
        //             <br/><Button label ="InfluencerSearch"/>
        //             <br/><Button label = "JobManagerPage"/>
        //             <br/><Button label = "JobOffersPage"/>
        //             <br/>
        //         </div>}/>
        //         <Route path="/manage-jobs" element={<JobManagerPage />} />
        //
        //         <Route path="/job/:jobId/influencer-search" element={<InfluencerSearch />} />
        //
        //         <Route path="/login" element={<LoginPage theme={theme}/>}/>
        //         <Route path="/devLogin" element={<Button label="Log in"/>}/>
        //         <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
        //         <Route path="/forgotpassword" element={<ForgotPassword theme={theme}/>}/>
        //         <Route path="/resetpassword" element={<ResetPassword theme={theme}/>}/>
        //         <Route path="/signup-influencer" element={<SignUpInfluencer theme={theme}/>}/>
        //         <Route path="/signup-company" element={<SignUpCompany theme={theme}/>}/>
        //         <Route path="/signup-landing" element={<LandingPage theme={theme}/>}/>
        //     </Routes>
        // </Router>
    );
}

export default App;
