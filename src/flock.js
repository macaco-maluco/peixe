import { Vector3 } from 'three'

const SEPARATE_RADIUS = 3
const NEIGHBOUR_RADIUS = 15
const TARGET_RADIUS = 10
const SEPARATION_WEIGHT = 2
const ALIGNMENT_WEIGHT = 10
const COHESION_WEIGHT = 0.03
const TARGET_WEIGHT = 0.9

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
    .divideScalar(400)

  return { acceleration, separation, alignment, cohesion }
}

function target(boid, leader) {
  const distance = boid.position.distanceTo(leader.position)

  if (!leader || distance > TARGET_RADIUS) {
    return new Vector3(0, 0, 0)
  }

  const targeting = leader.position.clone().sub(boid.position)

  return targeting
}

function cohere(boid, neighbours) {
  const flockMembers = neighbours.filter(neighbour => {
    const distance = boid.position.distanceTo(neighbour.position)
    return distance < NEIGHBOUR_RADIUS
  })

  if (flockMembers.length === 0) {
    return new Vector3(0, 0, 0)
  }

  const centerOfMass = flockMembers
    .reduce((acc, neighbour) => acc.add(neighbour.position), new Vector3())
    .divideScalar(flockMembers.length)
    .divideScalar(100)

  const cohesion = centerOfMass.sub(boid.position).normalize()

  return cohesion
}

function align(boid, neighbours) {
  const flockMembers = neighbours.filter(neighbour => {
    const distance = boid.position.distanceTo(neighbour.position)
    return distance < NEIGHBOUR_RADIUS
  })

  if (flockMembers.length === 0) {
    return new Vector3(0, 0, 0)
  }

  return flockMembers
    .reduce((acc, neighbour) => acc.add(neighbour.velocity), new Vector3())
    .divideScalar(flockMembers.length)
}

function separate(boid, neighbours) {
  const flockMembers = neighbours.filter(neighbour => {
    const distance = boid.position.distanceTo(neighbour.position)
    return distance < SEPARATE_RADIUS
  })

  if (flockMembers.length === 0) {
    return new Vector3(0, 0, 0)
  }

  return flockMembers
    .reduce((acc, neighbour) => {
      return boid.position
        .clone()
        .sub(neighbour.position)
        .add(acc)
    }, new Vector3())
    .divideScalar(flockMembers.length)
}
