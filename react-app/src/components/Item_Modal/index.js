import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ItemForm from './ItemForm';

function ItemFormModal() {
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
      <button style={style} onClick={() => setShowModal(true)}>Add Item</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ItemForm />
        </Modal>
      )}
    </>
  );
}

export default ItemFormModal;
