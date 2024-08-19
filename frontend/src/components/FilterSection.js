// src/components/FilterSection.js
import React from 'react';

const FilterSection = ({ title, children, toggleEnabled, setToggleEnabled }) => {
  return (
    <div className="filter-section">
      <div className="filter-header">
        <h3>{title}</h3>
        <label className="switch">
          <input
            type="checkbox"
            checked={toggleEnabled}
            onChange={() => setToggleEnabled(!toggleEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {toggleEnabled && <div className="filter-options">{children}</div>}
    </div>
  );
};

export default FilterSection;
