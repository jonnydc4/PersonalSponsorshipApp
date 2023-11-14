import React from "react";
import './ListDetailFrame.css';

function ListDetailFrame ({ renderList, renderDetail }) {
// Create a container that has a section for list and a section for details
// use the render functions to render list in list section and detail in details section

return (
    <div className="container">
        <div className="list">
          {renderList}
        </div>
        <div className="detail">
          {renderDetail}
        </div>
    </div>
)}

export default ListDetailFrame;