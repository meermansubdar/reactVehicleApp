import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [vehicleId, setVehicleId] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  //const apiUrl = "https://2h2it74fl8.execute-api.us-east-1.amazonaws.com/prod/vehicles";
  const apiUrl = "https://hhkxa0pdf2.execute-api.us-east-1.amazonaws.com/dev/vehicles";

  const fetchData = () => {
    let url = apiUrl;

    // Append vehicleId to the API URL if it is provided
    if (vehicleId) {
      url += `?vehicleId=${vehicleId}`;
    }

    // Make GET request to the API Gateway
    axios.get(url)
      .then(response => {
        setData(response.data || []); // Assuming response structure
        console.log(response.data);
	setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data');
      });
  };

  return (
    <div className="App">
      <h1>Vehicle Information</h1>

      <div>
        <label>Vehicle ID: </label>
        <input 
          type="text" 
          value={vehicleId} 
          onChange={(e) => setVehicleId(e.target.value)} 
          placeholder="Enter Vehicle ID"
        />
        <button onClick={fetchData}>Fetch Data</button><br />
      </div><br />

      {error && <p>{error}</p>}

      {data.length > 0 && (
        <table align="center" border="1">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Vehicle Make</th>
              <th>Vehicle Speed</th>
              <th>Vehicle Latitude</th>
              <th>Vehicle Longitude</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.vehicleId || 'N/A'}</td>
                <td>{item.vehicleMake || 'N/A'}</td>
                <td>{item.vehicleSpeed || 'N/A'}</td>
                <td>{item.vehicleLatitude || 'N/A'}</td>
                <td>{item.vehicleLongitude || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
