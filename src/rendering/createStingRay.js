import * as THREE from 'three'

export default function createStingRay() {
  const group = new THREE.Group()
  group.add(createBody())
  group.add(createTail())
  group.add(createLeftEye())
  group.add(createRightEye())
  return group
}

function createBody() {
  const geometry = new THREE.BoxGeometry(2, 2, 0.25)
  const material = new THREE.MeshPhongMaterial({
    color: 0x29303c,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.z = Math.PI / 4
  return mesh
}

function createTail() {
  const geometry = new THREE.BoxGeometry(1.5, 0.1, 0.1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x191d24,
    flatShading: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 2
  return mesh
}

function createLeftEye() {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: 0x191d24,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.5
  mesh.position.y = 0.25
  mesh.position.z = 1

  return mesh
}

function createRightEye() {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: 0x191d24,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.5
  mesh.position.y = -0.25
  mesh.position.z = 1

  return mesh
}
