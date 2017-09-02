export const NEW_GRID = 'NEW_GRID'
export const SPAWN_CREATURE = 'SPAWN_CREATURE'

export const newGrid = (width, height) => ({
  type: NEW_GRID,
  width,
  height
})

export const spawnCreature = (xx, yy) => ({
  type: NEW_GRID,
  xx,
  yy
})
