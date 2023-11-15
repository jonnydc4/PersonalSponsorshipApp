import React, { useEffect, useState } from 'react';
import CommonFrame from './components/CommonFrame';

const InfluencerSearch = () => {
    const [influencers, setInfluencers] = useState([]);
    const [filteredInfluencers, setFilteredInfluencers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);
    const [offerMessage, setOfferMessage] = useState('');


    useEffect(() => {
        const fetchInfluencers = async () => {
            try {
                const response = await fetch('/influencers');
                const data = await response.json();
                setInfluencers(data);
                setFilteredInfluencers(data); // Initialize filtered list
            } catch (error) {
                console.error('Error fetching influencers:', error);
            }
        };

        fetchInfluencers();
    }, []);

    useEffect(() => {
        // Filter influencers based on the search term
        const filtered = influencers.filter(influencer =>
            influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInfluencers(filtered);
    }, [searchTerm, influencers]);

    // This function is called when an influencer is selected in the CommonFrame component
    const handleSelectInfluencer = (influencer) => {
        setSelectedInfluencerId(influencer.id);
    };

    const handleSendOffer = async () => {
        if (selectedInfluencer) {
            const response = await fetch('/sendOffer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    influencer_id: selectedInfluencer.id,
                    job_id: 1, // This should be the ID of the job that we will pass in later
                    message: offerMessage,
                }),
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Offer sent successfully');
                setOfferMessage('');
            } else {
                alert('Failed to send offer');
            }
        } else {
            alert('Please select an influencer first.');
        }
    };

    // Find the selected influencer based on selectedInfluencerId
    const selectedInfluencer = influencers.find(inf => inf.id === selectedInfluencerId);

    // Offer sending UI to be rendered as children of CommonFrame
    const offerSendingUI = selectedInfluencer && (
        <div>
            <h2>Send Offer to {selectedInfluencer.name}</h2>
            <p>Email: {selectedInfluencer.email}</p>
            <textarea
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder="Write your offer message here..."
            />
            <button onClick={handleSendOffer}>Send Offer</button>
        </div>
    );

    // Create the search bar element
    const searchBar = (
        <div style={{ margin: '10px 0' }}>
            <input
                type="text"
                placeholder="Search for an influencer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px' }}
            />
        </div>
    );

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Influencer Search</h1>
            <CommonFrame items={filteredInfluencers} onSelectItem={handleSelectInfluencer} searchBar={searchBar}>
                {offerSendingUI}
            </CommonFrame>
        </>
    );
};

export default InfluencerSearch;
