import React from 'react';
import { useSelector } from 'react-redux';
import Main from './components/Main';

export default function App() {
  const { url } = useSelector((state) => state.updater);
  return (
    <section
      id="app"
      className="hero is-fullheight"
      style={{ backgroundImage: `url(${url})` }}
    >
      <Main />

    </section>
  );
}
