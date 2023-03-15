import React from 'react';
import { useSelector } from 'react-redux';

function Player() {
  const { token, playlist } = useSelector((state) => state.updater);

  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/${playlist}?access_token=${token}&autoplay=true`}
      title="Spotify Player"
      width="300"
      height="380"
      allowtransparency="true"
      allow="encrypted-media"
    />
  );
}

export default Player;
