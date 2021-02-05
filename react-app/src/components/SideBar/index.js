import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getUserParties } from '../../store/party';
import "./sidebar.css";

let currentParty = null
const SideBar = ()=>{
    const sessionUser = useSelector(state => state.session.user);
    const parties = useSelector(state => state.party.partyList);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getUserParties(sessionUser.id))
    }, [dispatch])

    const loadParties =
        parties.map( party=> {
            return (
                <div key={party.id} className="party-block" onClick={()=> currentParty = party.id}>{party.name}</div>
            )
        });
    return (
            <div id='sidebar'>
                <h1>Parties</h1>
                    {loadParties}
            </div>
    )
}

export default SideBar
