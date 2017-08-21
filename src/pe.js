import {
  point,
  magnitude,
  normalize,
  dotProduct,
  perpDotProduct
} from './vmath'

export const body = actor => {
  const bodyInst = {
    centerOfMass: point(0, 0),
    mass: 10.0,
    inertia: 0.0,
    staticFrictionCoefficient: 0.7,
    kineticFrictionCoefficient: 0.6,
    coefficientOfRestitution: 0.4,
    linearVelocity: point(0, 0),
    orientation: 0.0,
    angularVelocity: 0.0,
    totalForce: point(0, 0),
    totalTorque: 0.0,
    frictionForce: point(0, 0),
    totalImpulse: 0.0,

    updatePosition (deltaTime) {
      bodyInst.linearVelocity.x += (bodyInst.totalForce.x / bodyInst.mass) * deltaTime
      bodyInst.linearVelocity.y += (bodyInst.totalForce.y / bodyInst.mass) * deltaTime
      actor.x += bodyInst.linearVelocity.x * deltaTime
      actor.y += bodyInst.linearVelocity.y * deltaTime
    },

    updateRotation (deltaTime) {
      bodyInst.angularVelocity += (bodyInst.totalTorque / bodyInst.inertia) * deltaTime
      bodyInst.orientation += bodyInst.angularVelocity * deltaTime
    },

    updateFriction (deltaTime) {
      const friction = point(
        (bodyInst.frictionForce.x / bodyInst.mass) * deltaTime,
        (bodyInst.frictionForce.y / bodyInst.mass) * deltaTime)

      // applies friction to linear velocity
      // only if the body will not move by the integration
      if (Math.abs(bodyInst.linearVelocity.x) >= Math.abs(friction.x)) {
        bodyInst.linearVelocity.x += friction.x
      } else {
        bodyInst.linearVelocity.x = 0
      }

      if (Math.abs(bodyInst.linearVelocity.y) >= Math.abs(friction.y)) {
        bodyInst.linearVelocity.y += friction.y
      } else {
        bodyInst.linearVelocity.y = 0
      }

      // apply damping
      if (Math.abs(bodyInst.linearVelocity.x) <= 0.1) {
        bodyInst.linearVelocity.x = 0
      }

      if (Math.abs(bodyInst.linearVelocity.y) <= 0.1) {
        bodyInst.linearVelocity.y = 0
      }

      // damping for rotation since friction does not affect rotation
      bodyInst.angularVelocity *= 0.995
    },

    update (deltaTime) {
      bodyInst.updatePosition(deltaTime)
      bodyInst.updateRotation(deltaTime)
      bodyInst.updateFriction(deltaTime)
      bodyInst.resetForces()
    },

    resetForces () {
      bodyInst.totalTorque = 0.0
      bodyInst.totalImpulse = 0.0
      bodyInst.totalForce.x = 0.0
      bodyInst.totalForce.y = 0.0
      bodyInst.frictionForce.x = 0.0
      bodyInst.frictionForce.y = 0.0
    },

    applyLinearForce (force) {
      bodyInst.totalForce.x += force.x
      bodyInst.totalForce.y += force.y
    },

    applyTorque (torque) {
      bodyInst.totalTorque += torque
    },

    applyForce (force, pointOfContact) {
      bodyInst.totalForce.x += force.x
      bodyInst.totalForce.y += force.y
      const arm = point(0, 0)
      arm.x = pointOfContact.x - bodyInst.centerOfMass.x
      arm.y = pointOfContact.y - bodyInst.centerOfMass.y
      bodyInst.totalTorque += perpDotProduct(arm, force)
    },

    applyGravity (gravity = 9.8) {
      bodyInst.applyLinearForce(point(0, gravity * bodyInst.mass))
    },

    applyFriction (gravity) {
      let friction = null
      if (magnitude(bodyInst.linearVelocity) < 1.0) {
        friction = point(bodyInst.totalForce.x, bodyInst.totalForce.y)
        normalize(friction)
        const factor = -(bodyInst.mass * gravity) * bodyInst.staticFrictionCoefficient
        friction.x *= factor
        friction.y *= factor
      } else {
        friction = point(bodyInst.linearVelocity.x, bodyInst.linearVelocity.y)
        normalize(friction)
        const factor = -(bodyInst.mass * gravity) * bodyInst.kineticFrictionCoefficient
        friction.x *= factor
        friction.y *= factor
      }
      bodyInst.frictionForce.x += friction.x
      bodyInst.frictionForce.y += friction.y
    },

    handleCollision (otherBody, collisionNormal) {
      normalize(collisionNormal)
      const relativeVelocity = point(
        bodyInst.linearVelocity.x - otherBody.linearVelocity.x,
        bodyInst.linearVelocity.y - otherBody.linearVelocity.y)
      relativeVelocity.x *= -(1 + bodyInst.coefficientOfRestitution)
      relativeVelocity.y *= -(1 + bodyInst.coefficientOfRestitution)
      const invSumOfMass = (1 / bodyInst.mass) + (1 / otherBody.mass)
      const impulseA = dotProduct(relativeVelocity, collisionNormal)
      const impulseV = point(
        collisionNormal.x * invSumOfMass,
        collisionNormal.y * invSumOfMass)
      const impulseB = dotProduct(collisionNormal, impulseV)
      const impulse = impulseA / impulseB
      const linearVelocityFactor = impulse / bodyInst.mass
      const otherLinearVelocityFactor = impulse / otherBody.mass
      bodyInst.linearVelocity.x += collisionNormal.x * linearVelocityFactor
      bodyInst.linearVelocity.y += collisionNormal.y * linearVelocityFactor
      otherBody.linearVelocity.x += collisionNormal.x * otherLinearVelocityFactor
      otherBody.linearVelocity.y += collisionNormal.y * otherLinearVelocityFactor
    }
  }

  return bodyInst
}
