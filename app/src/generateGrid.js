export default function generateGrid(width, height) {
  let cells = [];
  for (let xx = 0; xx < width; xx++){
    for (let yy = 0; yy < height; yy++){
      cells[[xx, yy]] = generateCell(xx, yy);
    }
  }
  return {
    width,
    height,
    cells
  }
}

const randColorValue = () => {
  return Math.floor(Math.random() * 16);
};

const generateCell = (x, y) => {
  let colorCode = "#"+randColorValue()+randColorValue()+randColorValue();
  let cell = {
    id: [x, y],
    x,
    y,
    colorCode
  };
  return cell;
};
