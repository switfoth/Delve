import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addSingleParty } from '../../store/party';
import { Modal } from '../../context/Modal';
import "./partyform.css";

function PartyForm() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(true)
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(
      addSingleParty({
        name,
        user_id: user.id
      })
    )
    setShowModal(false)
  };

  return (
    <div className="party-box">
      <h1>New Party</h1>
      <form className="party-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <input
            placeholder="Party Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        <button type="submit">Add Party</button>
      </form>
    </div>
  );
}

export default PartyForm;
