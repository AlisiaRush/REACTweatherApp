import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = ()  => {

  const [coordinatesXResults, setCoordinatesX] = useState([]);
  const [coordinatesYResults, setCoordinatesY] = useState([]);
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

      const xCoordinates = allData[0].data.geometry.coordinates[0];
      const yCoordinates = allData[0].data.geometry.coordinates[1];
      const city = allData[0].data.properties.relativeLocation.properties.city;
      const state = allData[0].data.properties.relativeLocation.properties.state;
      const county = allData[1].data.properties.name;
      const weather = allData[2].data.properties.periods[0].temperature;
      // console.log('AllLongLatCityState DATA', longLatCityStateAPI);
      // console.log('ALLCounty DATA', countyAPI);
      // console.log(getWeather);
      // console.log('WEATHER', weather);

      setCoordinatesX(xCoordinates);
      setCoordinatesY(yCoordinates);
      setCity(city);
      setState(state);
      setCounty(county);
      setWeather(weather);
     })
   )
 }

useEffect(()=>{
  fetchData()
}, []);

  return (
    <div className="App">
        
              Coordinates X: {coordinatesXResults}<br />
              Coordinates Y: {coordinatesYResults}<br />
              City: {cityResults}<br />
              State: {stateResults}< br />

              County: {countyResults}< br />
              Weather: {weatherResults}

    </div>
  );
}

export default App;
