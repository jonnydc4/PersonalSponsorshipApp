import React from 'react';
import CommonFrame from './CommonFrame';

const ExamplePage = () => {
    const items = [
        { name: "Sample Item 1", description: "Description for Item 1", location: "Location 1" },
        { name: "Sample Item 2", description: "Description for Item 2", location: "Location 2" },
        // ... add more sample items as needed
    ];

    return (
        <div>
            <h1>Example Page</h1>
            <CommonFrame items={items}>
                <p>This is additional content passed as children to the CommonFrame.</p>
            </CommonFrame>
        </div>
    );
}

export default ExamplePage;
