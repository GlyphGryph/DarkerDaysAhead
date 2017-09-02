Dark Days Ahead: After the End

Dark Days Ahead is a javascript-based reboot of Cataclysm: Dark Days Ahead.

It has a couple chapters, which are in many ways their own individual games.

After the End: The main game. You have somehow survived the end of the world. How long can you survive in the new one that has risen from the ashes?
- Project Note: While this is the game I eventually intend on building, I'll be working on all the other chapters first, using them as an opportunity to introduce and refine the various technical aspects of the game.

Suburban Prelude: Enjoy a quaint day in suburbia. Surely, nothing could go wrong on such a beautiful day, especially for a person like yourself. Suddenly, the sirens begin to wail, and your humble abode is under assault from all sides! Can you survive?
- Implements the Following:
  - Local World (single screen), initially blank
  - Character
  - Movement
  - Kreks spawn from edges of map, instant kill player on touch
  - Add actual terrain of various sorts
  - Larger world (still fully loaded in memory, but beyond edge of screen)
  - Visual calculations - you can't see through walls!
  - Go up and down stairs, multiple levels, drop between levels
  - Enemies will actually follow across levels if they can see you, otherwise wander randomly
  - The ability to damage enemies
  - Health points, enemies now damage instead of killing character
  - Inventory, the ability to pick up and put down items
  - Wield melee weapons to do additional damage and better defend yourself
  - Butcher enemies to gain food, need food needed to survive
  - Furniture. You can move it around! Close and open doors and curtains too.
  - Enemies can bash down doors and break through windows
  - Player can use supplies to fix doors and windows.
  - Player can set traps.
  - Player can use guns.
  - Advanced Enemies:
    - Zombies revive unless butchered.
    - Worms burrow under the ground creating tunnels through soil.
    - Robots are super tough.
    - Soldiers have guns.
    - Ants can destroy walls and floors and ceilings, and climb between levels.
    - Rust Eaters can fly.

Containment Breach: Set in a lab prior to the apocalypse. A kind of prequel. You play the role of a scientist, and help conduct a variety of experiments until it all goes wrong, at which point you you must use your technical know-how to escape the creatures that are roaming the hallways. Unlocks the Scientist and Lab Tech roles in "After the End", and depending on how you complete your run additional starting equipment may become available to you. Success will involve avoiding enemies and understanding them well enough to play them against each other and clear a path.
- Implements the following:
  - As suburban prelude but...
  - A mission with a "safe zone" that lets you win if you get to it
  - Larger map with multiple "zones" loaded into and out of memory
  - Static Krek and Zombie spawns
  - Ability to craft tools and devices
  - Improved enemy AI - Given different behaviour states and the ability to patrol, alone or in groups
  - Basic Shadows, light levels, raycasting
  - Stealth - the ability to move about unnoticed under the right circumstances. Chance of being noticed each tic.
  - Facings for enemies.
  - Kreks don't look up, only see in front of and below them.
  - Various behaviours create sounds
  - Kreks will occassionally look up if they hear a sound above them, and move to explore small sounds.
  - Kreks will be scared away by loud sounds.
  - Zombies will ignore small sounds but be attracted to loud sounds.
  - Improved enemy AI 2 - Zombies and Kreks will fight each other
  - Improved enemy AI 3 - Kreks will search for and eat food items and engage in social interaction with other Kreks
  - Computers player needs to interact with
  - Basic NPCs, basically a non-hostile version of zombies and kreks. Will still fight zombies and Kreks.
  - Basic NPC dialogues.
  - Additional optional missions that can be found during play
