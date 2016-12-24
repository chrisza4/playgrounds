import RoomReducer from './reducers'
import _ from 'lodash'

describe('Room reducer', () => {
  it('should reduce room data correctly', () => {
    const room1 = {
      '_id': 'room1',
      'title': 'Talk about warcraft',
      'messages': [
        {
          '_id': 'message1',
          'body': 'Hello, new heroes here?'
        }
      ]
    }
    const room2 = {
      '_id': 'room2',
      'title': '/r/programming',
      'messages': [
        {
          '_id': 'message2',
          'body': 'Hello, React rocks'
        }
      ]
    }
    const action = {
      type: 'STARTER',
      data: {
        'rooms': [
          room1,
          room2
        ]
      }
    }
    const expected = {
      data: {
        room1: _.omit(room1, 'messages'),
        room2: _.omit(room2, 'messages')
      },
      selectedRoom: 'room1'
    }
    const actual = RoomReducer({}, action)
    expect(actual).toEqual(expected)
  })

  it('change room correctly', () => {
    const initialState = {
      selectedRoom: 'xxx'
    }
    const actual = RoomReducer(initialState, {
      type: 'ROOM_CHANGE',
      roomId: 'room555'
    })
    expect(actual.selectedRoom).toEqual('room555')
  })
})
