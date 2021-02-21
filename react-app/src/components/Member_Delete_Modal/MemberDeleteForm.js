import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editSingleItem } from "../../store/item";
import { deleteSingleMember, getPartyMembers, selectCurrentMember } from '../../store/member';
import { getPartyItems } from '../../store/item';
import "./memberdeleteform.css";
import AddPartyMoney from "../Add_Party_Funds_Modal/PartyAddForm";
import { editSingleParty } from "../../store/party";

function MemberDeleteForm() {
  const dispatch = useDispatch();

  const currentParty = useSelector(state => state.party.currentParty)
  const selectedParty = useSelector(state => state.party.partyList.find(party => party.id === currentParty))
  const name = selectedParty.name
  const currentMember = useSelector(state => state.member.currentMember)
  const selectedMember = useSelector(state => state.member.memberList.find(member => member.id === currentMember))
  const currentItems = useSelector(state => state.item.itemList)
  const itemsToMove = currentItems.map(item =>{
      if(item.member_id === currentMember){
          return item
      }
    return "Items Moved"
  })
  const copper = selectedMember.copper
  const silver = selectedMember.silver
  const gold = selectedMember.gold
  const platinum = selectedMember.platinum

  const handleSubmit = (e) => {
    e.preventDefault();
    let partyToSend = {
      id: currentParty,
      name: name,
      platinum: parseInt(platinum)+parseInt(selectedParty.platinum),
      gold: parseInt(gold)+parseInt(selectedParty.gold),
      silver: parseInt(silver)+parseInt(selectedParty.silver),
      copper: parseInt(copper)+parseInt(selectedParty.copper)
    }

    itemsToMove.forEach( el =>{
        el.member_id = null;
        dispatch(editSingleItem(el))
    })
    dispatch(deleteSingleMember(currentMember))
      .then(dispatch(getPartyMembers(currentParty)))
      .then(dispatch(getPartyItems(currentParty)))
      .then(dispatch(editSingleParty(partyToSend)))
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
