// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from './components/Button';
import Jobs from './components/Jobs';
import JobPostingForm from './components/JobPostingForm'; // Import the JobPostingForm component

function App() {
    const [showJobs, setShowJobs] = useState(false);

    const handleButtonClick = () => {
        setShowJobs(true);
    };

    return (
        <Router>
            <div style={{ textAlign: 'center' }}>
                <Routes> {}
                    <Route path="/post-job" element={<JobPostingForm />} />
                    <Route path="/" element={
                        !showJobs ? (
                            <Button label="Companies" onClick={handleButtonClick} />
                        ) : (
                            <Jobs />
                        )
                    } />
                </Routes> {}
            </div>
        </Router>
    );
}

export default App;
