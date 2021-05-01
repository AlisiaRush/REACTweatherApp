import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = ()  => {

  const [longitude, setCoordinatesX] = useState([]);
  const [latitude, setCoordinatesY] = useState([]);
  const [cityResults, setCity] = useState([]);
  const [stateResults, setState] = useState([]);
  const [countyResults, setCounty] = useState([]);
  const [weatherResults, setWeather] = useState([]);
  
 const fetchData = () =>{

   const longLatCityStateApi = 'https://api.weather.gov/points/33.9462,-84.3346';
   const countyApi = 'https://api.weather.gov/zones/county/GAC089';
   const weatherApi = 'https://api.weather.gov/gridpoints/FFC/51,95/forecast';

   const getlongLatCityState = axios.get(longLatCityStateApi);
   const getCounty = axios.get(countyApi);
   const getWeather = axios.get(weatherApi);

   axios.all([getlongLatCityState, getCounty, getWeather]).then(
     axios.spread((...allData) =>{

      const longitude = allData[0].data.geometry.coordinates[0];
      const latitude = allData[0].data.geometry.coordinates[1];
      const city = allData[0].data.properties.relativeLocation.properties.city;
      const state = allData[0].data.properties.relativeLocation.properties.state;
      const county = allData[1].data.properties.name;
      const weather = allData[2].data.properties.periods[0].temperature;

      setCoordinatesX(latitude);
      setCoordinatesY(longitude);
      setCity(city);
      setState(state);
      setCounty(county);
      setWeather(weather);
     })
   )
 }

useEffect(()=>{
  
}, []);

  return (
    <div className="App">

              {/* Results */}
                <div>
              Results:<br />
              Longitude: {longitude}<br />
              Latutude : {latitude}<br />
              City: {cityResults}<br />
              State: {stateResults}< br />

              County: {countyResults}< br />
              Weather: {weatherResults}
              </div>
              
            
              {/* form */}
<form>
          

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

              <p>Enter the following Coordinates:<br />
                Longitude: 33.9462<br />
                Latitude: -84.3346
              </p>
            <button
            onClick = {()=>{
              fetchData();
            }}>
              Submit
            </button>
            
    </div>
  );
}

export default App;
