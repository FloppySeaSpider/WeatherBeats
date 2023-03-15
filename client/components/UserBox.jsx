import React from 'react';
import { useSelector } from 'react-redux';

export default function UserBox() {
  const { userName, email } = useSelector((state) => state.updater);

  return (
    <div className="column">
      <div className="box is-size-4 has-text-white is-full-height">
        {userName ? <p>Welcome {userName}!</p> : <p>Welcome! Please login.</p>}
        <p>{email}</p>
        {userName ? (
          <button className="button is-primary is-small">Log Out</button>
        ) : null}
      </div>
    </div>
  );
}
