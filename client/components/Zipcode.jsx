import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateZipcode } from '../redux/stateSlice';

import { updateWeatherAPI } from '../redux/thunks';

// send fetch request to get weather from API based upon Zip Code

// on button click --> set location to the value of whatever is in input field

export default function Zipcode() {
  const dispatch = useDispatch();
  const { temp, city, weather, zipcode } = useSelector(
    (state) => state.updater
  );

  useEffect(() => {
    dispatch(updateWeatherAPI());
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
                dispatch(updateWeatherAPI());
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
            {weather}
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
