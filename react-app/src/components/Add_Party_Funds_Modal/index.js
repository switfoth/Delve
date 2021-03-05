import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import AddPartyMoney from './PartyAddForm';
import './party-addfund-button.css';


function PartyAddMoneyModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="party-addfund-button" className="delve-button" onClick={() => {
                    setShowModal(true);
                }}>DEPOSIT</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddPartyMoney/>
                </Modal>
            )}
        </>
    )
}

export default PartyAddMoneyModal;
