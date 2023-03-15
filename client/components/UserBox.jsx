import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updateUser } from '../redux/stateSlice';

export default function UserBox() {
  const { userName, email } = useSelector((state) => state.updater);
  const dispatch = useDispatch();

  return (
    <div className="column">
      <div className="box is-size-4 has-text-white is-full-height">
        {userName ? <p>Welcome {userName}!</p> : <p>Welcome! Please login.</p>}
        <p>{email}</p>
        {userName ? (
          <button
            className="button is-primary is-small"
            onClick={() => {
              dispatch(updateUser(null));
              dispatch(updateEmail(null));
            }}
          >
            Log Out
          </button>
        ) : null}
      </div>
    </div>
  );
}
