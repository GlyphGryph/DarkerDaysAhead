const randColorValue = () => {
  return (Math.floor(Math.random() * 6)+4).toString(16);
};

const generateCell = (id, x, y) => {
  let colorCode = "#"+0+randColorValue()+0;
  let cell = {
    id,
    x,
    y,
    colorCode,
    contents: []
  };
  return cell;
};

export default generateCell
