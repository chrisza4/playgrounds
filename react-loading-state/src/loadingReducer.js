const initialState = {
  isLoaded: false,
  stringToRender: 'nothing'
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return { isLoaded: true, stringToRender: 'Load data completed' }
    default:
      return state
  }
}
