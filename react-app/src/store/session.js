const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ADD_ERROR = 'session/addError'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const addError = (error) => ({
  type: ADD_ERROR,
  payload: error
})

export const login = (user) => async (dispatch) => {
  const { username, password } = user;
  const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          username,
          password,
      }),
  });
  if (response.ok) {
    let data = await response.json()
    dispatch(setUser(data));
  } else {
    let error = "Login failed - incorrect/nonexistent username or password entered."
    dispatch(addError(error))
  }
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch('/api/auth');
  if(res.ok){
    const data = await res.json()
    dispatch(setUser(data));
    return data;
  }
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  const data = await res.json()
  if(!data.errors){
    dispatch(setUser(data));
  }
  return data
};

export const logout = () => async (dispatch) => {
  const res = await fetch('/api/auth/logout', {
    method: 'GET',
  });
  if (res.ok){
    dispatch(removeUser());
  }
  return res;
};

const initialState = { user: null, errors: [] };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    case ADD_ERROR:
      newState = Object.assign({}, state);
      newState.errors = [action.payload]
      return newState;
    default:
      return state;
  }
}

export default reducer;
