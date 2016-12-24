import Actions from '../store/Actions'
import axios from 'axios'

export function fetchMessage () {
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
      console.log('R:', response)
      dispatch({
        type: Actions.MESSAGE_FETCHED,
        data: null
      })
    })
  }
}

export function createMessage (body, roomId, opts) {
  opts = Object.assign({ post: axios.post }, opts)
  return dispatch => {
    opts.post('http://localhost:4000/api/graphql', {
      query:`
        mutation {
          createMessage(message: {
            body: "${body}",
            roomId: "${roomId}"
            email: "c91ab792-c75e-45c0-943b-79c30194e9e4@taskworld.com"
          }) {
            _id
            body
            ownerId
          }
        }
      `
    }).then(response => {
      dispatch({
        type: Actions.MESSAGE_CREATED,
        data: response.data.data.createMessage,
        roomId
      })
    })
  }
}
