import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PartyReport from './PartyReport';
import './party-report-button.css'

function PartyReportModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="party-report-button" className="delve-button" onClick={() => setShowModal(true)}>Party Report</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PartyReport id="party-report-modal-box" />
        </Modal>
      )}
    </>
  );
}

export default PartyReportModal;
