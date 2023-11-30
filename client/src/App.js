import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import JobPostingForm from './components/JobPostingForm';
import LoginPage from './components/LoginPage'
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/register";
import {createTheme} from "@mui/material/styles";
import ExamplePage from './components/ExamplePage'; // Example Page can be removed!
import JobManagerPage from './pages/job-manager/JobManagerPage';
import "./reset.css";
import "./App.css"
import InfluencerSearch from './InfluencerSearch';
import { Link } from 'react-router-dom';


const theme = createTheme();

function App() {
    return (
        // Use the Router component to handle different routes in the appdf
        <Router>
            <Routes>
                <Route path="/post-job" element={<JobPostingForm />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/example" element={<ExamplePage />} /> // Example Page can be removed!
                <Route path="/influencer-search" element={<InfluencerSearch />} /> //remove later
                <Route path="/" element={<div><Button label="Log in"/><br/><Button label="ExamplePage"/>
                    <br/><Button label ="InfluencerSearch"/>
                    <br/><Button label = "JobManagerPage"/>
                </div>}/>
                <Route path="/manage-jobs" element={<JobManagerPage />} />

                <Route path="/job/:jobId/influencer-search" element={<InfluencerSearch />} />

                <Route path="/login" element={<LoginPage theme={theme}/>}/>
                <Route path="/devLogin" element={<Button label="Log in"/>}/>
                <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
                <Route path="/forgotpassword" element={<ForgotPassword theme={theme}/>}/>
                <Route path="/resetpassword" element={<ResetPassword theme={theme}/>}/>
                <Route path="/register" element={<SignUp theme={theme}/>}/>

            </Routes>
        </Router>
    );
}

export default App;
