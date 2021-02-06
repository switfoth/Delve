const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

// export const login = ({ username, password }) => async (dispatch) => {
//   const res = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({ username, password })
//   });
//   if(res.ok) {
//     const data = await res.json()
//     dispatch(setUser(data));
//   }
//   return res;
// };
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
  const res = await fetch('/api/users/signup', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  if (res.ok){
    const data = await res.json()
    dispatch(setUser(data));
  }
  return res;
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

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
