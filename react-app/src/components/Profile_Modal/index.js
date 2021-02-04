import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProfileForm from './ProfileForm';

function ProfileFormModal() {
  const [showModal, setShowModal] = useState(false);

  const style = {
    background: 'blue',
    border: 0,
    color: 'white',
    height: '35px',
    padding: '0 30px',
    float: 'right'
  };

  return (
    <>
      <button style={style} onClick={() => setShowModal(true)}>Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfileForm />
        </Modal>
      )}
    </>
  );
}

export default ProfileFormModal;
