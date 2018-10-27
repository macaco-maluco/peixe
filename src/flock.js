import { Vector3 } from 'three'

const NEIGHBOUR_RADIUS = 2
const SEPARATION_WEIGHT = 10
const ALIGNMENT_WEIGHT = 1
const COHESION_WEIGHT = 1

export default function flock(boid, neighbours) {
  const separation = separate(boid, neighbours).multiplyScalar(SEPARATION_WEIGHT)
  const alignment = align(boid, neighbours).multiplyScalar(ALIGNMENT_WEIGHT)
  const cohesion = cohere(boid, neighbours).multiplyScalar(COHESION_WEIGHT)

  // console.log('separatio', separation)

  const acceleration = separation.add(alignment).add(cohesion)

  console.log(separation)

  return { acceleration, separation, alignment, cohesion }
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

  return centerOfMass
    .clone()
    .sub(boid.position)
    .normalize()
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

  return flockMembers
    .reduce((acc, neighbour) => {
      return boid.position
        .clone()
        .sub(neighbour.position)
        .add(acc)
    }, new Vector3())
    .divideScalar(flockMembers.length)
    .multiplyScalar(-1)
    .normalize()
}
