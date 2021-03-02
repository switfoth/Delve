import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleParty, deselectParty, getUserParties } from '../../store/party';
import "./partydeleteform.css";

function PartyDeleteForm() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const currentParty = useSelector(state => state.party.currentParty)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteSingleParty(currentParty, user.id))
    dispatch(deselectParty())
    dispatch(getUserParties(user.id))
  };

  return (
    <div className="party-delete-box">
      <h1>Are you sure?</h1>
      <form className="party-delete-form" onSubmit={handleSubmit}>
        <h3>When you delete a party, ALL members and items will also be deleted.</h3>
        <button id="party-delete-form-button" type="submit">Delete Party</button>
      </form>
    </div>
  );
}

export default PartyDeleteForm;
