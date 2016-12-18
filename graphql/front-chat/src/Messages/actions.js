import axios from 'axios'

export function fetchMessage () {
  axios.post('http://localhost:4000/api/graphql', {
    query:`
      {
        messages(roomId: "555") {
          _id
          body
        }
      }
    `
  }).then(response => console.log(response))
}
