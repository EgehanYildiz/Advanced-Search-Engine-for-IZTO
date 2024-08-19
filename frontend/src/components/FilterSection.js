import React from 'react';

function FilterSection({ title, toggleEnabled, setToggleEnabled, filters }) {
  return (
    <div className="filter-section">
      <div className="filter-section-container">
        <div className="filter-section-title">{title}</div>
        <div className="filter-section-toggle">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={toggleEnabled}
              onChange={(e) => setToggleEnabled(e.target.checked)}
            />
            Enable
          </label>
        </div>
      </div>
      {toggleEnabled &&
        filters.map((filter, index) => (
          <div className="filter-option" key={index}>
            <label className="checkbox-label">
              <input
                type={filter.type || "checkbox"}
                checked={filter.checked}
                onChange={filter.onChange}
              />
              {filter.label}
            </label>
          </div>
        ))}
    </div>
  );
}

export default FilterSection;
