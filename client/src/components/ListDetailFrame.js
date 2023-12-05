// ListDetailFrame.js
// A layout component that divides the screen into two sections: one for listing items (such as jobs)
// and another for displaying details of the selected item.

import React from "react";
import './ListDetailFrame.css';

/**
 * Renders a two-pane layout with a list section and a detail section.
 * @param {React.ReactNode} renderList - The component or content to be rendered in the list section.
 * @param {React.ReactNode} renderDetail - The component or content to be rendered in the detail section.
 */
function ListDetailFrame({ renderList, renderDetail }) {
    return (
        // Container for the two sections of the layout.
        <div className="list-detail-container">
            {/* The list section where the renderList content will be displayed */}
            <div className="list">
                {renderList}
            </div>
            {/* The detail section for displaying detailed information about a selected item */}
            <div className="detail">
                {renderDetail}
            </div>
        </div>
    );
}

// Export the ListDetailFrame component for use in other parts of the application.
export default ListDetailFrame;
