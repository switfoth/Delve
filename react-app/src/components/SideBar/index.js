import React, { useEffect } from "react";
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

    useEffect(()=> {
        dispatch(getUserParties(sessionUser.id));
        dispatch(getItemTypes())
    }, [dispatch, sessionUser.id])

    const LoadParties = () =>{
        return parties.map( party=> {
            return (
                <>
                    <div key={party.id} className="party-block" onClick={() => {
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
            <div className="party-block" onClick={()=>{
                dispatch(deselectParty())
                dispatch(clearItems())
            }}>Back to Party List</div>
        )
    }


    const LoadMembers = () =>{
            return members.map( member=> {
                return (
                    <div key={member.id} className="member-block" onClick={() => {
                        dispatch(selectCurrentMember(member.id));
                        dispatch(getMemberItems(member.id))
                    }}>{member.name}</div>
                )
            });
    }

    const MemberBackButton = () =>{
        return (
            <div className="party-block" onClick={()=>{
                dispatch(deselectMember())
                dispatch(getPartyItems(currentParty))
            }}>Back to Member List</div>
        )
    }

    let sideBarContent;
    if (currentParty === null){
        sideBarContent =(
            <>
                <LoadParties/>
                <PartyFormModal/>
            </>
        );
    } else if (currentParty !== null && currentMember === null){
        sideBarContent = (
            <>
                <PartyBackButton/>
                <LoadMembers/>
                <MemberFormModal/>
                <PartyReportModal/>
                <PartyDeleteModal/>
            </>
        );
    } else if (currentParty !== null && currentMember !== null){
        sideBarContent = (
            <>
                <MemberBackButton/>
                <MemberDeleteModal/>
            </>
        )
    }

    return (
            <div id='sidebar'>
                {sideBarContent}
            </div>
    )
}

export default SideBar
