import Actions from '../store/Actions'

const intialState = {
  auth: false,
  token: null
}

export default function authReducer (state = intialState, action) {
  switch (action.type) {
    case Actions.AUTH_TOKEN_RECIEVED: {
      return {
        token: action.token
      }
    }
    default: {
      return state
    }
  }
}
