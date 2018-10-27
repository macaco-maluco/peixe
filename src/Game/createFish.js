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
  const group = new THREE.Group()

  const baseGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const baseMaterial = new THREE.MeshPhongMaterial({
    color: 0xffe700,
    shading: THREE.FlatShading,
  })

  const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial)
  group.add(baseMesh)

  const topGeometry = new THREE.BoxGeometry(1.3, 0.25, 0.05)
  const topMaterial = new THREE.MeshPhongMaterial({
    color: 0xffe700,
    shading: THREE.FlatShading,
  })

  const topMesh = new THREE.Mesh(topGeometry, topMaterial)
  topMesh.rotation.z = -0.4
  group.add(topMesh)

  const bottomGeometry = new THREE.BoxGeometry(1.3, 0.25, 0.05)
  const bottomMaterial = new THREE.MeshPhongMaterial({
    color: 0xffe700,
    shading: THREE.FlatShading,
  })

  const bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial)
  bottomMesh.rotation.z = 0.4
  group.add(bottomMesh)

  group.position.x = 2.25
  return group
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
