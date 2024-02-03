import React, { useState } from 'react';
import './CommonFrame.css';
import { Link } from 'react-router-dom'; // Import the Link component at the top of your file

const CommonFrame = ({ items, children, onSelectItem, searchBar }) => {
    // State to keep track of the currently selected item
    const [selectedItem, setSelectedItem] = useState(null);

    // Handle item selection and invoke the callback if provided
    const handleItemClick = (item) => {
        setSelectedItem(item);
        if (onSelectItem) {
            onSelectItem(item);
        }
    };

    return (
        <div className="container">
            {/* Navigation Pane */}
            <div className="navigation-pane">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/jobs">All Jobs</Link>
            </div>

            {/* Content Area */}
            <div className="content-area">
                {/* Selectable List */}
                <div className="selectable-list">
                    {searchBar} {/* This will render the search bar if provided */}
                    {items.map((item, index) => (
                        <div key={index} className="selectable-item" onClick={() => handleItemClick(item)}>
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
