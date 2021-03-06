import './App.css';
import React, { useState} from 'react';
import axios from 'axios';

function App() {
 //All Variables in which data is retrieved.
 const [longitude, setCoordinatesX] = useState([]);
 const [latitude, setCoordinatesY] = useState([]);
 const [cityResults, setCity] = useState([]);
 const [stateResults, setState] = useState([]);
 const [countyResults, setCounty] = useState([]);
 const [weatherResults, setWeather] = useState([]);

//Fetching all API calls from JSON-LD Object.
const fetchData = () =>{
  const longLatCityStateApi = 'https://api.weather.gov/points/33.9462,-84.3346';
   const countyApi = 'https://api.weather.gov/zones/county/GAC089';
   const weatherApi = 'https://api.weather.gov/gridpoints/FFC/51,95/forecast';

   //Using Axios GET request
   const getlongLatCityState = axios.get(longLatCityStateApi);
   const getCounty = axios.get(countyApi);
   const getWeather = axios.get(weatherApi);

    //Retrieving all data using a spread operator.
   axios.all([getlongLatCityState, getCounty, getWeather]).then(
     axios.spread((...allData) =>{
        //Get specific Objects and properties within JSON Data (API call)l
      const longitude = allData[0].data.geometry.coordinates[0];
      const latitude = allData[0].data.geometry.coordinates[1];
      const city = allData[0].data.properties.relativeLocation.properties.city;
      const state = allData[0].data.properties.relativeLocation.properties.state;
      const county = allData[1].data.properties.name;
      const weather = allData[2].data.properties.periods[0].temperature;

  // console.log('AllLongLatCityState DATA', longLatCityStateAPI);
  //     console.log('ALLCounty DATA', countyAPI);
      console.log(getWeather);
      console.log('WEATHER', weather);

      //Set Data to be used within DOM elements
      setCoordinatesX(latitude);
      setCoordinatesY(longitude);
      setCity(city);
      setState(state);
      setCounty(county);
      setWeather(weather);
     }));
}

 //Display HTML within browser using return value 
 return (
  <div className="App">

            {/* Results */}
            <div className="listItems">
            <h2>Results</h2>
            <ul>
              <li>Longitude: <span className="highlight">{longitude}</span></li>
              <li>Latitude : <span className="highlight">{latitude}</span></li>
              <li>City: <span className="highlight">{cityResults}</span></li>
              <li>State: <span className="highlight">{stateResults}</span></li>
              <li>County: <span className="highlight">{countyResults}</span></li>
              <li>Weather: <span className="highlight" data-testid="fetch-load">{weatherResults}</span></li>
            </ul>
         
      
          </div>
            {/* form */}
        <form style={{textAlign: "left"}}>
      <p><em><strong>Enter the following Coordinates:</strong></em><br />
              Longitude: 33.9462<br />
              Latitude: -84.3346
            </p>   

            Longitude:
            <input type="text"
            value ={longitude}
            onChange={(e) => setCoordinatesX(e.target.value)}>
            </input> 

            Latitude:
            <input type="text"
            value ={latitude}
            onChange={(e) => setCoordinatesY(e.target.value)}>
            </input>
            </form>

          <div style={{textAlign:"left"}}>
          <button onClick = {()=>{fetchData();}}>Submit</button>
          </div>
  </div>
);
}

export default App;