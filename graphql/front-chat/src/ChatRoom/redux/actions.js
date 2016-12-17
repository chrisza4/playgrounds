import axios from 'axios'

export function fetchMessage () {
  // axios({
  //   method: 'GET',
  //   url: '/graphql',
  //   baseURL:'http://localhost:4001',
  //   headers: {
  //     'Content-type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   data: {
  //     query: `
  //       {
  //         messages(roomId: "555") {
  //           _id
  //           body
  //         }
  //       }
  //     `
  //   }
  // }).then(r => {
  //   console.log(r)
  // })
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
