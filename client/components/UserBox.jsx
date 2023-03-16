import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserAndEmail,
  updateToken,
  updateWeather,
  updateZipcode,
  openModal,
} from '../redux/stateSlice';

export default function UserBox() {
  const { userName, email } = useSelector((state) => state.updater);
  const dispatch = useDispatch();

  return (
    <div className="column">
      <div className="box is-size-4 has-text-white is-full-height">
        {userName ? (
          <p>
            Welcome
            {' '}
            {userName}
            !
          </p>
        ) : <p>Welcome! Please login.</p>}
        <p>{email}</p>
        {userName ? (
          <>
            <button
              className="button is-primary is-small"
              onClick={() => {
                dispatch(updateUserAndEmail({ email: null, userName: null }));
                dispatch(updateToken(null));
                dispatch(updateWeather(null));
                dispatch(updateZipcode(''));
                localStorage.clear();
              }}
              type="submit"
            >
              Log Out
            </button>
            <button
              type="submit"
              className="button is-primary is-small"
              onClick={() => {
                dispatch(openModal());
              }}
            >
              View Profile
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
