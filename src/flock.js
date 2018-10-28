import { Vector3 } from 'three'

const NEIGHBOUR_RADIUS = 20
const SEPARATION_WEIGHT = 3.6
const ALIGNMENT_WEIGHT = 1
const COHESION_WEIGHT = 4
const TARGET_WEIGHT = 5

export const MAX_SPEED = 0.2

export default function flock(boid, neighbours, leader) {
  const separation = separate(boid, neighbours).multiplyScalar(SEPARATION_WEIGHT)
  const alignment = align(boid, neighbours).multiplyScalar(ALIGNMENT_WEIGHT)
  const cohesion = cohere(boid, neighbours).multiplyScalar(COHESION_WEIGHT)
  const targeting = target(boid, leader).multiplyScalar(TARGET_WEIGHT)

  const acceleration = separation
    .add(alignment)
    .add(cohesion)
    .add(targeting)
    // Slow the acceleration down by a big factor
    .divideScalar(200)

  return { acceleration, separation, alignment, cohesion }
}

function target(boid, leader) {
  const distance = boid.position.distanceTo(leader.position)

  if (!leader || distance < 0 || distance > NEIGHBOUR_RADIUS) {
    return new Vector3(0, 0, 0)
  }

  const targeting = boid.position
    .clone()
    .sub(leader.position)
    .normalize()
    .multiplyScalar(-1)

  return targeting
}

function cohere(boid, neighbours) {
  const flockMembers = neighbours.filter(neighbour => {
    const distance = boid.position.distanceTo(neighbour.position)
    return distance > 0 && distance < NEIGHBOUR_RADIUS
  })

  if (flockMembers.length === 0) {
    return new Vector3(0, 0, 0)
  }

  const centerOfMass = flockMembers
    .reduce((acc, neighbour) => acc.add(neighbour.position), new Vector3())
    .divideScalar(flockMembers.length)
    .normalize()

  const cohesion = centerOfMass
    .clone()
    .sub(boid.position)
    .normalize()

  return cohesion
}

function align(boid, neighbours) {
  const flockMembers = neighbours.filter(neighbour => {
    const distance = boid.position.distanceTo(neighbour.position)
    return distance > 0 && distance < NEIGHBOUR_RADIUS
  })

  if (flockMembers.length === 0) {
    return new Vector3(0, 0, 0)
  }

  return flockMembers
    .reduce((acc, neighbour) => acc.add(neighbour.velocity), new Vector3())
    .divideScalar(flockMembers.length)
    .normalize()
}

function separate(boid, neighbours) {
  const flockMembers = neighbours.filter(neighbour => {
    const distance = boid.position.distanceTo(neighbour.position)
    return distance > 0 && distance < NEIGHBOUR_RADIUS
  })

  if (flockMembers.length === 0) {
    return new Vector3(0, 0, 0)
  }

  return (
    flockMembers
      .reduce((acc, neighbour) => {
        return boid.position
          .clone()
          .sub(neighbour.position)
          .add(acc)
      }, new Vector3())
      .divideScalar(flockMembers.length)
      // .multiplyScalar(-1)
      .normalize()
  )
}
