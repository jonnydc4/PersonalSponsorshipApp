// client/src/App.js
import React, { useState } from 'react';
import Button from './components/Button';
import Jobs from './components/Jobs';

function App() {
    const [showJobs, setShowJobs] = useState(false);

    const handleButtonClick = () => {
        setShowJobs(true);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {!showJobs ? (
                <Button label="Companies" onClick={handleButtonClick} />
            ) : (
                <Jobs />
            )}
        </div>
    );
}

export default App;
