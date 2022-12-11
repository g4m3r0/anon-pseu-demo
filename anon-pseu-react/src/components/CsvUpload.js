import React, { useState } from 'react';
import { Table, Button, Alert, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import md5 from 'md5';
import sha1 from 'sha1';
import CryptoJS from 'crypto-js';

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

  // simple substitution cipher
  // The encryption function takes in the data to be encrypted and a key as inputs. It then creates
  // an empty array called encryptedData. It then loops through each character in the data and 
  // adds the corresponding character in the key to it. For example, if the data is "hello" and the 
  // key is "world", the encrypted data will be "jvnqn". The function then returns the 
  // encryptedData array.
  const encryptOld = (data, key) => {
    const encryptedData = [];
    for (let i = 0; i < data.length; i++) {
    encryptedData[i] = data[i] + key[i % key.length];
    }
    return encryptedData;
  };

  const decryptOld = (data, key) => {
    const decryptedData = [];
    for (let i = 0; i < data.length; i++) {
    decryptedData[i] = data[i] - key[i % key.length];
    }
    return decryptedData;
  };

  const encrypt = (data, key) => {
    const encryptedData = CryptoJS.AES.encrypt(data, key);
    return encryptedData.toString();
  };
    
  const decrypt = (data, key) => {
    const decryptedData = CryptoJS.AES.decrypt(data, key);
    return decryptedData.toString(CryptoJS.enc.Utf8);
  };

  const md5WithSalt = (data, salt) => {
    return md5(data + salt);
  };

  const sha1WithSalt = (data, salt) => {
    return sha1(data + salt);
  };

  const pseudonymizeData = (method, key) => {
    let newCsvData = [...csvData];
    let encryptionKey = document.getElementById("encryptionKey").value;

    switch (method) {
      case 'md5':
        newCsvData.forEach((row) => {
          row[key] = md5(row[key]);
        });
        break;
      case 'md5WithSalt':
        newCsvData.forEach((row) => {
          row[key] = md5WithSalt(row[key], encryptionKey);
        });
        break;
      case 'sha1':
        newCsvData.forEach((row) => {
          row[key] = sha1(row[key]);
        });
        break;
      case 'sha1WithSalt':
        newCsvData.forEach((row) => {
            row[key] = sha1WithSalt(row[key], encryptionKey);
        });
        break;
      case 'encrypt':
        newCsvData.forEach((row) => {
          row[key] = encrypt(row[key], encryptionKey);
        });
        break;
      case 'decrypt':
        newCsvData.forEach((row) => {
          row[key] = decrypt(row[key], encryptionKey);
        });
        break;
      case 'round-to-int':
        newCsvData.forEach((row) => {
          row[key] = Math.round(row[key]);
        });
        break;
      case 'remove-day':
        newCsvData.forEach((row) => {
            const dateParts = row[key].split('-');
            row[key] = `${dateParts[0]}-${dateParts[1]}`;
        });
        break;
      case 'remove-day-month':
        newCsvData.forEach((row) => {
            row[key] = row[key].split('-')[0];
        });
        break;
      case 'round-to-tens':
        newCsvData.forEach((row) => {
          row[key] = Math.round(row[key] / 10) * 10;
        });
        break;
      case 'anonymize':
        newCsvData.forEach((row) => {
          row[key] = "********";
        });
        break;
      default:
        break;
    }
    setCsvData(newCsvData);
  };

  return (
    <div>
      <Card className='mb-3 mt-3' bg="Light" border="secondary">
        <Card.Header>Settings</Card.Header>
        <Card.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formGroupSelectFile">
              <Form.Label>Select a CSV File</Form.Label>
              <Form.Control
                  type="file"
                  placeholder="Choose a .CSV file"
                  aria-label="File input"
                  accept=".csv"
                  onChange={handleFileSelect} 
              />
            </Form.Group>
            <Button variant="primary">Upload</Button>
            <Form.Group className="mb-3 mt-3" controlId="formGroupEncryptionKey">
              <Form.Label>Encryption Key</Form.Label>
              <Form.Control
                  id="encryptionKey"
                  defaultValue="MyStrongKey"
                  placeholder="MyStrongKey"
                  aria-label="Encryption key"
                  aria-describedby="basic-addon2"
              />
            </Form.Group>
        </Form>            
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Anonymization and Pseudonymization</Card.Header>
        <Card.Body>
          {csvData.length === 0 && <Alert variant="primary">Table is empty. Please upload a CSV file to display data.</Alert>}
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
                        <option value="md5-with-salt">MD5 with salt</option>
                        <option value="sha1">SHA1</option>
                        <option value="sha1">SHA1 with salt</option>
                        <option value="encrypt">encrypt</option>
                        <option value="decrypt">decrypt</option>
                        <option value="round-to-int">Round to integer</option>
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
        </Card.Body>
        <Card.Footer>
          <Button onClick={exportCsv}>Export Table as .CSV</Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CSVUploader;
