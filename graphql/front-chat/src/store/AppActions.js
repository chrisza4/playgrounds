import axios from 'axios'

export function fetchStarter () {
  return async (dispatch) => {
    const fetchResult = await axios.post('http://localhost:4000/api/graphql', {
      query:`
      {
        rooms {
          _id
          title
          messages{
            _id
            body
          }
        }
      }`
    })
    dispatch({
      type: 'STARTER',
      data: fetchResult.data.data
    })
  }
}
