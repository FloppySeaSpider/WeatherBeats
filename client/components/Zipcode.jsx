import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateType, updateTemp, updateZipcode, updateCity, updateUrl, updateAll,
} from '../redux/stateSlice';
import axios from 'axios';

// send fetch request to get weather from API based upon Zip Code

// on button click --> set location to the value of whatever is in input field

export default function Zipcode() {
  const dispatch = useDispatch();
  const { temp, city, type, zipcode } = useSelector((state) => state.updater);

  const updateWeatherAPI = async () => {
    // on-load, fetch weather data from the weather API
      const body = JSON.stringify({ zip: zipcode });
      console.log(body)
      const response = await fetch('http://localhost:3000/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors'
        },
        body,
      });
      console.log('HERE')
      console.log("API RESPONSE", response);
      const newData = await response.json();
      const newnewData = await newData
      return newnewData
  }
  
  useEffect(() => {
    updateWeatherAPI();
    getNewWeatherData('11111')
  }, []);

  // on button click, fire reducers to update state and re-render page with new location

  function getNewWeatherData(input) {
    const body = JSON.stringify({ zip: input });
    console.log('This is the body:', body);
    fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((response) => response.json())
      .then((response) => dispatch(updateAll(response)))
      .then((response) => console.log('This is the reponse after UpdateAll', response));
  }

  return (
    <div className="column">
      <div className="box is-align-content-center is-justify-content-center">
        <div className="card-content">
          <span />
        </div>

        <div className="field has-addons">
          <div className="control has-icons-left has-icons-right is-expanded">

            <form onSubmit={updateWeatherAPI}>
              <input className="input has-text-weight-bold is-size-4" type="text" placeholder="ZIPCODE" onChange={(e) => dispatch(updateZipcode(e.target.value))} value={zipcode}/>
            </form>
          </div>
          <p className="control">

            <a className="button is-primary has-text-weight-bold is-size-4 has-text-light" onClick={() => getNewWeatherData(location)}>Location</a>
          </p>
        </div>

        <footer className="card-footer">
          <p className="card-footer-item has-text-weight-bold is-size-4 has-text-grey is-capitalized">{type}</p>
          <p className="card-footer-item has-text-weight-bold is-size-4 has-text-grey has-text-centered">{city}</p>
          <p className="card-footer-item has-text-weight-bold is-size-4 has-text-grey">{temp}</p>
        </footer>

      </div>

    </div>
  );
}
