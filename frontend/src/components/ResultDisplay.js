import React from 'react';
import './ResultDisplay.css';

function ResultDisplay({ results }) {
  if (!results || results.length === 0) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <div className="result-container">
      <table className="result-table">
        <thead>
          <tr>
            <th>Oda Sicil No</th>
            <th>Ticari Sicil No</th>
            <th>Meslek Grubu Numarası</th>
            <th>Meslek Grubu Adı</th>
            <th>Ünvanı</th>
            <th>Şirket Türü</th>
            <th>İlçe Adı</th>
            <th>Mahalle Adı</th>
            <th>Tescilli Adresi</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.oda_sicil_no}</td>
              <td>{result.ticari_sicil_no}</td>
              <td>{result.meslek_grubu_numarasi}</td>
              <td>{result.meslek_grubu_adi}</td>
              <td>{result.unvani}</td>
              <td>{result.sirket_turu}</td>
              <td>{result.ilce_adi}</td>
              <td>{result.mahalle_adi}</td>
              <td>{result.tescilli_adresi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultDisplay;
