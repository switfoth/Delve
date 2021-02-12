import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editSingleItem } from "../../store/item";
import { deleteSingleMember, getPartyMembers } from '../../store/member';
import "./memberdeleteform.css";

function MemberDeleteForm() {
  const dispatch = useDispatch();

  const currentParty = useSelector(state => state.party.currentParty)
  const currentMember = useSelector(state => state.member.currentMember)
  const currentItems = useSelector(state => state.item.itemList)
  const itemsToMove = currentItems.map(item =>{
      if(item.member_id === currentMember){
          return item
      }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Delete Pressed - current member:", currentMember)
    itemsToMove.forEach( el =>{
        el.member_id = null;
        dispatch(editSingleItem(el))
    })
    dispatch(deleteSingleMember(currentMember))
    dispatch(getPartyMembers(currentParty))
  };

  return (
    <div className="member-box">
      <h1>Are you sure?</h1>
      <form className="member-delete-form" onSubmit={handleSubmit}>
        <h3>When you delete a member, all of their items will be added back to party loot.</h3>
        <button type="submit">Delete Member</button>
      </form>
    </div>
  );
}

export default MemberDeleteForm;
