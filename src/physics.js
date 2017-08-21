import { point } from './vmath'
import { body } from './pe'

const addPhysicsModelToActor = actor => {
  if (!actor) {
    throw new Error(`Expected an actor instance, not ${actor}`)
  }

  // physics body
  actor.body = body(actor)

  actor.body.applyFriction(9.8)

  // add physics methods
  actor.force = {
    add (x, y) {
      window.console.log(`adding physics force [${x}, ${y}] to actor ${actor.id}`)
      actor.body.applyLinearForce(point(x, y))
    }
  }

  actor.gravity = {
    set y (g) {
      actor.body.applyGravity(g)
      actor.gravity._y = g
    },
    get y () { return actor.gravity._y }
  }

  // add physics step to updates
  actor.update.add(deltaTime => {
    actor.body.update(deltaTime)
    actor.body.applyGravity(actor.gravity.y)
  })
}

export const physics = {
  kinetic: {
    setup (actor) {
      window.console.log(`enabling kinetic physics for actor ${actor.id}`)
      addPhysicsModelToActor(actor)
    }
  }
}
