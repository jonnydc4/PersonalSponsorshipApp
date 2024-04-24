import React, { useState, useEffect } from 'react';
import CommonFrame from './CommonFrame';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const JobOffersPage = () => {
    const [jobOffers, setJobOffers] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobAccepted, setJobAccepted] = useState(false);

    const userId = localStorage.getItem('userId')
    console.log(userId)

    // Mock function to fetch job offers (replace with actual API call)
    useEffect(() => {
       // console.log("Fetching job offers");
        //console.log("current users id: ", userId);
        fetchJobOffers();
    }, []);

    const fetchJobOffers = async () => {
        try {
            const response = await fetch(`/api/jobOffers/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data fetched:", data);  // This will log the fetched data

            const mappedData = data.map(offer => ({
                ...offer,
                name: offer.title  // Adjust based on actual data structure if needed
            }));

            console.log("Mapped data:", mappedData);  // This will log the processed data
            setJobOffers(mappedData);
        } catch (error) {
            console.error('Error fetching job offers:', error);
        }
    };

    const handleJobSelection = (jobObject) => {
       // console.log("Selected Job ID: ", jobId);
       // const selected = jobOffers.find(job => job.id === parseInt(jobId, 10));
       // console.log("Found Job: ", selected);
        setSelectedJob(jobObject);
        const isAccepted = localStorage.getItem(`jobAccepted_${jobObject.job_id}`) === 'true';
        setJobAccepted(isAccepted);
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

        console.log(userId)
        try {
            const response = await fetch('/api/acceptJob', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ influencerId: userId, jobId: selectedJob.job_id })
            });
            const data = await response.json();
            if (data.message === 'Job accepted successfully') {
                alert(`Accepted job: ${selectedJob.title}`);
                localStorage.setItem(`jobAccepted_${selectedJob.job_id}`, 'true');
                setJobAccepted(true);
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
    const jobActionUI = jobAccepted ? (
        <Typography variant="h5" textAlign="center" marginTop={2}>
            You have accepted this job
        </Typography>
    ) : (
        <Container maxWidth="sm" sx={{ marginTop: 2 }}>
            <Typography variant="h6" textAlign="center">
                Selected Job: {selectedJob ? selectedJob.title : 'None'}
            </Typography>
            <Card variant="outlined" sx={{ marginTop: 2 }}>
                <CardContent>
                    <Typography variant="body1">
                        {selectedJob ? selectedJob.description : 'Please select a job to see details.'}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleAcceptJob} sx={{ marginRight: '10px' }}>
                        Accept Job!
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleRejectJob}>
                        Reject Job
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );

    return (
        <Container maxWidth={false}>
            <CommonFrame items={jobOffers} onSelectItem={handleJobSelection}>
                {jobActionUI}
            </CommonFrame>
        </Container>
    );

};

export default JobOffersPage;