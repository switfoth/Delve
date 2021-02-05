import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getUserParties, selectCurrentParty } from '../../store/party';
import { getPartyMembers } from '../../store/member';
import "./sidebar.css";

const SideBar = ()=>{
    const sessionUser = useSelector(state => state.session.user);
    const parties = useSelector(state => state.party.partyList);
    const currentParty = useSelector(state => state.party.currentParty)
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

    const LoadMembers = () =>{
        if (members){
            return members.map( member=> {
                return (
                    <div key={member.id} classname="member-block">{member.name}</div>
                )
            });
        } else {
            return null
        }
    }

    let sideBarContent;
    if (currentParty === null){
        sideBarContent =(
        <LoadParties/>
        );
    } else if (currentParty !== null){
        sideBarContent = (
        <LoadMembers/>
        );
    }

    return (
            <div id='sidebar'>
                {sideBarContent}
            </div>
    )
}

export default SideBar
