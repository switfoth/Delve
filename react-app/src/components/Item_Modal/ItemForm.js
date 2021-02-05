import React, { useState } from "react";
import "./itemform.css";

function ItemForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
  };

  return (
    <div className="item-form">
      <h1>Add Item</h1>
      <form className="name" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <input
            placeholder="Item Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="Item Description"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemForm;
