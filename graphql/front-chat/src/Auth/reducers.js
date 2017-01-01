import Actions from '../store/Actions'

const intialState = {
  auth: false,
  token: null
}

export default function authReducer (state = intialState, action) {
  switch (action.type) {
    case Actions.AUTH_TOKEN_RECIEVED: {
      return {
        ...state,
        token: action.token
      }
    }
    case Actions.AUTH_LOGOUT: {
      return {
        ...state,
        token: null
      }
    }
    default: {
      return state
    }
  }
}
