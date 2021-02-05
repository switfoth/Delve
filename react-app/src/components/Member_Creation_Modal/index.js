import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import MemberForm from './MemberForm';
import './button.css'

function MemberFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="button" onClick={() => setShowModal(true)}>Add Member</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MemberForm />
        </Modal>
      )}
    </>
  );
}

export default MemberFormModal;
