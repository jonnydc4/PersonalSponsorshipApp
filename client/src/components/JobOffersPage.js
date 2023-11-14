import React, { useState, useEffect } from 'react';
import CommonFrame from './CommonFrame';
import JobDetails from './JobDetails';

const JobOffersPage = () => {
    const [jobOffers, setJobOffers] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    // Mock function to fetch job offers (replace with actual API call)
    useEffect(() => {
        // Fetch job offers from the backend
        const fetchJobOffers = async () => {
            // Replace this with your actual fetching logic
            const fetchedJobs = [
                { id: 1, title: "Software Developer", description: "Job description here..." },
                // ... more jobs
            ];
            setJobOffers(fetchedJobs);
        };

        fetchJobOffers();
    }, []);

    const handleJobSelection = (job) => {
        setSelectedJob(job);
        markNotificationAsRead(job.id);
    };

    // Mock function to mark notification as read (replace with actual API call)
    const markNotificationAsRead = (jobId) => {
        // Logic to mark the notification as read for the selected job
        // Replace this with your actual API call to mark the notification
    };

    const handleAcceptJob = (job) => {
        // Logic to accept the job
        // Replace this with your actual API call to accept the job
        console.log(`Accepted job: ${job.title}`);
    };

    const handleRejectJob = (job) => {
        // Logic to reject the job
        // Replace this with your actual API call to reject the job
        console.log(`Rejected job: ${job.title}`);
    };

    return (
        <CommonFrame items={jobOffers}>
            <JobDetails
                job={selectedJob}
                onAccept={handleAcceptJob}
                onReject={handleRejectJob}
            />
        </CommonFrame>
    );
};

export default JobOffersPage;
