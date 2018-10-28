import * as THREE from 'three'

const COLOR = 0xe4bd11

export default function createPlayer() {
  const outerGroup = new THREE.Group()

  const group = new THREE.Group()
  group.add(createBody())
  group.add(createHead())
  group.add(createTop())
  group.add(createTopA())
  group.add(createPropulsion())
  group.add(createPropulsionA())

  group.scale.x = 2.5
  group.scale.y = 2.5
  group.scale.z = 2.5
  group.rotation.x = Math.PI / 2

  outerGroup.add(group)

  return outerGroup
}

function createBody() {
  const geometry = new THREE.BoxGeometry(2.5, 1.0, 1.5)
  const material = new THREE.MeshPhongMaterial({
    color: COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}

function createHead() {
  const geometry = new THREE.BoxGeometry(1.5, 0.5, 1)
  const material = new THREE.MeshPhongMaterial({
    color: COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  // mesh.position.x = 0.1
  mesh.position.y = 0.75

  return mesh
}

function createTop() {
  const geometry = new THREE.BoxGeometry(0.25, 1, 0.25)
  const material = new THREE.MeshPhongMaterial({
    color: COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  //mesh.position.x = 0.1
  mesh.position.y = 1.25

  return mesh
}

function createTopA() {
  const geometry = new THREE.BoxGeometry(1, 0.25, 0.25)
  const material = new THREE.MeshPhongMaterial({
    color: COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -0.375
  mesh.position.y = 1.75

  return mesh
}

function createPropulsion() {
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshPhongMaterial({
    color: COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 1.3

  return mesh
}

function createPropulsionA() {
  const geometry = new THREE.BoxGeometry(0.25, 1, 0.25)
  const material = new THREE.MeshPhongMaterial({
    color: COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 1.5
  mesh.rotation.x = 0.3

  return mesh
}
