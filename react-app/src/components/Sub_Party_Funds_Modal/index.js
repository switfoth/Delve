import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import SubPartyMoney from './PartySubForm';
import './party-subfund-button.css';


function PartySubMoneyModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="member-subfund-button" className="delve-button" onClick={() => {
                    setShowModal(true);
                }}>WITHDRAW</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SubPartyMoney/>
                </Modal>
            )}
        </>
    )
}

export default PartySubMoneyModal;
