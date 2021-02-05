import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getUserParties, selectCurrentParty, deselectParty } from '../../store/party';
import { getPartyMembers, selectCurrentMember, deselectMember} from '../../store/member';
import PartyFormModal from '../Party_Creation_Modal/index';
import MemberFormModal from '../Member_Creation_Modal/index';
import "./sidebar.css";

const SideBar = ()=>{
    const sessionUser = useSelector(state => state.session.user);
    const parties = useSelector(state => state.party.partyList);
    const currentParty = useSelector(state => state.party.currentParty)
    const currentMember = useSelector(state => state.member.currentMember)
    const dispatch = useDispatch();
    let members;

    useEffect(()=> {
        dispatch(getUserParties(sessionUser.id))
    }, [dispatch])

    const LoadParties = () =>{
        return parties.map( party=> {
            return (
                <>
                    <div key={party.id} className="party-block" onClick={() => {
                        dispatch(selectCurrentParty(party.id));
                        members = dispatch(getPartyMembers(party.id))
                    }}>{party.name}</div>
                </>
            )
        });
    }

    const PartyBackButton = () =>{
        return (
            <div className="party-block" onClick={()=>{
                dispatch(deselectParty())
            }}>Back to Party List</div>
        )
    }


    const LoadMembers = () =>{
        if (members){
            return members.map( member=> {
                return (
                    <div key={member.id} classname="member-block" onClick={() => {
                        dispatch(selectCurrentMember(member.id));
                    }}>{member.name}</div>
                )
            });
        } else {
            return null
        }
    }

    const MemberBackButton = () =>{
        return (
            <div className="party-block" onClick={()=>{
                dispatch(deselectMember())
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
    } else if (currentParty !== null){
        sideBarContent = (
            <>
                <PartyBackButton/>
                <LoadMembers/>
                <MemberFormModal/>
            </>
        );
    } else if (currentParty && currentMember !== null){
        sideBarContent = (
            <>
                <MemberBackButton/>
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
