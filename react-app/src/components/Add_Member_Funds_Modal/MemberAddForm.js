import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editSingleMember } from "../../store/member";

function AddMemberMoney() {
    const currentMember = useSelector(state => state.member.currentMember)
    const selectedMember = useSelector(state => state.member.memberList.find(ele => ele.id === currentMember))
    const dispatch = useDispatch()

    const [id, setId] = useState(selectedMember.id)
    const [platinum, setPlatinum] = useState("");
    const [gold, setGold] = useState("");
    const [silver, setSilver] = useState("");
    const [copper, setCopper] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let memberToSend = {
            id: currentMember,
            platinum: parseInt(platinum)+parseInt(selectedMember.platinum),
            gold: parseInt(gold)+parseInt(selectedMember.gold),
            silver: parseInt(silver)+parseInt(selectedMember.silver),
            copper: parseInt(copper)+parseInt(selectedMember.copper)
        }
        dispatch(
            editSingleMember(memberToSend)
        )
    }

    return (
        <div className="add-member-fund-display">
            <h1> Add Funds </h1>
            <form className="add-member-fund-form" onSubmit={handleSubmit}>
                <div id="member-add-plat-row">
                    <h3>Platinum</h3>
                    <input
                        placeholder="Platinum"
                        type="number"
                        value={platinum}
                        onChange={(e) => setPlatinum((e.target.value))}
                    />
                </div>
                <div id="member-add-gold-row">
                    <h3>Gold</h3>
                    <input
                        placeholder="Gold"
                        type="number"
                        value={gold}
                        onChange={(e) => setGold((e.target.value))}
                    />
                </div>
                <div id="member-add-silver-row">
                    <h3>Silver</h3>
                    <input
                        placeholder="Silver"
                        type="number"
                        value={silver}
                        onChange={(e) => setSilver((e.target.value))}
                    />
                </div>
                <div id="member-add-copper-row">
                    <h3>Copper</h3>
                    <input
                        placeholder="Copper"
                        type="number"
                        value={copper}
                        onChange={(e) => setCopper((e.target.value))}
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
