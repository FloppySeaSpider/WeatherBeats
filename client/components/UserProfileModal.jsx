// import React, {useState} from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import {
// //   modalIsOpen,
// // } from '../redux/stateSlice';

// function ModalForUserProfile() {
//   const [modalIsOpen, setModelIsOpen] = useState

//   return (
//     <button
//       type="submit"
//       className="button is-primary is-small"
//       onClick={() => {
//         dispatch();
//       }}
//     >
//       View Profile
//     </button>

//   );
// }

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../redux/stateSlice';
import UserProfile from './UserProfile';

function Modal() {
  const dispatch = useDispatch();
  return (
    <div className="modal-overlay">
      <div className="modal">
        <UserProfile />
        <br />
        <button
          className="button is-primary is-small"
          type="submit"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Close
        </button>
        {/* {console.log('inside modal')} */}
      </div>

    </div>
  );
}

export default Modal;
