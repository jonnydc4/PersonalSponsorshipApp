import React from 'react';
import CommonFrame from './CommonFrame';

const ExamplePage = () => {
    const items = [
        { name: "Sample Item 1", description: "Description for Item 1", location: "Location 1" },
        { name: "Sample Item 2", description: "Description for Item 2", location: "Location 2" },
        { name: "Sample Item 3", description: "Description for Item 3", location: "Location 3" },
        { name: "Sample Item 4", description: "Description for Item 4", location: "Location 4" },
        { name: "Sample Item 5", description: "Description for Item 5", location: "Location 5" },
        { name: "Sample Item 6", description: "Description for Item 6", location: "Location 6" },
        { name: "Sample Item 7", description: "Description for Item 7", location: "Location 7" },
        { name: "Sample Item 8", description: "Description for Item 8", location: "Location 8" },
        { name: "Sample Item 9", description: "Description for Item 9", location: "Location 9" },
        { name: "Sample Item 10", description: "Description for Item 10", location: "Location 10" },
        { name: "Sample Item 11", description: "Description for Item 11", location: "Location 11" },
        { name: "Sample Item 12", description: "Description for Item 12", location: "Location 12" },
        { name: "Sample Item 13", description: "Description for Item 13", location: "Location 13" },
        { name: "Sample Item 14", description: "Description for Item 14", location: "Location 14" },
        { name: "Sample Item 15", description: "Description for Item 15", location: "Location 15" },
        { name: "Sample Item 16", description: "Description for Item 16", location: "Location 16" },
        { name: "Sample Item 17", description: "Description for Item 17", location: "Location 17" },
        { name: "Sample Item 18", description: "Description for Item 18", location: "Location 18" },
        { name: "Sample Item 19", description: "Description for Item 19", location: "Location 19" },
        { name: "Sample Item 20", description: "Description for Item 20", location: "Location 20" },
        { name: "Sample Item 21", description: "Description for Item 21", location: "Location 21" },
        { name: "Sample Item 22", description: "Description for Item 22", location: "Location 22" },
        { name: "Sample Item 23", description: "Description for Item 23", location: "Location 23" },
        { name: "Sample Item 24", description: "Description for Item 24", location: "Location 24" },
        { name: "Sample Item 25", description: "Description for Item 25", location: "Location 25" },
        { name: "Sample Item 26", description: "Description for Item 26", location: "Location 26" },
        { name: "Sample Item 27", description: "Description for Item 27", location: "Location 27" },
        { name: "Sample Item 28", description: "Description for Item 28", location: "Location 28" },
        { name: "Sample Item 29", description: "Description for Item 29", location: "Location 29" },
        { name: "Sample Item 30", description: "Description for Item 30", location: "Location 30" },
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
