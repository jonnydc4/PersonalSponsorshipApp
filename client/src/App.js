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

const theme = createTheme();

function App() {
    return (
        // Use the Router component to handle different routes in the app
        <Router>
            <div>
                <div style={{ textAlign: 'center' }}>
                    <Routes>
                        <Route path="/post-job" element={<JobPostingForm />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/example" element={<ExamplePage />} /> // Example Page can be removed!
                        <Route path="/" element={<div><Button label="Log in"/><br/><Button label="ExamplePage"/></div>}/>
                        <Route path = "/view-jobs" element={<JobSearchPage />} />
                    </Routes>
                </div>
                <Routes>
                    <Route path="/login" element={<LoginPage theme={theme}/>}/>
                    <Route path="/devLogin" element={<Button label="Log in"/>}/>
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

// The default code of App
/*
// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import Login from './components/Login';
import JobPostingForm from './components/JobPostingForm';
import CommonFrame from './components/CommonFrame';

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
