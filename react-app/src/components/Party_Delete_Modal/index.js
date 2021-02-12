import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PartyDeleteForm from './PartyDeleteForm';
import './button.css'

function PartyDeleteModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="delete-party-button" onClick={() => setShowModal(true)}>Delete Party</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PartyDeleteForm />
        </Modal>
      )}
    </>
  );
}

export default PartyDeleteModal;
