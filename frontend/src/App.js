import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import FilterSection from './components/FilterSection';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

const filterMap = {
  "oda_sicil_no": ["contains", "not_contains", "start", "end", "exact", "length"],
  "ticari_sicil_no": ["contains", "not_contains", "start", "end", "exact", "length"],
  "meslek_grubu_adi": ["contains", "not_contains", "start", "end", "exact", "length"],
  "ilce_adi": ["contains", "not_contains", "start", "end", "exact", "length"],
  "mahalle_adi": ["contains", "not_contains", "start", "end", "exact", "length"],
  "unvani": ["contains", "not_contains", "start", "end", "exact", "length"],
  "tescilli_adresi": ["contains", "not_contains", "start", "end", "exact", "length"],
  "sirket_turu": ["limited", "anonim"],
  "meslek_grubu_numarasi": ["equals", "before", "after", "between"]
};

function App() {
  const [odaSicilEnabled, setOdaSicilEnabled] = useState(false);
  const [odaSicilFilters, setOdaSicilFilters] = useState([
    { label: "... kelime grubunu içerenler", value: '', enabled: false },
    { label: "... kelime grubunu içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... harf uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [ticariSicilEnabled, setTicariSicilEnabled] = useState(false);
  const [ticariSicilFilters, setTicariSicilFilters] = useState([
    { label: "... kelime grubunu içerenler", value: '', enabled: false },
    { label: "... kelime grubunu içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... harf uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [meslekGrubuEnabled, setMeslekGrubuEnabled] = useState(false);
  const [meslekGrubuFilters, setMeslekGrubuFilters] = useState([
    { label: "... kelime grubunu içerenler", value: '', enabled: false },
    { label: "... kelime grubunu içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... harf uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [ilceAdiEnabled, setIlceAdiEnabled] = useState(false);
  const [ilceAdiFilters, setIlceAdiFilters] = useState([
    { label: "... kelime grubunu içerenler", value: '', enabled: false },
    { label: "... kelime grubunu içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... harf uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [mahalleAdiEnabled, setMahalleAdiEnabled] = useState(false);
  const [mahalleAdiFilters, setMahalleAdiFilters] = useState([
    { label: "... kelime grubunu içerenler", value: '', enabled: false },
    { label: "... kelime grubunu içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... harf uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [unvaniEnabled, setUnvaniEnabled] = useState(false);
  const [unvaniFilters, setUnvaniFilters] = useState([
    { label: "... kelime grubunu içerenler", value: '', enabled: false },
    { label: "... kelime grubunu içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... harf uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [tescilliAdresiEnabled, setTescilliAdresiEnabled] = useState(false);
  const [tescilliAdresiFilters, setTescilliAdresiFilters] = useState([
    { label: "... kelime grubunu içerenler", value: '', enabled: false },
    { label: "... kelime grubunu içermeyenler", value: '', enabled: false },
    { label: "... ile başlayanlar", value: '', enabled: false },
    { label: "... ile bitenler", value: '', enabled: false },
    { label: "... ile tam eşleşen", value: '', enabled: false },
    { label: "... harf uzunluğunda olanlar", value: '', enabled: false },
  ]);

  const [sirketTuruEnabled, setSirketTuruEnabled] = useState(false);
  const [sirketTuruFilters, setSirketTuruFilters] = useState([
    { label: "Limited", enabled: false },
    { label: "Anonim", enabled: false },
  ]);

  const [meslekGrubuNumarasiEnabled, setMeslekGrubuNumarasiEnabled] = useState(false);
  const [meslekGrubuNumarasiFilters, setMeslekGrubuNumarasiFilters] = useState([
    { label: "... numaralı", value: '', enabled: false },
    { label: "... sayısının öncesi", value: '', enabled: false },
    { label: "... sayısının sonrası", value: '', enabled: false },
    { label: "... sayıları aralığındakiler (örn: 30-50)", value: '', enabled: false },
  ]);

  const [results, setResults] = useState([]);

  const filters = [
    {
      title: "Oda Sicil No Koşulları",
      param: "oda_sicil_no",
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
      param: "ticari_sicil_no",
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
      param: "meslek_grubu_adi",
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
      param: "ilce_adi",
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
      param: "mahalle_adi",
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
        param: "unvani",
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
        param: "tescilli_adresi",
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
        param: "sirket_turu",
        toggleEnabled: sirketTuruEnabled,
        setToggleEnabled: setSirketTuruEnabled,
        filters: sirketTuruFilters.map((filter, index) => ({
          ...filter,
          setEnabled: (enabled) => {
            const updatedFilters = [...sirketTuruFilters];
            updatedFilters[index].enabled = enabled;
            setSirketTuruFilters(updatedFilters);
          },
        })),
      },
      {
        title: "Meslek Grubu Numarası Koşulları",
        param: "meslek_grubu_numarasi",
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
          const sectionKey = section.param;
          section.filters.forEach((filter, index) => {
            if (filter.enabled) {
              const filterKey = filterMap[sectionKey] ? filterMap[sectionKey][index] : null;
              if (filterKey) {
                const queryParamKey = `${sectionKey}_${filterKey}`;
                if (filter.value) {
                  queryParams.append(queryParamKey, filter.value.toUpperCase());
                } else if (sectionKey === "sirket_turu") {
                  queryParams.append(queryParamKey, "true");
                }
              }
            }
          });
        
          queryParams.append(`${sectionKey}_enabled`, 'true');
        }        
      });
      console.log(`http://127.0.0.1:5000/search?${queryParams.toString()}`);

      fetch(`http://127.0.0.1:5000/search?${queryParams.toString()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Parse JSON response
        })
        .then(data => {
          console.log("Search results:", data);
          setResults(data);  // Set the search results
        })
        .catch(error => {
          console.error("Error during search:", error);
        });
    }

    function exportToExcel(results) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Results');

        // Define the headers and their order
        const headers = [
            { header: 'Oda Sicil No', key: 'oda_sicil_no', width: 15 },
            { header: 'Ticari Sicil No', key: 'ticari_sicil_no', width: 15 },
            { header: 'Meslek Grubu Numarası', key: 'meslek_grubu_numarasi', width: 15 },
            { header: 'Meslek Grubu Adı', key: 'meslek_grubu_adi', width: 30 },
            { header: 'Ünvanı', key: 'unvani', width: 40 },
            { header: 'Şirket Türü', key: 'sirket_turu', width: 15 },
            { header: 'İlçe Adı', key: 'ilce_adi', width: 20 },
            { header: 'Mahalle Adı', key: 'mahalle_adi', width: 25 },
            { header: 'Tescilli Adresi', key: 'tescilli_adresi', width: 40 }
        ];

        worksheet.columns = headers;

        // Apply header style
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, color: { argb: 'FFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '969696' }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        // Add rows to the worksheet
        results.forEach(result => {
            worksheet.addRow(result);
        });

        // Apply text wrapping and alignment to all cells
        worksheet.eachRow({ includeEmpty: true }, row => {
            row.eachCell({ includeEmpty: true }, cell => {
                cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
            });
        });

        // Generate the Excel file and prompt for download
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'search_results.xlsx');
        });
    }
    

  return (
    <div className="app-container">
      <div className="app-main-container">
        <div className="header-container">
          <div className="logo-container">
            <img src={`${process.env.PUBLIC_URL}/logo500.png`} alt="İZTO Logo" className="izto-logo" />
          </div>
          <h1 className="main-title">Advanced Search Engine for İZTO</h1>
          <div className="search-button-container">
            <button onClick={handleSearch}>Search</button>
            {results.length > 0 && (
              <button onClick={() => exportToExcel(results)} style={{ marginLeft: '10px' }}>
                Export to Excel
              </button>
            )}
          </div>
        </div>
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
        <ResultDisplay results={results} />
      </div>
    </div>
  );       
}
export default App;
  