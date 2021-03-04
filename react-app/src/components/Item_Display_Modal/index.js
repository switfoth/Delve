import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { selectCurrentItem } from '../../store/item';
import ItemDisplay from './ItemDisplay';
import './item-display-button.css'

function ItemDisplayModal(props) {
  let item = props
  let dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button id="item-display-button" className="delve-button" onClick={() => {
        dispatch(selectCurrentItem(item.props))
        setShowModal(true);
        }}>ITEM DETAILS</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ItemDisplay />
        </Modal>
      )}
    </>
  );
}

export default ItemDisplayModal;
