import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addSingleMember } from '../../store/member';
import "./memberform.css";

function MemberForm() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const party = useSelector(state => state.party.currentParty)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(
      addSingleMember({
        name,
        party_id: party.id
      })
    )
  };

  return (
    <div className="member-box">
      <h1>Add Member</h1>
      <form className="member-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <input
            placeholder="Party-Member's Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}

export default MemberForm;
