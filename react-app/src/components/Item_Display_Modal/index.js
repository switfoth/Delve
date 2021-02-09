import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ItemDisplay from './ItemDisplay';
import './button.css'

function ItemDisplayModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="button" onClick={() => setShowModal(true)}>Item Details</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ItemDisplay />
        </Modal>
      )}
    </>
  );
}

export default ItemDisplayModal;
