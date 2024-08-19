import React, { useState } from 'react';
import FilterSection from './components/FilterSection';

function App() {
  const [odaSicilEnabled, setOdaSicilEnabled] = useState(false);
  const [ticariSicilEnabled, setTicariSicilEnabled] = useState(false);
  const [meslekGrubuEnabled, setMeslekGrubuEnabled] = useState(false);
  //... other states for the remaining sections

  return (
    <div className="app-container">
      <FilterSection
        title="Oda Sicil No Koşulları"
        toggleEnabled={odaSicilEnabled}
        setToggleEnabled={setOdaSicilEnabled}
      >
        {/* Add specific filters here */}
      </FilterSection>

      <FilterSection
        title="Ticari Sicil No Koşulları"
        toggleEnabled={ticariSicilEnabled}
        setToggleEnabled={setTicariSicilEnabled}
      >
        {/* Add specific filters here */}
      </FilterSection>

      {/* Repeat for all other sections */}

      <div className="search-button-container">
        <button onClick={() => handleSearch()}>Search</button>
      </div>
    </div>
  );
}

function handleSearch() {
  // Implement the logic to collect the filters and make the API request
}

export default App;
