import firestarter from '../dist/f3'

// set title of browser window
firestarter.common.title = `${firestarter.NAME} Sandbox Application`

// set the size of the stage
firestarter.common.height = 960
firestarter.common.width = 540

// specify we want the stage to scale as the browser window resizes, maintaining the aspect ratio
firestarter.common.scale.aspect = true
firestarter.common.resize = true

// preload the resources
firestarter.resources.load([
  firestarter.asset('bg', 'backgrounds/bg01p.png'),
  firestarter.asset('player', 'actors/fireman.png')
]).then(resources => {
  // resources are loaded, create the scenes

  // starting scene - should load play scene on mouse click
  firestarter.scene.create('start', () => {
    // show the click to play message
    firestarter.cursor.center.print('Click to Play')

    // when the mouse is clicked, start the play scene
    firestarter.mouse.click.add(() => {
      firestarter.scene.load(firestarter.scenes.play)
    })
  })

  // play scene - a flappy bird style demo with no scoring or obstacles for brevity
  // when the player falls off the bottom of the screen, the game ends and the
  // starting scene will be loaded
  firestarter.scene.create('play', () => {
    // set the scene background
    firestarter.scene.background = resources.bg

    // create the player actor
    const player = firestarter.actor('player', resources.player)
    player.x = ((firestarter.common.width - player.width) * 0.5) | 0
    player.y = ((firestarter.common.height - player.height) * 0.5) | 0

    // set up physics for the player
    player.physics = firestarter.physics.kinetic
    player.gravity.y = 9.8

    // when the mouse is clicked, apply upwards force to player
    firestarter.mouse.click.add(() => {
      player.force.add(0, -10000)
    })

    // add a function to call each update step of the player actor
    player.update.add(() => {
      // keep player from jumping off top of the screen
      if (player.y < 0) {
        player.y = 0
        player.body.linearVelocity.y = 0
      }

      // when the player falls off the screen, end the scene
      if (player.y > firestarter.common.height) {
        firestarter.scene.end()
      }
    })
  })

  // pick the starting scene
  firestarter.scene.load(firestarter.scenes.play)

  // starts the update loop at ~60 FPS
  firestarter.ignite()
})
