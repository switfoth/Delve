import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PartyReport from './PartyReport';
import './party-report-button.css'
import { getPartyItems } from '../../store/item';
import { useDispatch, useSelector } from 'react-redux';

function PartyReportModal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const currentParty = useSelector(state => state.party.currentParty)


  return (
    <>
      <button id="party-report-button" onClick={() => setShowModal(true)}>Party Report</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PartyReport />
        </Modal>
      )}
    </>
  );
}

export default PartyReportModal;
