/* eslint-disable react/no-unknown-property */
import React from 'react';
import Logo from '../../public/logo.png';

export default function Login() {
  return (
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-4-widescreen">
            <div className="card">
              <div className="image is-64x64" />

              <div className="card-image">
                <figure className="image">
                  <img src={Logo} alt="Placeholder image" />
                </figure>
              </div>

              <div className="card-content">
                <div className="content">
                  <div className="field">
                    <a
                      className="button is-large is-success is-fullwidth"
                      href="/auth/login"
                    >
                      Login
                    </a>
                  </div>

                  <div className="field">
                    <label className="label has-text-centered has-text-white">
                      Forgot Password?
                    </label>
                  </div>

                  <div className="field">
                    <label className="label has-text-centered has-text-white">
                      Sign Up
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
