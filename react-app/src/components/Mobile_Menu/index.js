import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getUserParties, selectCurrentParty, deselectParty } from '../../store/party';
import { getPartyMembers, selectCurrentMember, deselectMember} from '../../store/member';
import { getPartyItems, getMemberItems, clearItems } from "../../store/item";
import { getItemTypes } from "../../store/itemtype"
import './mobile-menu.css'


function MobileMenu() {
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

    return(
        <>
        </>
    );
}

export default MobileMenu;
