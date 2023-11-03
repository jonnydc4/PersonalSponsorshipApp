import React, { useState } from 'react';
import './CommonFrame.css';

const CommonFrame = ({ items, children }) => {
    // State to keep track of the currently selected item
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="container">
            {/* Navigation Pane */}
            <div className="navigation-pane">
                Navigation Pane Content Here
            </div>

            {/* Content Area */}
            <div className="content-area">
                {/* Selectable List */}
                <div className="selectable-list">
                    {items.map((item, index) => (
                        <div key={index} className="selectable-item" onClick={() => setSelectedItem(item)}>
                            {item.name}
                        </div>
                    ))}
                </div>

                {/* Main Area */}
                <div className="main-area">
                    {/* Payload Area */}
                    <div className="payload-area">
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
                    <div className="additional-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonFrame;
