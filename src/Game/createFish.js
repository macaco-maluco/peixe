import * as THREE from 'three'

export default function createFish() {
  const fish = new THREE.Group()
  fish.add(createHead())
  fish.add(createBody())
  fish.add(createTail())
  fish.add(createFlap())
  fish.add(createLeftEye())
  fish.add(createRightEye())
  return fish
}

function createHead() {
  const geometry = new THREE.BoxGeometry(0.5, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x271b74,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}

function createBody() {
  const geometry = new THREE.BoxGeometry(2.0, 0.8, 0.8)
  const material = new THREE.MeshPhongMaterial({
    color: 0x271b74,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 1.25

  return mesh
}

function createTail() {
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshPhongMaterial({
    color: 0xffe700,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 2.25

  return mesh
}

function createFlap() {
  const geometry = new THREE.BoxGeometry(0.5, 0.25, 0.25)
  const material = new THREE.MeshPhongMaterial({
    color: 0xffe700,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 1.25
  mesh.position.y = -(0.4 + 0.12)

  return mesh
}

function createLeftEye() {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: 0x75253c,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.32
  mesh.position.y = 0.15
  mesh.position.z = 0.25

  return mesh
}

function createRightEye() {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: 0x75253c,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.32
  mesh.position.y = 0.15
  mesh.position.z = -0.25

  return mesh
}
