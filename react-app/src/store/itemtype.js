const SET_ITEM_TYPES = 'itemtype/setItemTypes'

const setItemTypes = (itemtypes) => ({
    type: SET_ITEM_TYPES,
    payload: itemtypes
})

export const getItemTypes = () => async (dispatch) => {
    const res = await fetch(`/api/item_type`)
    const data = await res.json();
    dispatch(setItemTypes(data.item_types))
}

const initialState = { itemTypeList: [] }

function reducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ITEM_TYPES:
            newState = Object.assign({}, state, {itemTypeList: action.payload});
            return newState;
        default:
            return state;
    }
}

export default reducer
