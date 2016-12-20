import Actions from '../store/Actions'
import _ from 'lodash'

const initialState = {
  data: { },
  selectedRoom: 0
}

export default function roomReducer (state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_STARTER: {
      const rooms = action.data.rooms
      const roomsNoMessages = _(rooms).map(d => _.omit(d, 'messages')).value()
      return {
        data: _.keyBy(roomsNoMessages, r => r._id),
        selectedRoom: _.get(rooms, '0._id', null)
      }
    }
    case Actions.ROOM_CHANGE: {
      return {
        ...state,
        selectedRoom: action.roomId
      }
    }
    default: {
      return state
    }
  }
}
