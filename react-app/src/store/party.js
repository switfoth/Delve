const SET_PARTIES = 'party/setParties'
const ADD_PARTY = 'party/addParty'
const DELETE_PARTY = 'party/deleteParty'
const SELECT_PARTY = 'party/selectParty'
const UPDATE_PARTY = 'party/updateParty'

const setParties = (parties) => ({
    type: SET_PARTIES,
    payload: parties
});

const addParty = (party) => ({
    type: ADD_PARTY,
    payload: party
});

const deleteParty = (id) => ({
    type: DELETE_PARTY,
    payload: id
});

const selectParty = (id) => ({
    type: SELECT_PARTY,
    payload: id
})

const updateParty = (party) => ({
    type: UPDATE_PARTY,
    payload: {party}
})

export const getUserParties = (id) => async (dispatch) => {
    const res = await fetch(`/api/party/user/${id}`)
    const data = await res.json();
    dispatch(setParties(data.parties))
}

export const addSingleParty = (newParty) => async (dispatch) => {
    const res = await fetch(`/api/party/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newParty)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addParty(data))
    }
}

export const editSingleParty = (partyToUpdate) => async (dispatch) => {
    const res = await fetch(`/api/party/update/${partyToUpdate.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partyToUpdate)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(updateParty(data))
    }
}

export const deleteSingleParty = (partyToDelete, user_id) => async (dispatch) => {
    await fetch(`/api/party/delete/${partyToDelete}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    dispatch(deleteParty(partyToDelete))
    dispatch(getUserParties(user_id))
}

export const selectCurrentParty = (id) => async (dispatch) => {
    dispatch(selectParty(id))
}

export const deselectParty = () => async (dispatch) => {
    dispatch(selectParty(null))
}

const initialstate = { partyList: [], currentParty: null}

function reducer (state = initialstate, action) {
    let newState;
    switch (action.type) {
        case SET_PARTIES:
            newState = Object.assign({}, state, { partyList: action.payload });
            return newState;
        case ADD_PARTY:
            newState = Object.assign({}, state);
            newState.partyList = [...newState.partyList, action.payload]
            return newState;
        case UPDATE_PARTY:
            newState = Object.assign({}, state);
            const updatedList = newState.partyList.map( party => {
                if (party.id === action.payload.party.id){
                    return action.payload.party
                } else {
                return party
                }
            })
            newState.partyList = updatedList.filter(party =>{
                return (!!party)
            })
            return newState
        case DELETE_PARTY:
            newState = Object.assign({}, state);
            newState.partyList = newState.partyList.filter(party => {
                return party.id !== party.payload
            })
            return newState;
        case SELECT_PARTY:
            newState = Object.assign({}, state);
            newState.currentParty = action.payload
            return newState
        default:
            return state;

    }
}

export default reducer
