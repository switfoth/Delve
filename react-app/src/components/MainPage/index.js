import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./mainpage.css";
import SideBar from "../SideBar";
import ItemFormModal from "../Item_Modal";
import ItemDisplayModal from "../Item_Display_Modal/";

const MainPage = ()=>{
  const currentParty = useSelector(state => state.party.currentParty)
  const currentMember = useSelector(state => state.member.currentMember)
  const items = useSelector(state => state.item.itemList)

  const dispatch = useDispatch();

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
        <LoadItems/>
        <ItemFormModal/>
      </>
    )
  } else if (currentParty !== null && currentMember !== null){
    mainPageContent=(
      <>
        <LoadItems/>
        <ItemFormModal/>
      </>
    )
  }


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
