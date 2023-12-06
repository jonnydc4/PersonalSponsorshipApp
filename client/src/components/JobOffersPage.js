import React, { useState, useEffect } from 'react';
import CommonFrame from './CommonFrame';
import JobDetails from './JobDetails';

const JobOffersPage = () => {
    const [jobOffers, setJobOffers] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    const userId = localStorage.getItem('userId')
    console.log(userId)

    // Mock function to fetch job offers (replace with actual API call)
    useEffect(() => {


        fetchJobOffers();
    }, []);

    const fetchJobOffers = async () => {
        try {
            const response = await fetch(`/api/jobOffers/${userId}`); // Update with your actual API endpoint
            const data = await response.json();
            setJobOffers(data);
            const mappedData = data.map(offer => ({
                ...offer,
                name: offer.title // Assuming 'title' is the property you want to display
            }));
            setJobOffers(mappedData);
            return mappedData;
        } catch (error) {
            console.error('Error fetching job offers:', error);
        }
    };

    const handleJobSelection = (jobObject) => {
       // console.log("Selected Job ID: ", jobId);
       // const selected = jobOffers.find(job => job.id === parseInt(jobId, 10));
       // console.log("Found Job: ", selected);
        setSelectedJob(jobObject);
       // markNotificationAsRead(jobId);
    };


    // Mock function to mark notification as read (replace with actual API call)
    const markNotificationAsRead = (jobId) => {
        // Logic to mark the notification as read for the selected job
        // Replace this with your actual API call to mark the notification
    };

    const handleAcceptJob = async () => {
        if (!selectedJob) {
            alert('Please select a job to accept.');
            return;
        }
        console.log("Accepting job: ", selectedJob);
        try {
            const response = await fetch('/api/acceptJob', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ influencerId: 1, jobId: selectedJob.job_id }) // Replace 1 with actual influencerId
            });
            const data = await response.json();
            if (data.message === 'Job accepted successfully') {
                alert(`Accepted job: ${selectedJob.title}`);
            } else {
                alert('Failed to accept job.');
            }
        } catch (error) {
            console.error('Error accepting job:', error);
            alert('Error accepting job.');
        }
    };

    const handleRejectJob = async () => {
        if (!selectedJob) {
            alert('Please select a job to reject.');
            return;
        }
        try {
            const response = await fetch('/api/rejectJobOffer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ offerId: selectedJob.id }) // Assuming job.id is the offer ID
            });
            const data = await response.json();
            if (data.message === 'Job offer rejected successfully') {
                alert(`Rejected job: ${selectedJob.title}`);
                const updatedJobOffers = await fetchJobOffers();

                // Check if the selected job still exists in the updated list
                if (!updatedJobOffers.some(job => job.id === selectedJob.id)) {
                    setSelectedJob(null);
                }
            } else {
                alert('Failed to reject job.');
            }
        } catch (error) {
            console.error('Error rejecting job offer:', error);
            alert('Error rejecting job.');
        }
    };

    // Job action UI (accept/reject buttons)
    const jobActionUI = (
        <div style={{ textAlign: 'center', marginTop: '2px' }}>
            <h2>Selected Job: {selectedJob ? selectedJob.title : 'None'}</h2>
            <button onClick={handleAcceptJob} style={{ marginRight: '10px' }}>Accept Job!</button>
            <button onClick={handleRejectJob}>Reject Job</button>
        </div>
    );

    return (
        <>
            <CommonFrame items={jobOffers} onSelectItem={handleJobSelection} >
                {jobActionUI}
            </CommonFrame>
        </>
    );

};

export default JobOffersPage;