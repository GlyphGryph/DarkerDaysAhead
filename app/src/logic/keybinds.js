let Keys = {
  ENTER: 'Enter',
  SPACE: 'Space',
  W: 'w',
  S: 's',
  A: 'a',
  D: 'd',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
}
let Keybinds = {
  // Action Keybinds
  SELECT: [Keys.ENTER],
  CHANGE: [Keys.SPACE],
  // Movement keybinds
  UP: [Keys.W, Keys.UP],
  DOWN: [Keys.S, Keys.DOWN],
  LEFT: [Keys.A, Keys.LEFT],
  RIGHT: [Keys.D, Keys.RIGHT]
}

// Derived Keybinds
Keybinds.MOVE_KEYS = [
  ...Keybinds.UP,
  ...Keybinds.DOWN,
  ...Keybinds.LEFT,
  ...Keybinds.RIGHT
]

export default Keybinds
