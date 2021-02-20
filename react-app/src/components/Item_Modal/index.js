import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ItemForm from './ItemForm';
import './new-item-button.css'

function ItemFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="new-item-button" onClick={() => setShowModal(true)}>ADD ITEM</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ItemForm/>
        </Modal>
      )}
    </>
  );
}

export default ItemFormModal;
