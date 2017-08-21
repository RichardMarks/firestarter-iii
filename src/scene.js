const dummyScene = {
  name: 'Dummy',
  _actors: [],
  create () {},
  update: {
    _exec () {}
  },
  render: {
    _exec () {}
  }
}

export const scene = {
  _scenes: {},
  _current: dummyScene,
  _background: null,
  create (name, creator) {
    window.console.log(`creating scene ${name}`)
    const sceneInst = {
      name,
      create: creator,
      _actors: [],
      update: {
        _exec (deltaTime) {
          sceneInst._actors.forEach(actor => actor.update._exec(deltaTime))
        }
      },
      render: {
        _exec (context, interpolationPercentage) {
          sceneInst._actors.forEach(actor => actor.render._exec(context, interpolationPercentage))
        }
      }
    }
    scene._scenes[name] = sceneInst
    return scene
  },
  get background () { return scene._background },
  set background (image) {
    scene._background = image
    window.console.log(`set background to image ${image.src}`)
  },
  load ($scene) {
    document.body.innerHTML = ''
    window.console.log(`loading scene ${$scene.name}`)
    if (!$scene) {
      throw new Error('Unable to load an undefined scene reference')
    }
    const nextScene = scene._scenes[$scene.name]
    if (!nextScene) {
      throw new Error(`Unable to load scene ${$scene.name}`)
    }
    scene._current = $scene
    nextScene.create()
  },
  end () {
    window.console.log(`ending scene ${scene._current.name}`)
    scene._current = dummyScene
  }
}
