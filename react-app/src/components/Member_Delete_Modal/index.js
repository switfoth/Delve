import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import MemberDeleteForm from './MemberDeleteForm';
import './member-delete-button.css'

function MemberDeleteModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="delete-member-button" className="delve-button" onClick={() => setShowModal(true)}>Delete Member</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MemberDeleteForm />
        </Modal>
      )}
    </>
  );
}

export default MemberDeleteModal;
