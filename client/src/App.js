import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
                        <Route path="/" element={<Button label="Companies" />} />
                    </Routes>
                </CommonFrame>
            </div>
        </Router>
    );
}

export default App;

// example that can be inserted into App (The Links do not load anything besides the new page. This will always throw
// a Get error when it loads the page.)
/*
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CommonFrame from './components/CommonFrame';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';
import Jobs from './components/Jobs';
import Button from './components/Button';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch data from /allJobs
        fetch('/allJobs')
            .then(response => response.json())
            .then(data => {
                // Convert the fetched data to the desired items structure
                const formattedItems = data.map(job => ({
                    name: job.job_name, // Assuming the job has a property called 'job_name'
                    link: `/jobs/${job.id}` // Assuming each job has a unique 'id'
                }));
                setItems(formattedItems);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []); // The empty dependency array ensures this useEffect runs once when the component mounts

    return (
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
}

export default App;
 */
