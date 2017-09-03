const randColorValue = () => {
  return Math.floor(Math.random() * 16).toString(16);
};

let id = 0;

const generateCell = (x, y) => {
  let colorCode = "#"+0+randColorValue()+0;
  let cell = {
    id: id++,
    x,
    y,
    colorCode,
    contents: []
  };
  return cell;
};

export default generateCell
