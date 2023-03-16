import React from 'react';
import Icon from '@mdi/react';
import { mdiClockTimeFive } from '@mdi/js';
import { useSelector } from 'react-redux';
import ProfilePicture from '../../public/chick.png';

function UserProfile() {
  const { userName } = useSelector((state) => state.updater);

  // QUERY DB FOR NAME AND USERNAME
  const firstAndLastName = 'First Name';
  const userHandle = `@${userName}`;
  //

  // QUERY DB FOR TOP 3 FAV SONGS
  const favSongOne = 'xxxxx';
  const favSongTwo = 'xxxxx';
  const favSongThree = 'xxxxx';

  return (
    <div className="card">
      {/* <div class="card-image">
            <figure class="image is-4by3">
            <img src={ProfilePicture}alt="Placeholder image"/>
            </figure>
        </div> */}
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={ProfilePicture} alt="user profile pic" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{firstAndLastName}</p>
            <p className="subtitle is-6">{userHandle}</p>
          </div>
        </div>

        <div className="content">

          <div className="favSongsHeader">
            {/* <Icon path={mdiClockTimeFive} size={1} /> */}
            <h3>About Me</h3>
            <button
              className="button is-primary is-small"
              type="submit"
              onClick={() => {
                dispatch();
              }}
            >
              Edit
            </button>
            
          </div>

          <br />

          {/* QUERY DB FOR TOP 3 FAV SONGS */}
          <p>{favSongOne}</p>
          <br />
          <p>{favSongTwo}</p>
          <br />
          <p>{favSongThree}</p>
          <br />

        </div>
      </div>
    </div>
  );
}

export default UserProfile;
