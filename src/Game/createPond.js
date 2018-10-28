import * as THREE from 'three'

const WORLD_WIDTH = 40
const WORLD_HEIGHT = 40

export default function createPond() {
  const group = new THREE.Group()

  group.add(createWater())

  return group
}

function createWater() {
  const geometry = new THREE.PlaneBufferGeometry(200, 200, WORLD_WIDTH - 1, WORLD_HEIGHT - 1)

  const vertices = geometry.attributes.position.array
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 2] = Math.random() * 0.2
  }

  const material = new THREE.MeshPhongMaterial({
    color: 0x0b486b,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.z = -2

  return mesh
}
