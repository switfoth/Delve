import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addSingleItem } from "../../store/item";
import { getItemTypes } from "../../store/itemtype";
import "./itemform.css";

function ItemForm() {
  const [name, setName] = useState("");
  const [type_id, setTypeId] = useState(null);
  const [description, setDescription] = useState("");
  const [platinum_value, setPlatinum_Value] = useState(0);
  const [gold_value, setGold_Value] = useState(0);
  const [silver_value, setSilver_Value] = useState(0);
  const [copper_value, setCopper_Value] = useState(0);
  const [errors, setErrors] = useState([]);

  const party_id = useSelector(state => state.party.currentParty)
  let member_id = useSelector(state => state.member.currentMember)
  const itemtypes = useSelector(state => state.itemtype.itemTypeList)

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getItemTypes())
  }, [dispatch])



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (member_id === null){
      member_id = undefined
    }
    dispatch(
      addSingleItem({
        name,
        type_id,
        description,
        platinum_value,
        gold_value,
        silver_value,
        copper_value,
        party_id,
        member_id
      })

    )
  };

  return (
    <div className="item-box">
      <h1>Add Item</h1>
      <form className="item-form" onSubmit={handleSubmit}>
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
          <select
            placeholder="Item Type"
            value={type_id}
            onChange={(e) => setTypeId(e.target.value)}
            required
          >
            <option value={null}>Select Item Category</option>
            {itemtypes.map(type => {
              return <option key={type.id} value={type.id}>{type.name}</option>
            })}
          </select>
          <input
            placeholder="Item Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            placeholder="Platinum Value"
            type="number"
            value={platinum_value}
            onChange={(e) => setPlatinum_Value(e.target.value)}
          />
          <input
            placeholder="Gold Value"
            type="number"
            value={gold_value}
            onChange={(e) => setGold_Value(e.target.value)}
          />
          <input
            placeholder="Silver Value"
            type="number"
            value={silver_value}
            onChange={(e) => setSilver_Value(e.target.value)}
          />
          <input
            placeholder="Copper Value"
            type="number"
            value={copper_value}
            onChange={(e) => setCopper_Value(e.target.value)}
          />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemForm;
