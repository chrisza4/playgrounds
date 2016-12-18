import Actions from '../store/Actions'
import _ from 'lodash'

const initialState = {

}

export default function roomReducer (state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_STARTER: {
      const rooms = action.data.rooms
      const roomsNoMessages = _(rooms).map(d => _.omit(d, 'messages')).value()
      return _.keyBy(roomsNoMessages, r => r._id)
    }
    default: {
      return state
    }
  }
}
