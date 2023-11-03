import React, { useState } from 'react';

const CommonFrame = ({ items, children }) => {
    // State to keep track of the currently selected item
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

            {/* Navigation Pane */}
            <div style={{ padding: '10px', borderBottom: '1px solid black' }}>
                Navigation Pane Content Here
            </div>

            {/* Content Area */}
            <div style={{ display: 'flex', flex: 1 }}>
                {/* Selectable List */}
                <div style={{ flex: 1, borderRight: '1px solid black', overflowY: 'auto' }}>
                    {items.map((item, index) => (
                        <div key={index} onClick={() => setSelectedItem(item)}>
                            {item.name}
                        </div>
                    ))}
                </div>

                {/* Main Area */}
                <div style={{ flex: 2, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    {/* Payload Area */}
                    <div style={{ flex: 1, padding: '10px', border: '1px solid black', marginBottom: '10px' }}>
                        {selectedItem ? (
                            <div>
                                <h2>{selectedItem.name}</h2>
                                {Object.entries(selectedItem).map(([key, value]) => {
                                    // Exclude the 'id' property
                                    if (key !== 'id') {
                                        return (
                                            <div key={key}>
                                                <strong>{key}:</strong> {value}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ) : (
                            <p>Select an item from the list to view its details.</p>
                        )}
                    </div>

                    {/* Additional Content Area */}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonFrame;
