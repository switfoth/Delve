import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleItem } from "../../store/item";
import { deleteSingleParty, deselectParty, getUserParties } from '../../store/party';
import { deleteSingleMember} from '../../store/member'
import "./partydeleteform.css";

function PartyDeleteForm() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const currentParty = useSelector(state => state.party.currentParty)
  const partyMembers = useSelector(state => state.member.memberList)
  const membersToDelete = partyMembers.map(member =>{
      if(member.party_id === currentParty){
          return member
      }
  })
  const currentItems = useSelector(state => state.item.itemList)
  const itemsToDelete = currentItems.map(item =>{
      if(item.party_id === currentParty){
          return item
      }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    membersToDelete.forEach( el =>{
        dispatch(deleteSingleMember(el.id))
    })
    itemsToDelete.forEach( el =>{
        dispatch(deleteSingleItem(el.id))
    })
    dispatch(deleteSingleParty(currentParty, user.id))
    dispatch(deselectParty())
    dispatch(getUserParties(user.id))
  };

  return (
    <div className="party-box">
      <h1>Are you sure?</h1>
      <form className="party-delete-form" onSubmit={handleSubmit}>
        <h3>When you delete a party, ALL members and items will also be deleted.</h3>
        <button type="submit">Delete Party</button>
      </form>
    </div>
  );
}

export default PartyDeleteForm;
