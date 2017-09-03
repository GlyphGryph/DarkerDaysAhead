import generateCell from './generateCell'

const generateGrid = (width, height) => {
  const cells = []
  for (let xx = 0; xx < width; xx++){
    for (let yy = 0; yy < height; yy++){
      cells.push(generateCell(xx, yy))
    }
  }
  return {
    width,
    height,
    cells
  }
}

export default generateGrid
