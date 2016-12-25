import * as Actions from '../store/Actions'
import axios from 'axios'

export function doAuth (email) {
  return dispatch => {
    axios.post('http://localhost:4000/api/graphql', {
      query:`
        {
          messages(roomId: "555") {
            _id
            body
          }
        }
      `
    }).then((response) => {
      dispatch({
        type: Actions.MESSAGE_FETCHED,
        data: null
      })
    })
  }
}
