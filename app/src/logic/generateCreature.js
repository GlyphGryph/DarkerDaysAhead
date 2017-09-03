let creatureId = 0

const generateCreature = (cell) => {
  let otherCreaturesInCell = cell.contents.filter( (thing) => {
    return thing.type === 'CREATURE'
  })
  if(otherCreaturesInCell.length <= 0){
    let newCreature = {
      id: creatureId++,
      type: 'CREATURE',
      icon: '@',
      x: cell.x,
      y: cell.y
    }
    let newCell = {
      ...cell,
      contents: [
        ...cell.contents,
        newCreature
      ]
    }
    newCreature.cell = newCell
    return newCreature
  } else {
    return { error: "Could not create creature. There was already a creature at this location." }
  }
}

export default generateCreature
