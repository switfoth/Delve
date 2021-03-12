import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getUserParties, selectCurrentParty, deselectParty } from '../../store/party';
import { getPartyMembers, selectCurrentMember, deselectMember} from '../../store/member';
import { getPartyItems, getMemberItems, clearItems } from "../../store/item";
import { getItemTypes } from "../../store/itemtype"
import PartyFormModal from '../Party_Creation_Modal/index';
import PartyDeleteModal from '../Party_Delete_Modal/index'
import MemberFormModal from '../Member_Creation_Modal/index';
import MemberDeleteModal from '../Member_Delete_Modal/index';
import PartyReportModal from '../Party_Report_Modal/index';
import "./sidebar.css";

const SideBar = ()=>{
    const sessionUser = useSelector(state => state.session.user);
    const parties = useSelector(state => state.party.partyList);
    const members = useSelector(state => state.member.memberList)
    const currentParty = useSelector(state => state.party.currentParty)
    const currentMember = useSelector(state => state.member.currentMember)
    const dispatch = useDispatch();

    const [sideNav, setSideNav] = useState('closed')

    useEffect(()=> {
        dispatch(getUserParties(sessionUser.id));
        dispatch(getItemTypes())
    }, [dispatch, sessionUser.id])

    function handleSideNav(){
        if(sideNav === 'closed'){
          sidebar.style.width = "60vh"
          setSideNav('open')
        } else {
          sidebar.style.width = "0vh"
          setSideNav('closed')
        }
      }

    const LoadParties = () =>{
        return parties.map( party=> {
            return (
                <>
                    <div key={party.id} className="party-block delve-button" onClick={() => {
                        dispatch(selectCurrentParty(party.id));
                        dispatch(getPartyMembers(party.id))
                        dispatch(getPartyItems(party.id))
                    }}>{party.name}</div>
                </>
            )
        });
    }

    const PartyBackButton = () =>{
        return (
            <div className="party-block delve-button" onClick={()=>{
                dispatch(deselectParty())
                dispatch(clearItems())
            }}>Back to Main Menu</div>
        )
    }


    const LoadMembers = () =>{
            return members.map( member=> {
                return (
                    <div key={member.id} className="member-block delve-button" onClick={() => {
                        dispatch(selectCurrentMember(member.id));
                        dispatch(getMemberItems(member.id))
                    }}>{member.name}</div>
                )
            });
    }

    const MemberBackButton = () =>{
        return (
            <div className="party-block delve-button" onClick={()=>{
                dispatch(deselectMember())
                dispatch(getPartyItems(currentParty))
            }}>Back to Party Ledger</div>
        )
    }

    let sideBarContent;
    if (currentParty === null){
        sideBarContent =(
            <>
                <LoadParties className="sidebar-delve-button"/>
                <PartyFormModal className="sidebar-delve-button"/>
            </>
        );
    } else if (currentParty !== null && currentMember === null){
        sideBarContent = (
            <>
                <PartyBackButton className="sidebar-delve-button"/>
                <LoadMembers className="sidebar-delve-button"/>
                <MemberFormModal className="sidebar-delve-button" id="add-member-sidebar"/>
                <PartyReportModal className="sidebar-delve-button" id="party-report-sidebar"/>
                <PartyDeleteModal className="sidebar-delve-button" id="party-delete-sidebar"/>
            </>
        );
    } else if (currentParty !== null && currentMember !== null){
        sideBarContent = (
            <>
                <MemberBackButton className="sidebar-delve-button"/>
                <MemberDeleteModal className="sidebar-delve-button"/>
            </>
        )
    }

    return (
        <>
            <div id="mobile-sidebar-button" onClick={handleSideNav()}>&#9776;</div>
            <div id='sidebar'>
                {sideBarContent}
            </div>
        </>
    )
}

export default SideBar
