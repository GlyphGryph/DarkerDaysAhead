import generateGrid from '../generateGrid'

const initialState = {
  grid: {
    columns: []
  }
}

export default (state = initialState, action) => {
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
