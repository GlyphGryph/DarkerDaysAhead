import generateGrid from '../generateGrid'

export default (state = {}, action) => {
  switch (action.type) {
    case "NEW_GRID":
      return {
        ...state,
        grid: generateGrid(10,10)
      }
    default:
      return {
        ...state
      }
  }
}
