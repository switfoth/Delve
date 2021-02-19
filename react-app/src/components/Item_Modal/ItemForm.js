import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addSingleItem } from "../../store/item";
import { getItemTypes } from "../../store/itemtype";
import { Modal } from '../../context/Modal';
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

  const [showModal, setShowModal] = useState(true)

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
    setShowModal(false)
  };

  return (
    <div className="item-box">
      <h1>Add Item</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      <form className="item-form" onSubmit={handleSubmit}>
          <div id="new-item-row-1">
            <h3>Item Name</h3>
            <input
              placeholder="Item Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div id="new-item-row-2">
            <h3>Item Description</h3>
            <textarea
              placeholder="Item Description"
              value={description}
              id="item-form-text-box"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div id="new-item-row-3">
            <h3>Item Category</h3>
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
          </div>
          <div id="new-item-row-4">
            <div>
              <h3>Platinum</h3>
              <input
                placeholder="Platinum Value"
                type="number"
                value={platinum_value}
                onChange={(e) => setPlatinum_Value(e.target.value)}
              />
            </div>
            <div>
              <h3>Gold</h3>
              <input
                placeholder="Gold Value"
                type="number"
                value={gold_value}
                onChange={(e) => setGold_Value(e.target.value)}
              />
            </div>
            <div>
              <h3>Silver</h3>
              <input
                placeholder="Silver Value"
                type="number"
                value={silver_value}
                onChange={(e) => setSilver_Value(e.target.value)}
              />
            </div>
            <div>
              <h3>Copper</h3>
              <input
                placeholder="Copper Value"
                type="number"
                value={copper_value}
                onChange={(e) => setCopper_Value(e.target.value)}
              />
            </div>
            <div>
              <button id="new-item-submit" type="submit">Add Item</button>
            </div>
          </div>
      </form>
    </div>
  );
}

export default ItemForm;
