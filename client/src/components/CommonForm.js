// src/components/CommonFrame.js
import React from 'react';

const CommonFrame = ({ items, children }) => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Selectable List */}
            <div style={{ flex: 1, borderRight: '1px solid black', overflowY: 'auto' }}>
                {items.map((item, index) => (
                    <div key={index}>
                        {item.link ? (
                            <a href={item.link}>
                                {item.name}
                            </a>
                        ) : (
                            item.name
                        )}
                    </div>
                ))}
            </div>

            {/* Main Area */}
            <div style={{ flex: 2, padding: '20px' }}>
                {children}
            </div>
        </div>
    );
};

export default CommonFrame;
