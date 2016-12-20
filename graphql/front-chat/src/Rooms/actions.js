import Actions from '../store/Actions'
import axios from 'axios'

export function changeRoom(roomId) {
  return {
    type: Actions.ROOM_CHANGE,
    roomId
  }
}

export function fetchRoom (roomId) {
  return async (dispatch) => {
    const fetchResult = await axios.post('http://localhost:4000/api/graphql', {
      query:`
      {
        messages(roomId: "${roomId}") {
          _id
          body
        }
      }`
    })
    dispatch({
      type: 'FETCH_ROOM',
      data: fetchResult.data.data.messages
    })
  }
}
