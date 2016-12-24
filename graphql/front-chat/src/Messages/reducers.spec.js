import Actions from '../store/Actions'
import { MessageReducer } from './reducers'

describe('Test sanity', () => {
  it('should be sane', () => {
    expect(1 + 1).toEqual(2)
  })
})

describe('Reducer', () => {
  describe('Starter', () => {
    it('should reduce starter correctly', () => {
      const initialState = {
        messages: {}
      }
      const action = {
        type: 'STARTER',
        data: {
          'rooms': [
            {
              '_id': 'room1',
              'title': 'Talk about warcraft',
              'messages': [
                {
                  '_id': 'message1',
                  'body': 'Hello, new heroes here?'
                }
              ]
            },
            {
              '_id': 'room2',
              'title': '/r/programming',
              'messages': [
                {
                  '_id': 'message2',
                  'body': 'Hello, React rocks'
                }
              ]
            }
          ]
        }
      }
      const expected = {
        message1: {
          roomId: 'room1',
          _id: 'message1',
          body: 'Hello, new heroes here?',
          ownerId: null
        },
        message2: {
          roomId: 'room2',
          _id: 'message2',
          body: 'Hello, React rocks',
          ownerId: null
        },
      }
      const actual = MessageReducer(initialState, action)
      expect(actual).toEqual(expected)
    })
  })

  it('should handle message create correctly', () => {
    const actual = MessageReducer({ }, {
      type: Actions.MESSAGE_CREATED,
      data: {
        _id: '1',
        body: 'cccc',
        ownerId: 'owner'
      },
      roomId: 'room1'
    })
    expect(actual).toEqual({
      '1': {
        _id: '1',
        body: 'cccc',
        roomId: 'room1',
        ownerId: 'owner'
      }
    })
  })
})
