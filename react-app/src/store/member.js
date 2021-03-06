import { getPartyItems } from "./item";
import currentParty from "./party";

const SET_MEMBERS = 'member/setMembers'
const ADD_MEMBER = 'member/addMember'
const DELETE_MEMBER = 'member/deleteMember'
const SELECT_MEMBER = 'member/selectMember'
const UPDATE_MEMBER = 'member/updateMember'

const setMembers = (members) => ({
    type: SET_MEMBERS,
    payload: members
});

const addMember = (member) => ({
    type: ADD_MEMBER,
    payload: member
});

const deleteMember = (id) => ({
    type: DELETE_MEMBER,
    payload: id
});

const selectMember = (id) => ({
    type: SELECT_MEMBER,
    payload: id
})

const updateMember = (member) => ({
    type: UPDATE_MEMBER,
    payload: {member}
})

export const getPartyMembers = (id) => async (dispatch) => {
    const res = await fetch(`/api/member/${id}`)
    const data = await res.json();
    dispatch(setMembers(data.members))
}

export const addSingleMember = (newMember) => async (dispatch) => {
    const res = await fetch(`/api/member/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMember)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addMember(data))
    }
}

export const editSingleMember = (memberToUpdate) => async (dispatch) => {
    const res = await fetch(`/api/member/update/${memberToUpdate.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberToUpdate)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(updateMember(data))
    }
}

export const deleteSingleMember = (memberToDelete) => async (dispatch) => {
    await fetch(`/api/member/delete/${memberToDelete}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    dispatch(deleteMember(memberToDelete))
    dispatch(deselectMember())
    dispatch(getPartyItems(currentParty))
    dispatch(getPartyMembers(currentParty))
}

export const selectCurrentMember = (id) => async (dispatch) => {
    dispatch(selectMember(id))
}

export const deselectMember = () => async (dispatch) => {
    dispatch(selectMember(null))
}

const initialstate = { memberList: [], currentMember: null}

function reducer (state = initialstate, action) {
    let newState;
    switch (action.type) {
        case SET_MEMBERS:
            newState = Object.assign({}, state, { memberList: action.payload });
            return newState;
        case ADD_MEMBER:
            newState = Object.assign({}, state);
            newState.memberList = [...newState.memberList, action.payload]
            return newState;
        case UPDATE_MEMBER:
            newState = Object.assign({}, state);
            const updatedList = newState.memberList.map( member => {
                if (member.id === action.payload.member.id){
                    return action.payload.member
                } else {
                return member
                }
            })
            newState.memberList = updatedList.filter(member =>{
                return (!!member)
            })
            return newState
        case DELETE_MEMBER:
            newState = Object.assign({}, state);
            newState.memberList = newState.memberList.filter(member => {
                return member.id !== member.payload
            })
            return newState;
        case SELECT_MEMBER:
            newState = Object.assign({}, state);
            newState.currentMember = action.payload
            return newState
        default:
            return state;

    }
}

export default reducer
