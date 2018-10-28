import createFish from './createFish'
import createStingRay from './createStingRay'

export default function createCreature(type) {
  if (type === 3) {
    return createStingRay()
  }

  return createFish(type)
}
