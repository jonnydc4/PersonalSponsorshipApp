// client/src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';
import LoginPage from './components/LoginPage'
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/register";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

function App() {
    return (
        // Use the Router component to handle different routes in the app
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage theme={theme}/>}/>
                    <Route path="/post-job" element={<JobPostingForm/>}/>
                    <Route path="/jobs" element={<Jobs/>}/>
                    <Route path="/" element={<Button label="Log in"/>}/>
                    <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
                    <Route path="/forgotpassword" element={<ForgotPassword theme={theme}/>}/>
                    <Route path="/resetpassword" element={<ResetPassword theme={theme}/>}/>
                    <Route path="/register" element={<SignUp theme={theme}/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
