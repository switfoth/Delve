import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteSingleItem, editSingleItem } from "../../store/item";
import { deselectMember } from "../../store/member"
import { getItemTypes } from "../../store/itemtype";
import "./itemdisplay.css";

function ItemDisplay() {
  const user_id = useSelector(state => state.session.user.id)
  const currentItem = useSelector(state => state.item.currentItem)
  const selectedItem = useSelector(state => state.item.itemList.find(ele => ele.id === currentItem))
  const dispatch = useDispatch();

  const [id, setId] = useState(selectedItem.id)
  const [name, setName] = useState(selectedItem.name);
  const [type_id, setTypeId] = useState(selectedItem.type_id);
  const [description, setDescription] = useState(selectedItem.description);
  const [platinum_value, setPlatinum_Value] = useState(selectedItem.platinum_value);
  const [gold_value, setGold_Value] = useState(selectedItem.gold_value);
  const [silver_value, setSilver_Value] = useState(selectedItem.silver_value);
  const [copper_value, setCopper_Value] = useState(selectedItem.copper_value);
  const [member_id, setMember_Id] = useState(selectedItem.member_id)
  const [errors, setErrors] = useState([]);


  useEffect(()=>{
    dispatch(getItemTypes())
  }, [dispatch])

  const party_id = useSelector(state => state.party.currentParty)
  const itemtypes = useSelector(state => state.itemtype.itemTypeList)
  const members = useSelector(state => state.member.memberList)


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(
      editSingleItem({
        id,
        name,
        type_id,
        description,
        platinum_value,
        gold_value,
        silver_value,
        copper_value,
        party_id,
        member_id: member_id === "Nobody" ? undefined : member_id
      }, party_id, member_id, user_id)
    )
    if(member_id === "Nobody"){
      dispatch(deselectMember())
    }
  };

  return (
    <div className="item-display">
      <h1>Item Details</h1>
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
            <h3>Who claims this item?</h3>
            <select
              value={member_id}
              onChange={(e) => {setMember_Id(e.target.value)}}
            >
            <option>Nobody</option>
            {members.map(memberSelector => {
                return <option key={memberSelector.id} value={memberSelector.id}>{memberSelector.name}</option>
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
              <button id="item-edit-button" type="submit">EDIT ITEM</button>
            </div>
            <div id="item-delete-button" onClick={() =>{
              dispatch(deleteSingleItem(selectedItem.id, selectedItem.member_id, selectedItem.party_id))
            }}>DELETE ITEM</div>
          </div>
      </form>
    </div>
  );
}

export default ItemDisplay;
