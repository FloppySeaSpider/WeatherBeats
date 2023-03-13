import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Main from './Main';
import Login from './Login';
// import WebPlayback from './WebPlayback';

export default function App() {
  const [token, setToken] = useState('');
  const bg = useSelector((state) => state.updater.bg);



  useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      // saves token to state
      setToken(json.access_token);
    }
    getToken();
  }, []);

    <div>
      { (token === '') ? <Login /> : <WebPlayback token={token} /> }
    </div>;

  return (
    <section id='app' class="hero is-fullheight">
      {/* <Login /> */}
      <Main />
    </section>
  );
}


//{backgroundImage: `url(${bg})`}
