const generateCreature = (creatures, x, y) => {
  console.log(creatures)
  const existsAtThisLocation = creatures.filter((creature)=>{
    return creature.x === x && creature.y === y
  })
  
  if(existsAtThisLocation.length <= 0){
    return { icon: '@', x, y }
  } else {
    return { error: "Could not create creature. There was already a creature at this location." }
  }
}

export default generateCreature
