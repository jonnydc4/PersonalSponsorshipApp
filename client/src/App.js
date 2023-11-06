// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';
import LoginPage from './components/LoginPage'

function App() {
    return (
        // Use the Router component to handle different routes in the app
        // <div>
        //     <LoginPage/>
        // </div>

        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/post-job" element={<JobPostingForm />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/" element={<Button label="Log in" />} />
                    <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
                    <Route path="/forgotpassword" element={<h1>Forgot Password</h1>}/>
                    <Route path="/register" element={<h1>Register</h1>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
