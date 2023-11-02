// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';

function App() {
    return (
        // Use the Router component to handle different routes in the app
        <Router>
            <div style={{ textAlign: 'center' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/post-job" element={<JobPostingForm />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/" element={<Button label="Companies" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
