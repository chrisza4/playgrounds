import * as Actions from '../store/Actions'
import axios from 'axios'

export function doAuth (email) {
  return dispatch => {
    axios.post('http://localhost:4000/api/graphql', {
      mutation:`{
        authForToken(email: "${email}")
      }`
    }).then((response) => {
      dispatch({
        type: Actions.AUTH,
        data: null
      })
    })
  }
}
