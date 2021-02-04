import React, { useState } from "react";
import "./partyform.css";

function PartyForm() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
  };

  return (
    <div className="party-form">
      <h1>Log In</h1>
      <form className="name" onSubmit={handleSubmit}>
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
