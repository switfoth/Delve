import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./mainpage.css";
import SideBar from "../SideBar";
import ItemFormModal from "../Item_Modal";
import ItemDisplayModal from "../Item_Display_Modal/index";

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
            <div>{item.name}</div>
            <div>Platinum: {item.platinum_value}</div>
            <div>Gold:  {item.gold_value}</div>
            <div>Silver:  {item.silver_value}</div>
            <div>Copper:  {item.copper_value}</div>
            <div><ItemDisplayModal/></div>
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
                <div id='main-container'>
                  {mainPageContent}
                </div>
              </div>
            </>
    )
}

export default MainPage
