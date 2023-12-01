// client/src/components/Jobs.js
import React, { useEffect, useState } from 'react';
import PostJobButton from './PostJobButton';

const Jobs = () => {
    // Create a state variable 'jobs' to store the list of jobs and its setter function 'setJobs'
    const [jobs, setJobs] = useState([]);

    // Use the 'useEffect' hook to execute code after the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/allJobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <PostJobButton />
            {jobs.map(job => (
                <div key={job.id} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2>{job.title}</h2>
                    <p>{job.description}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                </div>
            ))}
        </div>
    );
};

export default Jobs;
