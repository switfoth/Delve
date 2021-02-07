import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./mainpage.css";
import SideBar from "../SideBar";
import * as partyActions from "../../store/party"
import * as memberActions from "../../store/member"
import * as itemActions from "../../store/item"
import ItemFormModal from "../Item_Modal";

const MainPage = ()=>{
  const sessionUser = useSelector(state => state.session.user);
  const currentParty = useSelector(state => state.party.currentParty)
  const currentMember = useSelector(state => state.member.currentMember)
  const items = useSelector(state => state.item.itemList)

  const dispatch = useDispatch();

  const LoadItems = () =>{
    return items.map( item=>{
      return (
        <>
          <div key={item.id} className="item-row">{item.name}</div>
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
