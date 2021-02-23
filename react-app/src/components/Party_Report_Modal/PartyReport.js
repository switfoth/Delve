import React from 'react';
import { useSelector } from 'react-redux';
import './party-report.css';

function PartyReport() {
    const currentParty = useSelector(state => state.party.currentParty)
    const selectedParty = useSelector(state => state.party.partyList.find(ele => ele.id === currentParty))
    const partyMembers = useSelector(state => state.member.memberList.map(member => member.party_id === currentParty))
    const partyItems = useSelector(state => state.item.itemList.map(item => item.party_id === currentParty))



    function partyMemberMaterialWeath(partyMember) {
        // Find member in partyMembers, use a function that finds
        // the value of their material wealth by adding items together and
        // displaying it.
        let plat = 0
        let gold = 0
        let silv = 0
        let copp = 0
        let memberItems = partyItems.map( item => {return item.member_id === partyMember.id} )
        memberItems.forEach(item => {
            plat+= parseInt(item.platinum_value)
            gold+= parseInt(item.gold_value)
            silv+= parseInt(item.silver_value)
            copp+= parseInt(item.copper_value)
        })
        return {plat, gold, silv, copp}
    }

    const MaterialWealthFinder = () => {
        // Find all items in partyItems that do not have a member associated
        // and add all the different currency types together, then return result
        // in order to supply this info to the appropriate div.
        let plat = 0
        let gold = 0
        let silv = 0
        let copp = 0
        let addItems = partyItems.map( item => {return item.party_id === currentParty && item.member_id === null} )
        addItems.forEach(item => {
            plat+= parseInt(item.platinum_value)
            gold+= parseInt(item.gold_value)
            silv+= parseInt(item.silver_value)
            copp+= parseInt(item.copper_value)
        })
        return <div>Plat: {plat} Gold: {gold} Silver: {silv} Copper: {copp}</div>
    }

    const PartyMemberWealthDisplay = () => {
        // A forEach that displays each party member and their liquid wealth
        // as well as the result from the partyMemberMaterialWealth function.
         return partyMembers.forEach(member => {
            let matWealth = partyMemberMaterialWeath(member)
            return <div key={member.id} className="member-wealth-row">
                <div>
                    <div id="member-wealth-liq-row">
                        Liquid Wealth - P: {member.platinum} G: {member.gold} S: {member.silver} C: {member.copper}
                    </div>
                    <div id="member-wealth-mat-row">
                        Material Wealth - P: {matWealth.plat} G: {matWealth.gold} S: {matWealth.silv} C: {matWealth.copp}
                    </div>
                </div>
                <div id="member-wealth-total">
                    Total Wealth -
                    <div>Platinum: { parseInt(member.platinum) + parseInt(matWealth.plat) }</div>
                    <div>Gold: { parseInt(member.gold) + parseInt(matWealth.gold) }</div>
                    <div>Silver: { parseInt(member.silver) + parseInt(matWealth.silv) }</div>
                    <div>Copper: { parseInt(member.copper) + parseInt(matWealth.copp) }</div>
                </div>
            </div>
        })
    }

    // const AverageWealthPerPartyMember = () => {
        // Take the party total wealth and divide it by the number of
        // party members + 1: the extra 1 is the party loot.
        // Maybe have a hover-over descriptor explaining this.
    // }

return (
    <>
        <div className="party-report">
            <div>
                <h1>Report for {selectedParty.name}:</h1>
            </div>
            <PartyMemberWealthDisplay id="party-report-members"/>
            <div id="party-report-liquid-wealth"></div>
            <MaterialWealthFinder id="party-report-material-wealth"/>
            <div id="party-report-total-wealth"></div>
            {/* <AverageWealthPerPartyMember id="party-report-average-wealth"/> */}
        </div>
    </>
)
}

export default PartyReport
