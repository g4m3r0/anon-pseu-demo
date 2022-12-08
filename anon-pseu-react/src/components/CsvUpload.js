import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import md5 from 'md5';
import sha1 from 'sha1';

const CSVUploader = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const csvData = parseCsvData(data);
        setCsvData(csvData);
      };
      reader.readAsText(file);
    }
  };

  const parseCsvData = (data) => {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const csvData = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      const rowData = {};
      for (let j = 0; j < headers.length; j++) {
        rowData[headers[j]] = row[j];
      }
      csvData.push(rowData);
    }
    return csvData;
  };

  const exportCsv = () => {
    const csvString = csvData.map((row) => Object.values(row).join(',')).join('\n');
    const csvBlob = new Blob([csvString], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(csvBlob);
    a.download = 'table.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const pseudonymizeData = (method, key) => {
    switch (method) {
      case 'md5':
        csvData.forEach((row) => {
          row[key] = md5(row[key]);
        });
        break;
      case 'sha1':
        csvData.forEach((row) => {
          row[key] = sha1(row[key]);
        });
        break;
      case 'round-to-int':
        csvData.forEach((row) => {
          row[key] = Math.round(row[key]);
        });
        break;
      case 'remove-day':
        csvData.forEach((row) => {
            const dateParts = row[key].split('-');
            row[key] = `${dateParts[0]}-${dateParts[1]}`;
        });
        break;
      case 'remove-day-month':
        csvData.forEach((row) => {
            row[key] = row[key].split('-')[0];
        });
        break;
      case 'round-to-tens':
        csvData.forEach((row) => {
          row[key] = Math.round(row[key] / 10) * 10;
        });
        break;
      default:
        break;
    }
    setCsvData([...csvData]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} accept=".csv" />
      <Table striped bordered hover>
        <thead>
          <tr>
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((key, index) => (
                <th key={index}>
                  {key}
                  <select onChange={(event) => pseudonymizeData(event.target.value, key)}>
                    <option value="">Select pseudonymization method</option>
                    <option value="md5">MD5</option>
                    <option value="sha1">SHA1</option>
                    <option value="round-to-int">Round double to integer</option>
                    <option value="remove-day">Remove Day from Date</option>
                    <option value="remove-day-month">Remove Day and Month from Date</option>
                    <option value="round-to-tens">Round to the nearest tens digit</option>
                  </select>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={exportCsv}>Export CSV</button>
    </div>
  );
};

export default CSVUploader;
