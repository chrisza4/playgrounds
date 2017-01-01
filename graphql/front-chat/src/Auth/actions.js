import Actions from '../store/Actions'
import _ from 'lodash'
import { authenticateSocket } from '../socketConnector'
import axios from 'axios'

export function doAuth (email, deps) {
  deps = {
    post: axios.post,
    authenticateSocket: authenticateSocket,
    ...deps
  }
  return dispatch => {
    deps.post('http://localhost:4000/api/graphql', {
      query:`mutation {
        authForToken(email: "${email}")
      }`
    }).then((response) => {
      const token = _.get(response, 'data.data.authForToken', null)
      const action = {
        type: Actions.AUTH_TOKEN_RECIEVED,
        token
      }
      dispatch(action)
      deps.authenticateSocket(token)
    })
  }
}

export function logOut () {
  return {
    type: Actions.AUTH_LOGOUT
  }
}
