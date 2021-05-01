import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = ()  => {

  const [coordinatesX, setCoordinatesX] = useState([]);
  const [coordinatesY, setCoordinatesY] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [county, setCounty] = useState([]);
  

 const fetchData = () =>{
   const longLatCityStateApi = 'https://api.weather.gov/points/33.9462,-84.3346';
   const countyApi = 'https://api.weather.gov/zones/county/GAC089';

   const getlongLatCityState = axios.get(longLatCityStateApi);
   const getCounty = axios.get(countyApi);

   axios.all([getlongLatCityState, getCounty]).then(
     axios.spread((...allData) =>{

      const xCoordinates = allData[0].data.geometry.coordinates[0];
      const yCoordinates = allData[0].data.geometry.coordinates[1];
      const city = allData[0].data.properties.relativeLocation.properties.city;
      const state = allData[0].data.properties.relativeLocation.properties.state;


      const countyAPI = allData[1].data.properties.name;

      // console.log('AllLongLatCityState DATA', longLatCityStateAPI);
      // console.log('ALLCounty DATA', countyAPI);

      setCoordinatesX(xCoordinates);
      setCoordinatesY(yCoordinates);
      setCity(city);
      setState(state);

      setCounty(countyAPI);
     })
   )
 }

useEffect(()=>{
  fetchData()
}, []);

  return (
    <div className="App">
         {/* X COORDINATES:<span style={{color: "blue"}}>{items.geometry.coordinates[0]}</span> <br/>
                Y COORDINATES: <span style={{color: "blue"}}> {items.geometry.coordinates[1]}</span> 
            
              <div>

                City: <span style={{color: "blue"}}>{items.properties.relativeLocation.properties.city}</span><br/>
                State: <span style={{color: "blue"}}>{items.properties.relativeLocation.properties.state}</span><br/>
                County: <span style={{color: "blue"}}>{items.properties.name}</span>

              </div> */}

              Coordinates X: {coordinatesX}<br />
              Coordinates Y: {coordinatesY}<br />
              City: {city}<br />
              State: {state}< br />

              County: {county}


    </div>
  );
}

export default App;
