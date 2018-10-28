import createFish from './createFish'
import createStingRay from './createStingRay'
import createSiameseFish from './createSiameseFish'

export default function createCreature(type) {
  if (type === 3) {
    return createStingRay()
  }

  if (type === 4) {
    return createSiameseFish()
  }

  return createFish(type)
}
