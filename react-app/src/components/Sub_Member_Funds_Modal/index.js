import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SubMemberMoney from './MemberSubForm';
import './member-subfund-button.css';


function MemberSubMoneyModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="member-subfund-button" className="button" onClick={() => {
        setShowModal(true);
        }}>WITHDRAW</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SubMemberMoney/>
        </Modal>
      )}
    </>
  );
}

export default MemberSubMoneyModal;
