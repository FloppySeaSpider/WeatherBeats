import React from 'react';
import { useDispatch } from 'react-redux';
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
      </div>

    </div>
  );
}

export default Modal;
