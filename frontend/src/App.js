import React, { useState } from 'react';
import FilterSection from './components/FilterSection';
import './App.css';

function App() {
  // Define state variables for each filter section
  const [odaSicilEnabled, setOdaSicilEnabled] = useState(false);
  const [ticariSicilEnabled, setTicariSicilEnabled] = useState(false);
  const [meslekGrubuEnabled, setMeslekGrubuEnabled] = useState(false);
  const [ilceAdiEnabled, setIlceAdiEnabled] = useState(false);
  const [mahalleAdiEnabled, setMahalleAdiEnabled] = useState(false);
  const [unvaniEnabled, setUnvaniEnabled] = useState(false);
  const [tescilliAdresiEnabled, setTescilliAdresiEnabled] = useState(false);
  const [sirketTuruEnabled, setSirketTuruEnabled] = useState(false);
  const [meslekGrubuNumarasiEnabled, setMeslekGrubuNumarasiEnabled] = useState(false);

  // Define an array of filter configurations
  const filters = [
    {
      title: "Oda Sicil No Koşulları",
      toggleEnabled: odaSicilEnabled,
      setToggleEnabled: setOdaSicilEnabled,
      filters: [
        { label: "... sekansını içerenler", checked: false, onChange: () => {} },
        { label: "... sekansını içermeyenler", checked: false, onChange: () => {} },
        { label: "... ile başlayanlar", checked: false, onChange: () => {} },
        { label: "... ile bitenler", checked: false, onChange: () => {} },
        { label: "... ile tam eşleşen", checked: false, onChange: () => {} },
        { label: "... uzunluğunda olanlar", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "Ticari Sicil No Koşulları",
      toggleEnabled: ticariSicilEnabled,
      setToggleEnabled: setTicariSicilEnabled,
      filters: [
        { label: "... sekansını içerenler", checked: false, onChange: () => {} },
        { label: "... sekansını içermeyenler", checked: false, onChange: () => {} },
        { label: "... ile başlayanlar", checked: false, onChange: () => {} },
        { label: "... ile bitenler", checked: false, onChange: () => {} },
        { label: "... ile tam eşleşen", checked: false, onChange: () => {} },
        { label: "... uzunluğunda olanlar", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "Meslek Grubu Adı Koşulları",
      toggleEnabled: meslekGrubuEnabled,
      setToggleEnabled: setMeslekGrubuEnabled,
      filters: [
        { label: "... sekansını içerenler", checked: false, onChange: () => {} },
        { label: "... sekansını içermeyenler", checked: false, onChange: () => {} },
        { label: "... ile başlayanlar", checked: false, onChange: () => {} },
        { label: "... ile bitenler", checked: false, onChange: () => {} },
        { label: "... ile tam eşleşen", checked: false, onChange: () => {} },
        { label: "... uzunluğunda olanlar", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "İlçe Adı Koşulları",
      toggleEnabled: ilceAdiEnabled,
      setToggleEnabled: setIlceAdiEnabled,
      filters: [
        { label: "... sekansını içerenler", checked: false, onChange: () => {} },
        { label: "... sekansını içermeyenler", checked: false, onChange: () => {} },
        { label: "... ile başlayanlar", checked: false, onChange: () => {} },
        { label: "... ile bitenler", checked: false, onChange: () => {} },
        { label: "... ile tam eşleşen", checked: false, onChange: () => {} },
        { label: "... uzunluğunda olanlar", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "Mahalle Adı Koşulları",
      toggleEnabled: mahalleAdiEnabled,
      setToggleEnabled: setMahalleAdiEnabled,
      filters: [
        { label: "... sekansını içerenler", checked: false, onChange: () => {} },
        { label: "... sekansını içermeyenler", checked: false, onChange: () => {} },
        { label: "... ile başlayanlar", checked: false, onChange: () => {} },
        { label: "... ile bitenler", checked: false, onChange: () => {} },
        { label: "... ile tam eşleşen", checked: false, onChange: () => {} },
        { label: "... uzunluğunda olanlar", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "Ünvanı Koşulları",
      toggleEnabled: unvaniEnabled,
      setToggleEnabled: setUnvaniEnabled,
      filters: [
        { label: "... sekansını içerenler", checked: false, onChange: () => {} },
        { label: "... sekansını içermeyenler", checked: false, onChange: () => {} },
        { label: "... ile başlayanlar", checked: false, onChange: () => {} },
        { label: "... ile bitenler", checked: false, onChange: () => {} },
        { label: "... ile tam eşleşen", checked: false, onChange: () => {} },
        { label: "... uzunluğunda olanlar", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "Tescilli Adresi Koşulları",
      toggleEnabled: tescilliAdresiEnabled,
      setToggleEnabled: setTescilliAdresiEnabled,
      filters: [
        { label: "... sekansını içerenler", checked: false, onChange: () => {} },
        { label: "... sekansını içermeyenler", checked: false, onChange: () => {} },
        { label: "... ile başlayanlar", checked: false, onChange: () => {} },
        { label: "... ile bitenler", checked: false, onChange: () => {} },
        { label: "... ile tam eşleşen", checked: false, onChange: () => {} },
        { label: "... uzunluğunda olanlar", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "Şirket Türü Koşulları",
      toggleEnabled: sirketTuruEnabled,
      setToggleEnabled: setSirketTuruEnabled,
      filters: [
        { label: "Limited", checked: false, onChange: () => {} },
        { label: "Anonim", checked: false, onChange: () => {} },
      ],
    },
    {
      title: "Meslek Grubu Numarası Koşulları",
      toggleEnabled: meslekGrubuNumarasiEnabled,
      setToggleEnabled: setMeslekGrubuNumarasiEnabled,
      filters: [
        { label: "... numaralı", checked: false, onChange: () => {} },
        { label: "... öncesi", checked: false, onChange: () => {} },
        { label: "... sonrası", checked: false, onChange: () => {} },
        { label: "... aralığındakiler", checked: false, onChange: () => {} },
      ],
    },
  ];

  return (
    <div className="app-container">
      <h1 className="main-title">Advanced Search Engine for İZTO</h1>
      <div className="grid-container">
        {filters.map((section, index) => (
          <FilterSection
            key={index}
            title={section.title}
            toggleEnabled={section.toggleEnabled}
            setToggleEnabled={section.setToggleEnabled}
            filters={section.filters}
          />
        ))}
      </div>

      <div className="search-button-container">
        <button onClick={() => handleSearch()}>Search</button>
      </div>

      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/logo500.png`} alt="İZTO Logo" className="izto-logo" />
      </div>

    </div>
  );
}

function handleSearch() {
  // Implement the logic to collect the filters and make the API request
}

export default App;
