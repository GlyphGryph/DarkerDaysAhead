export default function generateGrid(rowCount, columnCount) {
  let columns = [];
  for (let columnId = 0; columnId < columnCount; columnId++){
    columns[columnId] = generateColumn(columnId, rowCount);
  }
  return {
    columns
  }
}

const randColorValue = () => {
  return Math.floor(Math.random() * 16);
};

const generateCell = (columnId, rowId) => {
  let colorCode = "#"+randColorValue()+randColorValue()+randColorValue();
  let cell = {
    id: [columnId, rowId],
    colorCode
  };
  return cell;
};

const generateColumn = (columnId, columnCount) => {
  let column = {
    id: columnId,
    rows: []
  };
  for (let rowId = 0; rowId < columnCount; rowId++) {
    column.rows[rowId] = generateCell(columnId, rowId);
  }

  return column;
};
