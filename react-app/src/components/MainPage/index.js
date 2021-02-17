import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./mainpage.css";
import SideBar from "../SideBar";
import ItemFormModal from "../Item_Modal";
import ItemDisplayModal from "../Item_Display_Modal/";

// Main Page displays select information based on whether a party or member has been selected.
const MainPage = ()=>{
  const currentParty = useSelector(state => state.party.currentParty)
  const parties = useSelector(state => state.party.partyList)
  const currentMember = useSelector(state => state.member.currentMember)
  const members = useSelector(state => state.member.memberList)
  const items = useSelector(state => state.item.itemList)

  const dispatch = useDispatch();

  // Loads items after parameters (party or member) is set.
  const LoadItems = () =>{
    return items.map( item=>{
      return (
        <>
          <div key={item.id} className="item-row">
            <div id="row-item-name">{item.name}</div>
            <div id="row-item-platinum">P: {item.platinum_value}</div>
            <div id="row-item-gold">G:  {item.gold_value}</div>
            <div id="row-item-silver">S:  {item.silver_value}</div>
            <div id="row-item-copper">C:  {item.copper_value}</div>
            <div id="row-item-button"><ItemDisplayModal props={item.id}/></div>
          </div>
        </>
      )
    })
  }
  const PartyNameDisplay = () =>{
    let partyName = (!parties) ? null : parties.filter(party => {
      return party.id === currentParty})
    return <div>{`Ledger for ${partyName.name}:`}</div>
  }

  const MemberNameDisplay = () =>{
    let memberName = (!members) ? null : members.filter(member => {
      return member.id === currentMember})
    return <div>{`Loot claimed by ${memberName.name}:`}</div>
  }

  // Variable handles what is displayed when part is chosen but not a member, or member is
  // chosen - if member is chosen, it only displays member items. With no member selected
  // it displays unclaimed party loot.
  let mainPageContent;
  if (currentParty === null){
    mainPageContent=(
      <>
        <div id="choose-party"><h2>Please choose a party!</h2></div>
      </>
    )
  } else if (currentParty !== null && currentMember === null){
    mainPageContent=(
      <>
        <PartyNameDisplay/>
        <LoadItems/>
        <ItemFormModal/>
      </>
    )
  } else if (currentParty !== null && currentMember !== null){
    mainPageContent=(
      <>
        <MemberNameDisplay/>
        <LoadItems/>
        <ItemFormModal/>
      </>
    )
  }

  // The sidebar here is used to navigate between members and parties.
    return (
            <>
              <div id='main-page'>
                <div id='side-container'>
                    <SideBar id="main-sidebar"/>
                </div>
                <div id="divider-bar"></div>
                <div id='main-container'>
                  {mainPageContent}
                </div>
              </div>
            </>
    )
}

export default MainPage
