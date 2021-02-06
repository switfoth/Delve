import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PartyForm from './PartyForm';
import './button.css'

function PartyFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="make-party-button" onClick={() => setShowModal(true)}>Create Party</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PartyForm />
        </Modal>
      )}
    </>
  );
}

export default PartyFormModal;
