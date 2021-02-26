import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPartyItems } from '../../store/item';
import './party-report.css';

function PartyReport() {
    const currentParty = useSelector(state => state.party.currentParty)
    const selectedParty = useSelector(state => state.party.partyList.find(ele => ele.id === parseInt(currentParty)))
    const partyMembers = useSelector(state => state.member.memberList.filter(member => member.party_id === parseInt(currentParty)))
    const partyItems = useSelector(state => state.item.itemList.filter(item => item.party_id === parseInt(currentParty)))

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPartyItems(selectedParty.id))
    }, [dispatch, selectedParty.id]);

    function partyMemberMaterialWeath(partyMember) {
        // Find member in partyMembers, use a function that finds
        // the value of their material wealth by adding items together and
        // displaying it.
        let plat = 0
        let gold = 0
        let silv = 0
        let copp = 0
        let memberItems = partyItems.filter( item => {return item.member_id === partyMember.id} )
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
        let addItems = partyItems.filter( item => {return item.party_id === currentParty && item.member_id === null} )
        addItems.forEach(item => {
            plat+= parseInt(item.platinum_value)
            gold+= parseInt(item.gold_value)
            silv+= parseInt(item.silver_value)
            copp+= parseInt(item.copper_value)
        })
        return (
            <>
                <div>
                    <div id="party-report-material-wealth"><h2>Party Material Wealth:</h2></div>
                    <div>Plat: {plat} Gold: {gold} Silver: {silv} Copper: {copp}</div>
                </div>
                <div>
                    <div id="party-report-liquid-wealth"><h2>Party Liquid Wealth:</h2></div>
                    <div>Plat: {selectedParty.platinum} Gold: {selectedParty.gold} Silver: {selectedParty.silver} Copper: {selectedParty.copper}</div>
                </div>

            </>
        )
    }

    const PartyMemberWealthDisplay = () => {
        // A forEach that displays each party member and their liquid wealth
        // as well as the result from the partyMemberMaterialWealth function.
         return partyMembers.map(member => {
            let matWealth = partyMemberMaterialWeath(member)
            return <div key={member.id} className="member-wealth-row">
                <div>
                    <div><h3>{member.name}</h3></div>
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

    function totalPartyAndMemberWealthCalculator(sParty, pMembers, pItems){
        let plat = 0
        let gold = 0
        let silv = 0
        let copp = 0
        let addItems = pItems.filter( item => {return item.party_id} )
        let addLiquid = pMembers.filter( member => {return member.party_id} )
        addItems.forEach(item => {
            plat+= parseInt(item.platinum_value)
            gold+= parseInt(item.gold_value)
            silv+= parseInt(item.silver_value)
            copp+= parseInt(item.copper_value)
        })
        addLiquid.forEach(member => {
            plat+= parseInt(member.platinum)
            gold+= parseInt(member.gold)
            silv+= parseInt(member.silver)
            copp+= parseInt(member.copper)
        })
        return {plat: (plat + sParty.platinum), gold: (gold + sParty.gold), silv: (silv + sParty.silver), copp: (copp + sParty.copper)}


    }

    const AverageWealthPerPartyMember = () => {
        // Take the party total wealth and divide it by the number of
        // party members + 1: the extra 1 is the party loot.
        // Maybe have a hover-over descriptor explaining this.
        let partySums = totalPartyAndMemberWealthCalculator(selectedParty, partyMembers, partyItems)
        let divider = partyMembers.length + 1
        function fundDivider(sums, divide){
            let result = {}
            result.plat = Math.floor(sums.plat / divide)
            result.gold = Math.floor(sums.gold / divide)
            result.silv = Math.floor(sums.silv / divide)
            result.copp = Math.floor(sums.copp / divide)
            return result
        }
        let partyAverage = fundDivider(partySums, divider)
        return (
            <>
                <div id="party-report-party-worth"><h2>Party Overall Worth:</h2>
                    <div>Plat: {partySums.plat}</div>
                    <div>Gold: {partySums.gold}</div>
                    <div>Silver: {partySums.silv}</div>
                    <div>Copper: {partySums.copp}</div>
                </div>
                <div id="average-wealth-per-party-member"><h2>Target Average:</h2>
                    <div>Plat: {partyAverage.plat}</div>
                    <div>Gold: {partyAverage.gold}</div>
                    <div>Silver: {partyAverage.silv}</div>
                    <div>Copper: {partyAverage.copp}</div>
                </div>
            </>
        )
    }

    return (
        <div>
            <h1 id="report-title">Report for {selectedParty.name}:</h1>
                <div id="party-report">
                    <div>
                    </div>
                    <div className="report-section">
                        <PartyMemberWealthDisplay/>
                    </div>
                    <div className="report-section">
                        <MaterialWealthFinder/>
                        <AverageWealthPerPartyMember/>
                    </div>
                </div>
        </div>
)
}

export default PartyReport
