import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editSingleParty } from "../../store/party";

function SubPartyMoney() {
    const currentParty = useSelector(state => state.party.currentParty)
    const selectedParty = useSelector(state => state.party.partyList.find(ele => ele.id === parseInt(currentParty)))
    const dispatch = useDispatch();
    const name = selectedParty.name

    const [platinum, setPlatinum] = useState(0);
    const [gold, setGold] = useState(0);
    const [silver, setSilver] = useState(0);
    const [copper, setCopper] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        let partyToSend = {
            id: currentParty,
            name: name,
            platinum: parseInt(selectedParty.platinum)-parseInt(platinum),
            gold: parseInt(selectedParty.gold)-parseInt(gold),
            silver: parseInt(selectedParty.silver)-parseInt(silver),
            copper: parseInt(selectedParty.copper)-parseInt(copper)
        }
        dispatch(
            editSingleParty(partyToSend)
        )
    }

    return (
        <div className="sub-party-fund-display">
            <h1> Withdraw Funds </h1>
            <form className="sub-party-fund-form" onSubmit={handleSubmit}>
                <div id="party-sub-plat-row">
                    <h3>Platinum</h3>
                    <input
                        placeholder="Platinum"
                        type="number"
                        value={platinum}
                        onChange={(e) => setPlatinum((e.target.value))}
                        required
                    />
                </div>
                <div id="party-sub-gold-row">
                    <h3>Gold</h3>
                    <input
                        placeholder="Gold"
                        type="number"
                        value={gold}
                        onChange={(e) => setGold((e.target.value))}
                        required
                    />
                </div>
                <div id="party-sub-silver-row">
                    <h3>Silver</h3>
                    <input
                        placeholder="Silver"
                        type="number"
                        value={silver}
                        onChange={(e) => setSilver((e.target.value))}
                        required
                    />
                </div>
                <div id="party-sub-copper-row">
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
                    <button id="sub-party-fund-confirm" type="submit">CONFIRM</button>
                </div>
            </form>
        </div>
    )
}

export default SubPartyMoney;
