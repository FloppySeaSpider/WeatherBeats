import React from 'react';
import Logo from '../../public/logo.png';

export default function Icon() {
  return (
    <div className="column">
      <div className="box is-fullheight">
        <figure className="image">
          <img src={Logo} alt="Placeholder image" />
        </figure>
      </div>
    </div>
  );
}
