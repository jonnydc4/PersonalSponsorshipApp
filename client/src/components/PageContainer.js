import React from 'react';
import NavBar from "./NavBar";
import './PageContainer.css';

function PageContainer({children}) {
  return (
    <div className="page-container">
      <NavBar />
      {children}
      </div>
  )
}

export default PageContainer