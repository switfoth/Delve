import currentMember from './member'
import currentParty from './party'
const SET_ITEMS = 'item/setItems'
const ADD_ITEM = 'item/addItem'
const DELETE_ITEM = 'item/deleteItem'
const SELECT_ITEM = 'item/selectItem'
const UPDATE_ITEM = 'item/updateItem'

const setItems = (items) => ({
    type: SET_ITEMS,
    payload: items
});

const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

const deleteItem = (id) => ({
    type: DELETE_ITEM,
    payload: id
});

const selectItem = (id) => ({
    type: SELECT_ITEM,
    payload: id
})

const updateItem = (item) => ({
    type: UPDATE_ITEM,
    payload: {item}
})

export const getPartyItems = (id) => async (dispatch) => {
    const res = await fetch(`/api/item/party/${id}`)
    const data = await res.json();
    dispatch(setItems(data.items))
}

export const getMemberItems = (id) => async (dispatch) => {
    const res = await fetch(`/api/item/member/${id}`)
    const data = await res.json();
    dispatch(setItems(data.items))
}

export const clearItems = () => async (dispatch) => {
    dispatch(setItems([]))
}

export const addSingleItem = (newItem) => async (dispatch) => {
    const res = await fetch(`/api/item/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addItem(data))
    }
}

export const editSingleItem = (itemToUpdate) => async (dispatch) => {
    const res = await fetch(`/api/item/update/${itemToUpdate.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemToUpdate)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(updateItem(data))
        if (currentMember !== null || currentMember !== undefined) dispatch(getMemberItems(currentMember))
        dispatch(getPartyItems(currentParty))
    }
}

export const deleteSingleItem = (itemToDelete) => async (dispatch) => {
    await fetch(`/api/item/delete/${itemToDelete.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    dispatch(deleteItem(itemToDelete.id))
    if (currentMember !== null || currentMember !== undefined) dispatch(getMemberItems(currentMember))
    dispatch(getPartyItems(currentParty))
}

export const selectCurrentItem = (id) => async (dispatch) => {
    dispatch(selectItem(id))
}

export const deselectItem = (id) => async (dispatch) => {
    dispatch(selectItem(null))
}

const initialstate = { itemList: [], currentItem: null}

function reducer (state = initialstate, action) {
    let newState;
    switch (action.type) {
        case SET_ITEMS:
            newState = Object.assign({}, state, { itemList: action.payload });
            return newState;
        case ADD_ITEM:
            newState = Object.assign({}, state);
            newState.itemList = [...newState.itemList, action.payload]
            return newState;
        case UPDATE_ITEM:
            newState = Object.assign({}, state);
            const updatedList = newState.itemList.map( item => {
                if (item.id === action.payload.item.id){
                    if(item.member_id === action.payload.item.member_id){
                        return action.payload.item
                    }
                } else {
                    return item
                }
            })
            newState.itemList = updatedList.filter(item =>{
                return (!!item)
            })
            return newState
        case DELETE_ITEM:
            newState = Object.assign({}, state);
            const postDeleteList = newState.itemList.filter(item => {
                return item.id !== item.payload})
            newState.itemList = postDeleteList.filter(item =>{
                return (!!item)
            })
            return newState
        case SELECT_ITEM:
            newState = Object.assign({}, state);
            newState.currentItem = action.payload
            return newState
        default:
            return state;

    }
}

export default reducer
