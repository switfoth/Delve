import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ItemForm from './ItemForm';
import './button.css'

function ItemFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="button" onClick={() => setShowModal(true)}>ADD ITEM</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ItemForm/>
        </Modal>
      )}
    </>
  );
}

export default ItemFormModal;
