import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddMemberMoney from './MemberAddForm';
import './member-addfund-button.css';


function MemberAddMoneyModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="member-addfund-button" onClick={() => {
        setShowModal(true);
        }}>DEPOSIT</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddMemberMoney/>
        </Modal>
      )}
    </>
  );
}

export default MemberAddMoneyModal;
