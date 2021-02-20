import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editSingleMember } from "../../store/member";

function AddMemberMoney() {
    const currentMember = useSelector(state => state.member.currentMember)
    const selectedMember = useSelector(state => state.member.memberList.find(ele => ele.id === currentMember))
    const dispatch = useDispatch()

    const [id, setId] = useState(selectedMember.id)
    const [platinum, setPlatinum] = useState(0);
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [copper, setCopper] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            editSingleMember({
                id,
                platinum,
                gold,
                silver,
                copper
            })
        )
    }

    return (
        <div className="add-member-fund-display">
            <h1> Add Funds </h1>
            <form className="add-member-fund-form" onSubmit={handleSubmit}>
                <div id="member-add-plat-row">
                    <input
                        placeholder="Platinum"
                        type="number"
                        value={platinum}
                        onChange={(e) => setPlatinum((e.target.value)+selectedMember.platinum)}
                    />
                </div>
                <div id="member-add-gold-row">
                    <input
                        placeholder="Gold"
                        type="number"
                        value={gold}
                        onChange={(e) => setGold((e.target.value)+selectedMember.gold)}
                    />
                </div>
                <div id="member-add-silver-row">
                    <input
                        placeholder="Silver"
                        type="number"
                        value={silver}
                        onChange={(e) => setSilver((e.target.value)+selectedMember.silver)}
                    />
                </div>
                <div id="member-add-copper-row">
                    <input
                        placeholder="Copper"
                        type="number"
                        value={copper}
                        onChange={(e) => setCopper((e.target.value)+selectedMember.copper)}
                    />
                </div>
                <div>
                    <button id="add-member-fund-confirm" type="submit">CONFIRM</button>
                </div>
            </form>
        </div>
    )
}

export default AddMemberMoney;
