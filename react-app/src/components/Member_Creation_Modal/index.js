import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import MemberForm from './MemberForm';

function MemberFormModal() {
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
      <button style={style} onClick={() => setShowModal(true)}>Add Member</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MemberForm />
        </Modal>
      )}
    </>
  );
}

export default MemberFormModal;
