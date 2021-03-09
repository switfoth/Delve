import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getUserParties, selectCurrentParty, deselectParty } from '../../store/party';
import { getPartyMembers, selectCurrentMember, deselectMember} from '../../store/member';
import { getPartyItems, getMemberItems, clearItems } from "../../store/item";
import { getItemTypes } from "../../store/itemtype"
import { logout } from "../../store/session"
import PartyFormModal from '../Party_Creation_Modal/index';
import ProfileFormModal from '../Profile_Modal/index'
import PartyDeleteModal from '../Party_Delete_Modal/index'
import MemberFormModal from '../Member_Creation_Modal/index';
import MemberDeleteModal from '../Member_Delete_Modal/index';
import PartyReportModal from '../Party_Report_Modal/index';
import './mobile-menu.css'


function MobileMenu() {
    const sessionUser = useSelector(state => state.session.user);
    const parties = useSelector(state => state.party.partyList);
    const members = useSelector(state => state.member.memberList)
    const currentParty = useSelector(state => state.party.currentParty)
    const currentMember = useSelector(state => state.member.currentMember)
    const dispatch = useDispatch();

    const [menuPos, setMenuPos] = useState("width: 0px");

    useEffect(()=> {
        if (sessionUser){
            dispatch(getUserParties(sessionUser.id));
            dispatch(getItemTypes())
        } else {
            return null
        }
    })

    // Might need to put this next line in this useEffect in the future ^^^
    // , [dispatch, sessionUser.id]

    let mobileSidebarContent;

    if (!sessionUser) {
        return null
    } else {


        const LoadParties = () =>{
            return parties.map( party=> {
                return (
                    <>
                        <div key={party.id} className="mobile-party-block mobile-delve-button" onClick={() => {
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
                <div className="mobile-party-block mobile-delve-button" onClick={()=>{
                    dispatch(deselectParty())
                    dispatch(clearItems())
                }}>Back to Main</div>
            )
        }


        const LoadMembers = () =>{
                return members.map( member=> {
                    return (
                        <div key={member.id} className="mobile-member-block mobile-delve-button" onClick={() => {
                            dispatch(selectCurrentMember(member.id));
                            dispatch(getMemberItems(member.id))
                        }}>{member.name}</div>
                    )
                });
        }

        const MemberBackButton = () =>{
            return (
                <div className="mobile-party-block mobile-delve-button" onClick={()=>{
                    dispatch(deselectMember())
                    dispatch(getPartyItems(currentParty))
                }}>Back to Party</div>
            )
        }

        if (currentParty === null){
            mobileSidebarContent =(
                <>
                    <LoadParties/>
                    <PartyFormModal/>
                </>
            );
        } else if (currentParty !== null && currentMember === null){
            mobileSidebarContent = (
                <>
                    <PartyBackButton/>
                    <LoadMembers/>
                    <MemberFormModal id="mobile-add-member-sidebar"/>
                    <PartyReportModal id="mobile-party-report-sidebar"/>
                    <PartyDeleteModal id="mobile-party-delete-sidebar"/>
                </>
            );
        } else if (currentParty !== null && currentMember !== null){
            mobileSidebarContent = (
                <>
                    <MemberBackButton/>
                    <MemberDeleteModal/>
                </>
            )
        }

    }


    return(
        <div className="openbtn" onClick={setMenuPos("width: 50%")}>
            <div className="sidenav" style={menuPos}>
                <a href="javascript:void(0)" class="closebtn" onClick={setMenuPos("width: 0px")}>X</a>
                <div id='mobile-sidebar'>
                    {mobileSidebarContent}
                </div>
                <div id='mobile-sidebar-bottom'>
                    <ProfileFormModal user={sessionUser}/>
                    <div id="logout-button" className="delve-button" onClick={()=>{dispatch(logout())}}>LOG OUT</div>
                </div>
            </div>
        </div>

    );
}

export default MobileMenu;
