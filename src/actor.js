import { scene } from './scene'

export const actor = (id, image) => {
  window.console.log(`
creating actor ${id}
  image: ${image.src.substring(image.src.indexOf('/'))}
  width: ${image.width}
  height: ${image.height}
  `)
  const actorInst = {
    id,
    image,
    _x: 0,
    _y: 0,
    set x ($x) { actorInst._x = $x; actorInst._prevX = $x },
    get x () { return actorInst._x },
    set y ($y) { actorInst._y = $y; actorInst._prevY = $y },
    get y () { return actorInst._y },
    _prevX: 0,
    _prevY: 0,
    width: image.width,
    height: image.height,
    set physics ($p) {
      actorInst._physics = $p
      if ($p) {
        $p.setup(actorInst)
      }
    },
    _updaters: [],
    _renderers: [],
    update: {
      add (updater) {
        window.console.log(`adding updater to actor ${actorInst.id}`)
        actorInst._updaters.push(updater)
      },
      _exec (deltaTime) {
        actorInst._updaters.forEach(updater => updater(deltaTime))
        actorInst._prevX = actorInst.x
        actorInst._prevY = actorInst.y
      }
    },
    render: {
      add (renderer) {
        window.console.log(`adding renderer to actor ${actorInst.id}`)
        actorInst._renderers.push(renderer)
      },
      _exec (context, interpolationPercentage) {
        const x = actorInst._prevX + (actorInst._x - actorInst._prevX) * interpolationPercentage
        const y = actorInst._prevY + (actorInst._y - actorInst._prevY) * interpolationPercentage
        context.save()
        context.drawImage(actorInst.image, x, y)
        context.restore()
        actorInst._renderers.forEach(renderer => renderer(context, interpolationPercentage))
      }
    }
  }
  scene._current._actors.push(actorInst)
  return actorInst
}
