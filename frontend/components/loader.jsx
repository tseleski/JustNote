import React from 'react';

const loader = ({ page }) => (
  <div className={`loading-container ${page}`}>
    <div className="loader">Loading...</div>
  </div>
)

export default loader;