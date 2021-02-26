import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editSingleMember } from "../../store/member";

function SubMemberMoney() {
    const currentMember = useSelector(state => state.member.currentMember)
    const selectedMember = useSelector(state => state.member.memberList.find(ele => ele.id === parseInt(currentMember)))
    const dispatch = useDispatch()

    const [platinum, setPlatinum] = useState(0);
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [copper, setCopper] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        let memberToSend = {
            id: currentMember,
            platinum: parseInt(selectedMember.platinum)-parseInt(platinum),
            gold: parseInt(selectedMember.gold)-parseInt(gold),
            silver: parseInt(selectedMember.silver)-parseInt(silver),
            copper: parseInt(selectedMember.copper)-parseInt(copper)
        }
        dispatch(
            editSingleMember(memberToSend)
        )
    }

    return (
        <div className="sub-member-fund-display">
            <h1> Withdraw Funds </h1>
            <form className="sub-member-fund-form" onSubmit={handleSubmit}>
                <div id="member-sub-plat-row">
                    <h3>Platinum</h3>
                    <input
                        placeholder="Platinum"
                        type="number"
                        value={platinum}
                        onChange={(e) => setPlatinum((e.target.value))}
                        required
                    />
                </div>
                <div id="member-sub-gold-row">
                    <h3>Gold</h3>
                    <input
                        placeholder="Gold"
                        type="number"
                        value={gold}
                        onChange={(e) => setGold((e.target.value))}
                        required
                    />
                </div>
                <div id="member-sub-silver-row">
                    <h3>Silver</h3>
                    <input
                        placeholder="Silver"
                        type="number"
                        value={silver}
                        onChange={(e) => setSilver((e.target.value))}
                        required
                    />
                </div>
                <div id="member-sub-copper-row">
                    <h3>Copper</h3>
                    <input
                        placeholder="Copper"
                        type="number"
                        value={copper}
                        onChange={(e) => setCopper((e.target.value))}
                        required
                    />
                </div>
                <div>
                    <button id="sub-member-fund-confirm" type="submit">CONFIRM</button>
                </div>
            </form>
        </div>
    )
}

export default SubMemberMoney;
