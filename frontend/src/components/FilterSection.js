import React from 'react';
import './FilterSection.css';

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
                type="checkbox"
                checked={filter.enabled}
                onChange={(e) => filter.setEnabled(e.target.checked)}
              />
              {title === "Şirket Türü Koşulları" ? (
                filter.label 
              ) : (
                <input
                  type="text"
                  placeholder={filter.label}
                  value={filter.value || ''}
                  onChange={(e) => filter.onChange(e.target.value)}
                  disabled={!filter.enabled}
                />
              )}
            </label>
          </div>
        ))}
    </div>
  );
}

export default FilterSection;
