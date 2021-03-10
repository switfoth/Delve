import React, { useState } from "react";
import { useSelector } from 'react-redux';
import "./mainpage.css";
import SideBar from '../SideBar/index'
import MobileMenu from '../Mobile_Menu/index'
import ItemFormModal from "../Item_Modal";
import ItemDisplayModal from "../Item_Display_Modal/";
import MemberAddMoneyModal from "../Add_Member_Funds_Modal";
import MemberSubMoneyModal from "../Sub_Member_Funds_Modal";
import PartyAddMoneyModal from "../Add_Party_Funds_Modal";
import PartySubMoneyModal from "../Sub_Party_Funds_Modal";


// Main Page displays select information based on whether a party or member has been selected.
const MainPage = ()=>{
  const currentParty = useSelector(state => state.party.currentParty)
  const parties = useSelector(state => state.party.partyList)
  const currentMember = useSelector(state => state.member.currentMember)
  const members = useSelector(state => state.member.memberList)
  const items = useSelector(state => state.item.itemList)

  const [leftConWidth, setLeftConWidth] = useState({width: '0'});
  const [rightConWidth, setRightConWidth] = useState({width: '500'});
  console.log(leftConWidth, rightConWidth)

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
    let partyName = (!parties) ? null : parties.find(party => {
      return party.id === currentParty})
    return <div><h1>{`Ledger for ${partyName.name}:`}</h1></div>
  }

  const PartyLootLiquidWealth = () => {
    let partyLoot = (!parties) ? null : parties.find(party => {
      return party.id === currentParty})
     return(
     <>
      <div id="party-loot-liquid-wealth-row">
        <div id="party-loot-numbers">
          <div id="party-loot-name">Total Liquid Wealth:</div>
          <div id="party-loot-platinum">{`Platinum: ${partyLoot.platinum}`}</div>
          <div id="party-loot-gold">{`Gold: ${partyLoot.gold}`}</div>
          <div id="party-loot-silver">{`Silver: ${partyLoot.silver}`}</div>
          <div id="party-loot-copper">{`Copper: ${partyLoot.copper}`}</div>
        </div>
        <div className="row-break"></div>
        <div className="deposit-and-withdraw">
          <PartySubMoneyModal/>
          <PartyAddMoneyModal/>
        </div>
      </div>
     </>
     )
  }

  const MemberLootLiquidWealth = () => {
    let memberLoot = (!members) ? null : members.find(member => {
      return member.id === parseInt(currentMember)})
      return(
        <>
          <div id="member-loot-liquid-wealth-row">
            <div id="member-loot-numbers">
              <div id="member-loot-name">Total Liquid Wealth:</div>
              <div id="member-loot-platinum">{`Platinum: ${memberLoot.platinum}`}</div>
              <div id="member-loot-gold">{`Gold: ${memberLoot.gold}`}</div>
              <div id="member-loot-silver">{`Silver: ${memberLoot.silver}`}</div>
              <div id="member-loot-copper">{`Copper: ${memberLoot.copper}`}</div>
            </div>
            <div className="row-break"></div>
            <div className="deposit-and-withdraw">
              <MemberSubMoneyModal/>
              <MemberAddMoneyModal/>
            </div>
          </div>
        </>
        )
  }

  const MemberNameDisplay = () =>{
    let memberName = (!members) ? null : members.find(member => {
      return member.id === parseInt(currentMember)})
    return <div><h1>{`Loot claimed by ${memberName.name}:`}</h1></div>
  }

  // Variable handles what is displayed when part is chosen but not a member, or member is
  // chosen - if member is chosen, it only displays member items. With no member selected
  // it displays unclaimed party loot.
  let mainPageContent;
  if (currentParty === null){
    mainPageContent=(
      <>
        <div id="choose-party"><h2>Which party is this regarding?</h2></div>
        <transition name="bookkeeper slide">
          <img id="bookkeeper" src="https://i.imgur.com/1gO3YtI.png" alt="Kobold Bookkeeper"></img>
        </transition>
      </>
    )
  } else if (currentParty !== null && currentMember === null){
    mainPageContent=(
      <>
        <PartyNameDisplay/>
        <LoadItems/>
        <ItemFormModal/>
        <PartyLootLiquidWealth/>
      </>
    )
  } else if (currentParty !== null && currentMember !== null){
    mainPageContent=(
      <>
        <MemberNameDisplay/>
        <LoadItems/>
        <ItemFormModal/>
        <MemberLootLiquidWealth/>
      </>
    )
  }

  // The sidebar here is used to navigate between members and parties.
    return (
            <>
              <div id='main-page'>
                <div id='side-container' style={leftConWidth}>
                    <SideBar id="main-sidebar"/>
                </div>
                <div id="divider-bar"></div>
                <div id='main-container' style={rightConWidth}>
                  <div id="mobile-sidebar-button" onClick={()=>{
                    if(leftConWidth.width === '0' ){
                      setLeftConWidth({width: '60%'})
                      setRightConWidth({width: '40%'})
                    } else {
                      setLeftConWidth({width: '0'})
                      setRightConWidth({width: '100%'})
                    }
                  }} style={{backgroundColor: 'red', width: '100px', height: '100px'}}></div>
                  {mainPageContent}
                </div>
              </div>
            </>
    )
}

export default MainPage
