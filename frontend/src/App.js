import React, { useState } from 'react';
import FilterSection from './components/FilterSection';
import './App.css';

function App() {
  // Define state variables for each filter section
  const [odaSicilEnabled, setOdaSicilEnabled] = useState(false);
  const [odaSicilFilters, setOdaSicilFilters] = useState([
    { label: "... sekansını içerenler", value: '', enabled: false },
    { label: "... sekansını içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [ticariSicilEnabled, setTicariSicilEnabled] = useState(false);
  const [ticariSicilFilters, setTicariSicilFilters] = useState([
    { label: "... sekansını içerenler", value: '', enabled: false },
    { label: "... sekansını içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [meslekGrubuEnabled, setMeslekGrubuEnabled] = useState(false);
  const [meslekGrubuFilters, setMeslekGrubuFilters] = useState([
    { label: "... sekansını içerenler", value: '', enabled: false },
    { label: "... sekansını içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [ilceAdiEnabled, setIlceAdiEnabled] = useState(false);
  const [ilceAdiFilters, setIlceAdiFilters] = useState([
    { label: "... sekansını içerenler", value: '', enabled: false },
    { label: "... sekansını içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [mahalleAdiEnabled, setMahalleAdiEnabled] = useState(false);
  const [mahalleAdiFilters, setMahalleAdiFilters] = useState([
    { label: "... sekansını içerenler", value: '', enabled: false },
    { label: "... sekansını içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [unvaniEnabled, setUnvaniEnabled] = useState(false);
  const [unvaniFilters, setUnvaniFilters] = useState([
    { label: "... sekansını içerenler", value: '', enabled: false },
    { label: "... sekansını içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [tescilliAdresiEnabled, setTescilliAdresiEnabled] = useState(false);
  const [tescilliAdresiFilters, setTescilliAdresiFilters] = useState([
    { label: "... sekansını içerenler", value: '', enabled: false },
    { label: "... sekansını içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [sirketTuruEnabled, setSirketTuruEnabled] = useState(false);
  const [sirketTuruFilters, setSirketTuruFilters] = useState([
    { label: "Limited", value: '', enabled: false },
    { label: "Anonim", value: '', enabled: false },
  ]);

  const [meslekGrubuNumarasiEnabled, setMeslekGrubuNumarasiEnabled] = useState(false);
  const [meslekGrubuNumarasiFilters, setMeslekGrubuNumarasiFilters] = useState([
    { label: "... numaralı", value: '', enabled: false },
    { label: "... öncesi", value: '', enabled: false },
    { label: "... sonrası", value: '', enabled: false },
    { label: "... aralığındakiler", value: '', enabled: false },
  ]);

  const filters = [
    {
      title: "Oda Sicil No Koşulları",
      toggleEnabled: odaSicilEnabled,
      setToggleEnabled: setOdaSicilEnabled,
      filters: odaSicilFilters.map((filter, index) => ({
        ...filter,
        onChange: (value) => {
          const updatedFilters = [...odaSicilFilters];
          updatedFilters[index].value = value;
          setOdaSicilFilters(updatedFilters);
        },
        setEnabled: (enabled) => {
          const updatedFilters = [...odaSicilFilters];
          updatedFilters[index].enabled = enabled;
          setOdaSicilFilters(updatedFilters);
        },
      })),
    },
    {
      title: "Ticari Sicil No Koşulları",
      toggleEnabled: ticariSicilEnabled,
      setToggleEnabled: setTicariSicilEnabled,
      filters: ticariSicilFilters.map((filter, index) => ({
        ...filter,
        onChange: (value) => {
          const updatedFilters = [...ticariSicilFilters];
          updatedFilters[index].value = value;
          setTicariSicilFilters(updatedFilters);
        },
        setEnabled: (enabled) => {
          const updatedFilters = [...ticariSicilFilters];
          updatedFilters[index].enabled = enabled;
          setTicariSicilFilters(updatedFilters);
        },
      })),
    },
    {
      title: "Meslek Grubu Adı Koşulları",
      toggleEnabled: meslekGrubuEnabled,
      setToggleEnabled: setMeslekGrubuEnabled,
      filters: meslekGrubuFilters.map((filter, index) => ({
        ...filter,
        onChange: (value) => {
          const updatedFilters = [...meslekGrubuFilters];
          updatedFilters[index].value = value;
          setMeslekGrubuFilters(updatedFilters);
        },
        setEnabled: (enabled) => {
          const updatedFilters = [...meslekGrubuFilters];
          updatedFilters[index].enabled = enabled;
          setMeslekGrubuFilters(updatedFilters);
        },
      })),
    },
    {
      title: "İlçe Adı Koşulları",
      toggleEnabled: ilceAdiEnabled,
      setToggleEnabled: setIlceAdiEnabled,
      filters: ilceAdiFilters.map((filter, index) => ({
        ...filter,
        onChange: (value) => {
          const updatedFilters = [...ilceAdiFilters];
          updatedFilters[index].value = value;
          setIlceAdiFilters(updatedFilters);
        },
        setEnabled: (enabled) => {
          const updatedFilters = [...ilceAdiFilters];
          updatedFilters[index].enabled = enabled;
          setIlceAdiFilters(updatedFilters);
        },
      })),
    },
    {
      title: "Mahalle Adı Koşulları",
      toggleEnabled: mahalleAdiEnabled,
      setToggleEnabled: setMahalleAdiEnabled,
      filters: mahalleAdiFilters.map((filter, index) => ({
        ...filter,
        onChange: (value) => {
          const updatedFilters = [...mahalleAdiFilters];
          updatedFilters[index].value = value;
          setMahalleAdiFilters(updatedFilters);
        },
        setEnabled: (enabled) => {
          const updatedFilters = [...mahalleAdiFilters];
          updatedFilters[index].enabled = enabled;
          setMahalleAdiFilters(updatedFilters);
        },      })),
      },
      {
        title: "Ünvanı Koşulları",
        toggleEnabled: unvaniEnabled,
        setToggleEnabled: setUnvaniEnabled,
        filters: unvaniFilters.map((filter, index) => ({
          ...filter,
          onChange: (value) => {
            const updatedFilters = [...unvaniFilters];
            updatedFilters[index].value = value;
            setUnvaniFilters(updatedFilters);
          },
          setEnabled: (enabled) => {
            const updatedFilters = [...unvaniFilters];
            updatedFilters[index].enabled = enabled;
            setUnvaniFilters(updatedFilters);
          },
        })),
      },
      {
        title: "Tescilli Adresi Koşulları",
        toggleEnabled: tescilliAdresiEnabled,
        setToggleEnabled: setTescilliAdresiEnabled,
        filters: tescilliAdresiFilters.map((filter, index) => ({
          ...filter,
          onChange: (value) => {
            const updatedFilters = [...tescilliAdresiFilters];
            updatedFilters[index].value = value;
            setTescilliAdresiFilters(updatedFilters);
          },
          setEnabled: (enabled) => {
            const updatedFilters = [...tescilliAdresiFilters];
            updatedFilters[index].enabled = enabled;
            setTescilliAdresiFilters(updatedFilters);
          },
        })),
      },
      {
        title: "Şirket Türü Koşulları",
        toggleEnabled: sirketTuruEnabled,
        setToggleEnabled: setSirketTuruEnabled,
        filters: sirketTuruFilters.map((filter, index) => ({
          ...filter,
          onChange: (value) => {
            const updatedFilters = [...sirketTuruFilters];
            updatedFilters[index].value = value;
            setSirketTuruFilters(updatedFilters);
          },
          setEnabled: (enabled) => {
            const updatedFilters = [...sirketTuruFilters];
            updatedFilters[index].enabled = enabled;
            setSirketTuruFilters(updatedFilters);
          },
        })),
      },
      {
        title: "Meslek Grubu Numarası Koşulları",
        toggleEnabled: meslekGrubuNumarasiEnabled,
        setToggleEnabled: setMeslekGrubuNumarasiEnabled,
        filters: meslekGrubuNumarasiFilters.map((filter, index) => ({
          ...filter,
          onChange: (value) => {
            const updatedFilters = [...meslekGrubuNumarasiFilters];
            updatedFilters[index].value = value;
            setMeslekGrubuNumarasiFilters(updatedFilters);
          },
          setEnabled: (enabled) => {
            const updatedFilters = [...meslekGrubuNumarasiFilters];
            updatedFilters[index].enabled = enabled;
            setMeslekGrubuNumarasiFilters(updatedFilters);
          },
        })),
      },
    ];
  
    function handleSearch() {
      const queryParams = new URLSearchParams();
  
      filters.forEach((section) => {
          if (section.toggleEnabled) {
              section.filters.forEach((filter, index) => {
                  if (filter.enabled && filter.value) {
                      queryParams.append(`${section.title.replace(/ /g, '_').toLowerCase()}_${index}`, filter.value);
                  }
              });
  
              queryParams.append(`${section.title.replace(/ /g, '_').toLowerCase()}_enabled`, 'true');
          }
      });
  
      fetch(`http://127.0.0.1:5000/search?${queryParams.toString()}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json(); // Parse JSON response
          })
          .then(data => {
              console.log("Search results:", data);
          })
          .catch(error => {
              console.error("Error during search:", error);
          });
  }
    
  
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
          <button onClick={handleSearch}>Search</button>
        </div>
  
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo500.png`} alt="İZTO Logo" className="izto-logo" />
        </div>
      </div>
    );
  }
  
  export default App;
  