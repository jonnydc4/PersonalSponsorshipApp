import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import CommonFrame from './components/CommonFrame';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';
import Jobs from './components/Jobs';
import Button from './components/Button';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/allJobs');
                const data = await response.json();
                const formattedItems = data.map(job => ({
                    name: job.title,
                    description: job.description,
                    location: job.location,
                    // ... other job properties you want to display
                }));
                setItems(formattedItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <div style={{ textAlign: 'center' }}>
                <CommonFrame items={items}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/post-job" element={<JobPostingForm />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/" element={<div />} />
                        </Routes>
                        <Link to="/login">
                            <Button label="Companies" />
                        </Link>
                    </CommonFrame>
                </div>
            </Router>
        );
    }

    export default App;

// The default state of the app
/*
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



export default App;

*/


// example that can be inserted into App (The Links do not load anything besides the new page. This will always throw
// a Get error when it loads the page.)
/*
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import CommonFrame from './components/CommonFrame';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';
import Jobs from './components/Jobs';
import Button from './components/Button';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/allJobs');
                const data = await response.json();
                const formattedItems = data.map(job => ({
                    name: job.title,
                    description: job.description,
                    location: job.location,
                    // ... other job properties you want to display
                }));
                setItems(formattedItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <div style={{ textAlign: 'center' }}>
                <CommonFrame items={items}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/post-job" element={<JobPostingForm />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/" element={<div />} />
                        </Routes>
                        <Link to="/login">
                            <Button label="Companies" />
                        </Link>
                    </CommonFrame>
                </div>
            </Router>
        );
    }

    export default App;
 */
