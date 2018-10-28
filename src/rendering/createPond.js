import * as THREE from 'three'

const WALL_HEIGHT = 4
const WALL_COLOR = 0x142b38

export default function createPond(worldWidth, worldHeight) {
  const group = new THREE.Group()

  group.add(createWater(worldWidth, worldHeight))
  group.add(createBorderHorizontal(worldWidth, worldHeight, -1))
  group.add(createBorderHorizontal(worldWidth, worldHeight, 1))
  group.add(createBorderVertical(worldWidth, worldHeight, -1))
  group.add(createBorderVertical(worldWidth, worldHeight, 1))

  group.position.z = -2

  return group
}

function createBorderHorizontal(worldWidth, worldHeight, position) {
  const geometry = new THREE.BoxGeometry(worldWidth, 100, WALL_HEIGHT)
  const material = new THREE.MeshPhongMaterial({
    color: WALL_COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = (worldHeight / 2 + 100 / 2) * position

  return mesh
}

function createBorderVertical(worldWidth, worldHeight, position) {
  const geometry = new THREE.BoxGeometry(100, worldHeight + 100 * 2, WALL_HEIGHT)
  const material = new THREE.MeshPhongMaterial({
    color: WALL_COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = (worldHeight / 2 + 100 / 2) * position

  return mesh
}

function createWater(worldWidth, worldHeight) {
  const geometry = new THREE.PlaneBufferGeometry(
    worldWidth,
    worldHeight,
    Math.round(worldWidth / 5),
    Math.round(worldHeight / 5),
  )

  const vertices = geometry.attributes.position.array
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 2] = Math.random() * 0.2
  }

  const material = new THREE.MeshPhongMaterial({
    color: 0x0b486b,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}
