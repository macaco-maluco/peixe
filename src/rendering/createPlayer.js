import * as THREE from 'three'

export default function createPlayer() {
  const group = new THREE.Group()
  group.add(createBody())
  group.add(createHead())
  return group
}

function createBody() {
  const geometry = new THREE.BoxGeometry(1, 0.2, 0.2)
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}

function createHead() {
  const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.7

  return mesh
}
