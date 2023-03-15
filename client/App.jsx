import React from 'react';
import Main from './components/Main';
import { useSelector } from 'react-redux';

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
