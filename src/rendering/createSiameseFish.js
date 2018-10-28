import * as THREE from 'three'

export default function createSiameseFish() {
  const group = new THREE.Group()
  group.add(createBody())
  group.add(createHead())
  group.add(createTail())
  group.add(createTailA())
  group.add(createSticks())
  group.add(createTailB())
  group.add(createLeftEye())
  group.add(createRightEye())
  return group
}

function createBody() {
  const geometry = new THREE.BoxGeometry(0.5, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x44210c,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}

function createHead() {
  const geometry = new THREE.BoxGeometry(0.5, 1.1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x321909,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.5

  return mesh
}

function createTail() {
  const geometry = new THREE.BoxGeometry(0.5, 0.9, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x592c10,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 0.5

  return mesh
}

function createTailA() {
  const geometry = new THREE.BoxGeometry(0.5, 0.8, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x6f3613,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 1

  return mesh
}

function createTailB() {
  const geometry = new THREE.BoxGeometry(0.5, 0.7, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x8d4519,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 1.5

  return mesh
}

function createSticks() {
  const geometry = new THREE.BoxGeometry(0.5, 0.6, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x994b1b,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 2

  return mesh
}

function createLeftEye() {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: 0x994b1b,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.75
  mesh.position.y = 0.25
  mesh.position.z = 0.5

  return mesh
}

function createRightEye() {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: 0x994b1b,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.75
  mesh.position.y = -0.25
  mesh.position.z = 0.5

  return mesh
}
