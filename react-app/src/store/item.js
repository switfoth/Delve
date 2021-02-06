const SET_ITEMS = 'item/setItems'
const ADD_ITEM = 'item/addItem'
const DELETE_ITEM = 'item/deleteItem'
const SELECT_ITEM = 'item/selectItem'

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

export const deleteSingleItem = (itemToDelete) => async (dispatch) => {
    await fetch(`/api/item/delete/${itemToDelete.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    dispatch(deleteItem(itemToDelete.id))
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
        case DELETE_ITEM:
            newState = Object.assign({}, state);
            newState.itemList = newState.itemList.filter(item => {
                return item.id !== item.payload
            })
            return newState;
        case SELECT_ITEM:
            newState = Object.assign({}, state);
            newState.currentItem = action.payload
            return newState
        default:
            return state;

    }
}

export default reducer
