import { Vector3 } from 'three'
import flock from './flock'

it('should flock', () => {
  const boid = { position: new Vector3(0, 0, 0), velocity: new Vector3(0, 0, 0) }

  const neighbours = [
    { position: new Vector3(0.2, 0.1, 0), velocity: new Vector3(0, 0, 0) },
    { position: new Vector3(1, 0, 0), velocity: new Vector3(0, 0, 0) },
  ]

  const acceleration = flock(boid, neighbours)

  expect(acceleration).toMatchSnapshot()
})
