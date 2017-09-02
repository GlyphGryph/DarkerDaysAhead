import generateGrid from '../generateGrid'

const initialState = {
  grid: {
    width: 0,
    height: 0,
    cells: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEW_GRID":
      return {
        ...state,
        grid: generateGrid(action.width, action.height)
      }
    default:
      return {
        ...state
      }
  }
}
