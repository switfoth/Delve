import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProfileForm from './ProfileForm';
import './button.css'

function ProfileFormModal() {
  const [showModal, setShowModal] = useState(false);



  return (
    <>
      <button id="button" onClick={() => setShowModal(true)}>Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfileForm />
        </Modal>
      )}
    </>
  );
}

export default ProfileFormModal;
