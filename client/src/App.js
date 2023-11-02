// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';
import CommonFrame from './components/CommonForm';

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


// example that can be inserted into App (The Links do not load anything besides the new page. This will always throw
// a Get error when it loads the page.)
/*
const items = [
        { name: 'Login', link: '/login' },
        { name: 'Post Job', link: '/post-job' },
        { name: 'Jobs', link: '/jobs' },
        { name: 'fake'},
        // ... add more items as needed
    ];
    return (
        // Use the Router component to handle different routes in the app
        <Router>
            <div style={{ textAlign: 'center' }}>

                <CommonFrame items={items}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/post-job" element={<JobPostingForm />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/" element={<Button label="Companies" />} />
                    </Routes>
                </CommonFrame>
            </div>
        </Router>
    );
 */

export default App;
