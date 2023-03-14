import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateType,
  updateTemp,
  updateZipcode,
  updateCity,
  updateUrl,
  updateAll
} from '../redux/stateSlice';

// send fetch request to get weather from API based upon Zip Code

// on button click --> set location to the value of whatever is in input field

export default function Zipcode() {
  const dispatch = useDispatch();
  const { temp, city, type, zipcode, apiQuery } = useSelector(
    (state) => state.updater
  );

  const updateWeatherAPI = async () => {
    const body = JSON.stringify({ zip: zipcode });
    const response = await fetch('http://localhost:3000/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        mode: 'no-cors'
      },
      body
    });
    const newData = await response.json();
    dispatch(updateCity(newData.city));
    dispatch(updateType(newData.type));
    dispatch(updateTemp(newData.temp));
    dispatch(updateApiQuery(false));
  };

  useEffect(() => {
    updateWeatherAPI();
  }, []);

  return (
    <div className="column">
      <div className="box is-align-content-center is-justify-content-center">
        <div className="card-content">
          <span />
        </div>

        <div className="field has-addons">
          <div className="control has-icons-left has-icons-right is-expanded">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateWeatherAPI();
              }}
            >
              <input
                className="input has-text-weight-bold is-size-4"
                type="text"
                placeholder="ZIPCODE"
                onChange={(e) => dispatch(updateZipcode(e.target.value))}
                value={zipcode}
              />
            </form>
          </div>
          <p className="control">
            <a className="button is-primary has-text-weight-bold is-size-4 has-text-light">
              Location
            </a>
          </p>
        </div>

        <footer className="card-footer">
          <p className="card-footer-item has-text-weight-bold is-size-4 has-text-grey is-capitalized">
            {type}
          </p>
          <p className="card-footer-item has-text-weight-bold is-size-4 has-text-grey has-text-centered">
            {city}
          </p>
          <p className="card-footer-item has-text-weight-bold is-size-4 has-text-grey">
            {temp}
          </p>
        </footer>
      </div>
    </div>
  );
}
