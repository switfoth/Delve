import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getUserParties } from '../../store/party';
import "./sidebar.css";

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
                <div key={party.id} className="partyBlock">{party.name}</div>
            )
        });
    return (
            <div id='sidebar'>
                <h1>Side Bar</h1>
                    {loadParties}
            </div>
    )
}

export default SideBar
