import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import JobPostingForm from './components/JobPostingForm';
import LoginPage from './pages/LoginPage'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignUpInfluencer from "./pages/SignUpInfluencer";
import {createTheme} from "@mui/material/styles";
import ExamplePage from './components/ExamplePage'; // Example Page can be removed!
import JobOffersPage from "./components/JobOffersPage";
import JobManagerPage from './pages/job-manager/JobManagerPage';
import "./reset.css";
import "./App.css"
import InfluencerSearch from './InfluencerSearch';
import LandingPage from "./pages/SignUpLanding";
import SignUpCompany from "./pages/SignUpCompany";
import EditJobForm from './pages/job-manager/components/EditJobForm';




const theme = createTheme();

function App() {


    return (
        // Use the Router component to handle different routes in the app
        <Router>
            <Routes>
                <Route path="/post-job" element={<JobPostingForm />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/example" element={<ExamplePage />} /> // Example Page can be removed!
                <Route path="/influencer-search" element={<InfluencerSearch />} /> //remove later
                <Route path="/job-offers" element={<JobOffersPage />} />
                <Route path="/" element={<div><Button label="Log in"/><br/><Button label="ExamplePage"/>
                    <br/><Button label ="InfluencerSearch"/>
                    <br/><Button label = "JobManagerPage"/>
                    <br/><Button label = "JobOffersPage"/>
                    <br/>
                </div>}/>
                <Route path="/manage-jobs" element={<JobManagerPage />} />

                <Route path="/job/:jobId/influencer-search" element={<InfluencerSearch />} />
                <Route path="/job/:jobId/edit" element={<EditJobForm />} />

                <Route path="/login" element={<LoginPage theme={theme}/>}/>
                <Route path="/devLogin" element={<Button label="Log in"/>}/>
                <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
                <Route path="/forgotpassword" element={<ForgotPassword theme={theme}/>}/>
                <Route path="/resetpassword" element={<ResetPassword theme={theme}/>}/>
                <Route path="/signup-influencer" element={<SignUpInfluencer theme={theme}/>}/>
                <Route path="/signup-company" element={<SignUpCompany theme={theme}/>}/>
                <Route path="/signup-landing" element={<LandingPage theme={theme}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
