import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PartyDeleteForm from './PartyDeleteForm';
import './party-delete-button.css'

function PartyDeleteModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="delete-party-button" className="delve-button" onClick={() => setShowModal(true)}>Delete Party</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PartyDeleteForm />
        </Modal>
      )}
    </>
  );
}

export default PartyDeleteModal;
