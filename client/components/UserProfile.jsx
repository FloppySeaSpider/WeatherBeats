import React from 'react';
import ProfilePicture from '../../public/chick.png'
import Icon from '@mdi/react';
import { mdiHeartCircle } from '@mdi/js';

function UserProfile() {

    //QUERY DV FOR NAME AND USERNAME 
    let firstAndLastName = "First Name"
    let userHandle = "@username"
    //

    //QUERY DB FOR TOP 3 FAV SONGS
    let favSongOne = "xxxxx"
    let favSongTwo = "xxxxx"
    let favSongThree = "xxxxx"
    
    return (
        <div class="card">
        {/* <div class="card-image">
            <figure class="image is-4by3">
            <img src={ProfilePicture}alt="Placeholder image"/>
            </figure>
        </div> */}
        <div class="card-content">
            <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                <img src= {ProfilePicture} alt="Placeholder image"/>
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">{firstAndLastName}</p>
                <p class="subtitle is-6">{userHandle}</p>
            </div>
            </div>

            <div class="content">
            
            <div class= "favSongsHeader">
                <Icon path={mdiHeartCircle} size={1} />
                Favorite Songs
            </div>

            <br/>
         
            {/* QUERY DB FOR TOP 3 FAV SONGS */}
            <p1>{favSongOne}</p1>
            <br/>
            <p1>{favSongTwo}</p1>
            <br/>
            <p1>{favSongThree}</p1>
            <br/>
            
            </div>
        </div>
        </div>
    )
}; 

export default UserProfile; 
