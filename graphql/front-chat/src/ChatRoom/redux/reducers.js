import createMessageFixtures from '../../Fixtures/MessageFixtures'

const initialState = createMessageFixtures()

export default function MessageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
