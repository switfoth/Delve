import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import ProfileForm from './ProfileForm';
import './button.css'

function ProfileFormModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);



  return (
    <>
      <button id="button" onClick={() => setShowModal(true)}>Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfileForm user={sessionUser}/>
        </Modal>
      )}
    </>
  );
}

export default ProfileFormModal;
