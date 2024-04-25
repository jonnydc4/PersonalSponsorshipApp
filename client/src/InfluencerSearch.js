import React, { useEffect, useState } from 'react';
import CommonFrame from './components/CommonFrame';

const InfluencerSearch = ({ jobId }) => {
    const [influencers, setInfluencers] = useState([]);
    const [filteredInfluencers, setFilteredInfluencers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);
    const [offerMessage, setOfferMessage] = useState('');
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchInfluencers = async () => {
            try {
                const response = await fetch('/api/influencers/');
                const data = await response.json();
                const formattedData = data.map(influencer => ({
                    ...influencer,
                    name: `${influencer.firstName} ${influencer.lastName}` // Ensure this 'name' property exists
                }));
                setInfluencers(formattedData);
                setFilteredInfluencers(formattedData);
            } catch (error) {
                console.error('Error fetching influencers:', error);
            }
        };

        fetchInfluencers();
    }, []);

    useEffect(() => {
        const filtered = influencers.filter(influencer =>
            influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInfluencers(filtered);
    }, [searchTerm, influencers]);

    const handleSelectInfluencer = (influencer) => {
        setSelectedInfluencerId(influencer.id);
    };

    const handleSendOffer = async () => {
        if (selectedInfluencerId) {
            const response = await fetch('/api/sendOffer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    influencer_id: selectedInfluencerId,
                    job_id: jobId,
                    message: offerMessage,
                    company_id: userId,
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
                {selectedInfluencerId && (
                    <div>
                        <h2>Send Offer to {influencers.find(inf => inf.id === selectedInfluencerId).name}</h2>
                        <p>Email: {influencers.find(inf => inf.id === selectedInfluencerId).email}</p>
                        <textarea
                            value={offerMessage}
                            onChange={(e) => setOfferMessage(e.target.value)}
                            placeholder="Write your offer message here..."
                        />
                        <button onClick={handleSendOffer}>Send Offer</button>
                    </div>
                )}
            </CommonFrame>
        </>
    );
};

export default InfluencerSearch;
